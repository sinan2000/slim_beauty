import { Card, CardContent } from "../ui/card";
import React from "react";
import { services } from "@/lib/data";

export default function FaceCare() {
    const items = services[1].items;

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
                                <p className="text-muted-foreground">{item.shortDescription}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
