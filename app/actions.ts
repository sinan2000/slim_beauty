'use server'

import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';
import { mapRomanianChars } from '@/lib/utils';
import { z } from 'zod';
import { google } from 'googleapis';
import { format, parseISO, startOfMonth, endOfMonth } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { kv } from "@vercel/kv";
import { headers } from 'next/headers';

const RATE_LIMIT_DURATION = 60 * 60 * 24; // 24 hours

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

export async function bookAppointment(formData: FormData) {
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] || (await headers()).get("remote-addr");

    if (!ip) {
        return { success: false, message: "Could not determine your IP address." };
    }

    const validated = schema.safeParse(Object.fromEntries(formData));

    if (!validated.success) {
        const error = validated.error.issues[0]?.message;

        return {
            message: error || "Vă rugăm verificați toate câmpurile și încercați din nou.",
            success: false
        };
    }

    const didBook = await kv.get(ip);
    if (didBook) {
        return {
            success: false,
            message: `Numărul maxim de programări este de una pe zi. Între timp ne puteti suna la ${process.env.PHONE_NUMBER}`
        };
    }

    const RATE_LIMIT_KEY = `slimBeauty:rateLimit:${ip}`;
    await kv.set(RATE_LIMIT_KEY, "booked", { ex: RATE_LIMIT_DURATION });

    const { name, phone, service, date, time, message } = validated.data;

    const timeZone = 'Europe/Bucharest';

    const bucharestDateStr = formatInTimeZone(parseISO(date), timeZone, "yyyy-MM-dd");
    const eventDateTimeWithoutOffset = `${bucharestDateStr}T${time}:00`;
    const bucharestOffset = formatInTimeZone(parseISO(eventDateTimeWithoutOffset), timeZone, "xxx");
    const finalEventDateTime = `${eventDateTimeWithoutOffset}${bucharestOffset}`;

    // Convert to ISO format while keeping the correct local timezone
    const eventDate = new Date(finalEventDateTime);
    const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000);
    const finalEndDateTime = formatInTimeZone(endDate, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX");

    const calendarResponse = await addEventToCalendar({
        summary: `${service} - ${name}`,
        description: `Clientă: ${name}\nTelefon: ${phone}\nMesaj: ${message || "Niciun mesaj."}`,
        startDateTime: finalEventDateTime,
        endDateTime: finalEndDateTime,
    })

    if (!calendarResponse.success) {
        return { success: false, message: "A apărut o eroare. Vă rugăm să încercați mai târziu." };
    }

    sendSms({
        name,
        phone,
        service,
        date: format(eventDate, "dd/MM/yyyy"),
        time,
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
        const startDate = format(startOfMonth(new Date(year, month - 1)), "yyyy-MM-dd'T'00:00:00XXX");
        const endDate = format(endOfMonth(new Date(year, month - 1)), "yyyy-MM-dd'T'23:59:59XXX");

        const response = await calendar.events.list({
            auth,
            calendarId: process.env.GOOGLE_CALENDAR_ID!,
            timeMin: startDate,
            timeMax: endDate,
            singleEvents: true,
            orderBy: "startTime",
        });

        const events = response.data.items?.map(event => ({
            id: event.id,
            summary: event.summary,
            start: event.start?.dateTime,
            end: event.end?.dateTime,
        })) || [];

        return { success: true, events };
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
    time: string;
    message: string;
}

export async function sendSms(data: sensSmsProps) {
    const { name, phone, service, date, time, message } = data;

    const vonage = new Vonage(
        new Auth({
            apiKey: process.env.VONAGE_API_KEY,
            apiSecret: process.env.VONAGE_API_SECRET
        })
    );

    const from = 'Website';
    const text = `Rezervare noua de la ${name}, cu numărul de telefon ${phone}, pentru serviciul de ${service}, pe data de ${date} la ora ${time}. ${message && '\nMesaj: ' + message}`;
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