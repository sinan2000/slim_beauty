'use server'

import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';
import { formatFormTime, getMonthStartEnd, getServiceDuration, mapRomanianChars, processEvents, toRomanianDate } from '@/lib/utils';
import { z } from 'zod';
import { google } from 'googleapis';
import { kv } from "@vercel/kv";
import { headers } from 'next/headers';

const schema = z.object({
    name: z.string({
        required_error: "Vă rugăm să introduceți numele dvs.",
    }).min(2, {
        message: "Numele trebuie să conțină cel puțin 2 caractere.",
    }).max(30, {
        message: "Numele nu poate depăși 30 de caractere.",
    }),

    phone: z.string({
        required_error: "Vă rugăm să introduceți numărul de telefon.",
    }).regex(/^\+?\d{8,15}$/, {
        message: "Numărul de telefon trebuie să fie valid, având între 8 și 15 cifre și poate începe cu '+' pentru numere internaționale.",
    }),

    date: z.string({
        required_error: "Vă rugăm să selectați o dată.",
    }).min(1, {
        message: "Vă rugăm să selectați o dată validă.",
    }),

    time: z.string({
        required_error: "Vă rugăm să selectați o oră.",
    }).min(1, {
        message: "Ora selectată nu este validă.",
    }),

    service: z.string({
        required_error: "Vă rugăm să selectați un serviciu.",
    }).min(1, {
        message: "Trebuie să alegeți un serviciu.",
    }),

    message: z.string()
        .max(100, {
            message: "Mesajul nu poate avea mai mult de 100 de caractere.",
        })
        .optional()
        .or(z.literal("")),
});

function getRateLimit(key: "book" | "switchMonth" = "book") {
    return key === "book" ? 1 : 10;
}

async function isRateLimited(action: "book" | "switchMonth" = "book") {
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] || (await headers()).get("remote-addr");

    const RATE_LIMIT_KEY = `slimBeauty:rateLimit:${action}:${ip}`;
    const count = parseInt((await kv.get(RATE_LIMIT_KEY)) as string, 10) || 0;

    if (count >= getRateLimit(action)) {
        return true;
    };

    const RATE_LIMIT_DURATION = 60 * 60 * 24; // 24 hours
    await kv.set(RATE_LIMIT_KEY, count + 1, { ex: RATE_LIMIT_DURATION });

    return false;
}

export async function bookAppointment(formData: FormData) {
    const validated = schema.safeParse(Object.fromEntries(formData));

    if (!validated.success) {
        const error = validated.error.issues[0]?.message;

        return {
            message: error || "Vă rugăm verificați toate câmpurile și încercați din nou.",
            success: false
        };
    }

    if (await isRateLimited()) {
        return {
            message: "Ați atins limita de programări pentru astăzi. Vă rugăm să reveniți mâine.",
            success: false
        };
    }

    const { name, phone, service, date, time, message } = validated.data;

    const startDateTime = formatFormTime(date, time, 0);
    const endDateTime = formatFormTime(date, time, getServiceDuration(service));

    if (!startDateTime || !endDateTime) {
        return { success: false, message: "Data sau ora selectată nu este validă." };
    }

    const calendarResponse = await addEventToCalendar({
        summary: `${service} - ${name}`,
        description: `Clientă: ${name}\nTelefon: ${phone}\nMesaj: ${message || "Niciun mesaj."}`,
        startDateTime,
        endDateTime,
    })

    if (!calendarResponse.success) {
        return { success: false, message: "A apărut o eroare. Vă rugăm să încercați mai târziu." };
    }

    sendSms({
        name,
        phone,
        service,
        date: toRomanianDate(date),
        message: message || ""
    });

    return { message: "Programare confirmată, vă mulțumim!", success: true };
}

const auth = new google.auth.JWT(
    process.env.GOOGLE_CALENDAR_CLIENT_EMAIL,
    undefined,
    process.env.GOOGLE_CALENDAR_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/calendar']
)

const calendar = google.calendar('v3');

export async function addEventToCalendar(eventDetails: {
    summary: string;
    description?: string;
    startDateTime: string;
    endDateTime: string;
}) {
    try {
        const response = await calendar.events.insert({
            auth,
            calendarId: process.env.GOOGLE_CALENDAR_ID!,
            requestBody: {
                summary: eventDetails.summary,
                description: eventDetails.description || "",
                start: { dateTime: eventDetails.startDateTime },
                end: { dateTime: eventDetails.endDateTime },
            },
        });

        return { success: true, eventId: response.data.id };
    } catch (error) {
        console.error("Error adding event to Google Calendar:", error);
        return { success: false, error: "Could not add event to calendar." };
    }
}

export async function getEventsForMonth(year: number, month: number) {
    try {
        if (await isRateLimited("switchMonth")) {
            return { success: false, events: [] };
        }

        const { timeMin, timeMax } = getMonthStartEnd(year, month);

        const response = await calendar.events.list({
            auth,
            calendarId: process.env.GOOGLE_CALENDAR_ID!,
            timeMin,
            timeMax,
            singleEvents: true,
            orderBy: "startTime",
        });

        const events = response.data.items?.map(event => ({
            id: event.id as string,
            summary: event.summary as string,
            start: event.start?.dateTime as string,
            end: event.end?.dateTime as string,
        })) || [];

        return { success: true, events: processEvents(events) };
    } catch (error) {
        console.error("Error fetching events from Google Calendar:", error);
        return { success: false, events: [] };
    }
}

interface sensSmsProps {
    name: string;
    phone: string;
    service: string;
    date: string;
    message: string;
}

export async function sendSms(data: sensSmsProps) {
    const { name, phone, service, date, message } = data;

    const vonage = new Vonage(
        new Auth({
            apiKey: process.env.VONAGE_API_KEY,
            apiSecret: process.env.VONAGE_API_SECRET
        })
    );

    const from = 'Website';
    const text = `Rezervare noua de la ${name}, cu numărul de telefon ${phone}, pentru serviciul de ${service}, pe ${date}. ${message && '\nMesaj: ' + message}`;
    const cleanText = mapRomanianChars(text);

    try {
        await vonage.sms.send({
            to: process.env.PHONE_NUMBER as string,
            from,
            text: cleanText
        });
    } catch (error) {
        console.error(error);
        throw new Error('SMS failed to send: ' + error);
    }
}