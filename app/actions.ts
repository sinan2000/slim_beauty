'use server'

import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';
import { serviceMap, mapRomanianChars } from '@/lib/utils';

export async function sendSms(formData: FormData) {
    const name = formData.get('name') as string;
    const phoneNumber = formData.get('phone') as string;
    const service = formData.get('service') as string;
    const serviceText = serviceMap[service] || service;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const message = formData.get('message') as string | null;

    const vonage = new Vonage(
        new Auth({
            apiKey: process.env.VONAGE_API_KEY,
            apiSecret: process.env.VONAGE_API_SECRET
        })
    );

    const from = 'Website';
    const text = `Rezervare noua de la ${name}, cu numărul de telefon ${phoneNumber}, pentru serviciul de ${serviceText}, pe data de ${date} la ora ${time}. ${message && 'Mesaj: ' + message}`;
    const cleanText = mapRomanianChars(text);

    try {
        await vonage.sms.send({ to: process.env.PHONE_NUMBER as string, from, text: cleanText });
        console.log('SMS sent');
    } catch (error) {
        console.error(error);
    }
}