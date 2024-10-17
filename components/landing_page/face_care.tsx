import { mdiNeedle, mdiWaterCircle, mdiFaceWomanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Card, CardContent } from "../ui/card";
import React from "react";

export default function FaceCare() {
    // Create an array of items
    const items = [
        {
            icon: <Icon path={mdiNeedle} size={2} className="text-primary mb-4" />,
            title: "Dermapen cu Microneedling",
            description: "Rejuvenare și regenerare cutanată."
        },
        {
            icon: <Icon path={mdiWaterCircle} size={2} className="text-primary mb-4" />,
            title: "Microdermabraziune",
            description: "Exfoliere și curățare profundă a pielii."
        },
        {
            icon: <Icon path={mdiFaceWomanOutline} size={2} className="text-primary mb-4" />,
            title: "Tratament Clasic de Curățire",
            description: "Curățare facială în profunzime."
        }
    ];

    return (
        <section className="py-16 bg-[#F5EBE6]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">Dermato Cosmetică</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
