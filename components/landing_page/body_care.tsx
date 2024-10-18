'use client';

import { Card, CardContent } from "../ui/card";
import React from "react";
import { services } from '@/lib/data';
import { motion } from "framer-motion";

export default function BodyCare() {
    // Create an array of items
    const data = services[0];

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">{data.category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Map over the items array */}
                    {data.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            viewport={{ once: true }}
                        >
                            <Card>
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    {item.icon}
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.shortDescription}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
