import { mdiSnowflakeAlert, mdiArmFlex, mdiWifi, mdiVacuum, mdiBloodBag, mdiSignalVariant, mdiRadioboxMarked, mdiWhiteBalanceSunny, mdiWaveform } from '@mdi/js';
import Icon from '@mdi/react';
import { Card, CardContent } from "../ui/card";
import React from "react";

export default function BodyCare() {
    // Create an array of items
    const items = [
        {
            icon: <Icon path={mdiWaveform} size={2} className="text-primary mb-4" />,
            title: "VShape Anticelulitic",
            description: "Tratamente pentru reducerea celulitei."
        },
        {
            icon: <Icon path={mdiSnowflakeAlert} size={2} className="text-primary mb-4" />,
            title: "Criolipoliză",
            description: "Sculptură corporală cu tehnologie avansată de răcire."
        },
        {
            icon: <Icon path={mdiArmFlex} size={2} className="text-primary mb-4" />,
            title: "EMSlim Neo RF",
            description: "Tonifiere musculară și slăbire."
        },
        {
            icon: <Icon path={mdiWifi} size={2} className="text-primary mb-4" />,
            title: "Radiofrecvență Bipolară",
            description: "Lifting și regenerare celulară."
        },
        {
            icon: <Icon path={mdiVacuum} size={2} className="text-primary mb-4" />,
            title: "Masaj Vacuum Anticelulitic",
            description: "Reducerea celulitei și tonifierea pielii."
        },
        {
            icon: <Icon path={mdiBloodBag} size={2} className="text-primary mb-4" />,
            title: "Presoterapie (Drenaj Limfatic)",
            description: "Eliminarea toxinelor și reducerea retenției de apă."
        },
        {
            icon: <Icon path={mdiSignalVariant} size={2} className="text-primary mb-4" />,
            title: "Cavitație",
            description: "Ultrasunete pentru eliminarea celulitei."
        },
        {
            icon: <Icon path={mdiRadioboxMarked} size={2} className="text-primary mb-4" />,
            title: "Împachetări Tunel IR",
            description: "Tratament pentru detoxifiere și pierdere în greutate."
        },
        {
            icon: <Icon path={mdiWhiteBalanceSunny} size={2} className="text-primary mb-4" />,
            title: "Bronzare Organică cu DHA",
            description: "Bronzare sănătoasă și naturală fără raze UV."
        }
    ];

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">Proceduri Corporale</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Map over the items array */}
                    {items.map((item, index) => (
                        <Card key={index}>
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                {item.icon}
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
