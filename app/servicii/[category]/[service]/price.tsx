'use client';

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const PriceList = ({ prices }: { prices: number[] }) => (
    <div className="space-y-2">
        {prices.map((price, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-200 py-2">
                <span className="text-gray-600">{index === 0 ? 'O ședință' : `${index === 1 ? '6' : '10'} ședințe`}</span>
                <span className="font-semibold text-primary">{price} lei</span>
            </div>
        ))}
    </div>
)

const PriceComponent = ({ prices }: { prices: number[] }) => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-primary mb-4">Prețuri</h2>
                <PriceList prices={prices} />
            </CardContent>
        </Card>
    )
}

export default PriceComponent;