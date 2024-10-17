'use server'

import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';
import { serviceMap, mapRomanianChars } from '@/lib/utils';

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