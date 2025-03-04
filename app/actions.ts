'use server'

import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';
import { serviceMap, mapRomanianChars } from '@/lib/utils';
import { z } from 'zod';

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
    const serviceText = serviceMap[service];

    const vonage = new Vonage(
        new Auth({
            apiKey: process.env.VONAGE_API_KEY,
            apiSecret: process.env.VONAGE_API_SECRET
        })
    );

    const from = 'Website';
    const text = `Rezervare noua de la ${name}, cu numărul de telefon ${phone}, pentru serviciul de ${serviceText}, pe data de ${date} la ora ${time}. ${message && 'Mesaj: ' + message}`;
    const cleanText = mapRomanianChars(text);

    try {
        await vonage.sms.send({ to: process.env.PHONE_NUMBER as string, from, text: cleanText });
        console.log('SMS sent');
    } catch (error) {
        console.error(error);
        throw new Error('SMS failed to send: ' + error);
    }
}

const schema = z.object({
    name: z.string({
        required_error: "Vă rugăm să introduceți numele dvs.",
    }).min(2, {
        message: "Numele trebuie să conțină cel puțin 2 caractere.",
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

    message: z.string().optional(),
});

type ZodError = z.ZodError<typeof schema>;

export async function bookAppointment(formData: FormData) {
    const validated = schema.safeParse(Object.fromEntries(formData));

    if (!validated.success) {
        const error = validated.error.issues[0]?.message;

        return {
            message: error || "Vă rugăm verificați toate câmpurile și încercați din nou.",
            success: false
        };
    }

    // Save to DB (example)
    console.log("Booking received:", validated.data);

    return { message: "Programare confirmată, vă mulțumim!", success: true };
}
