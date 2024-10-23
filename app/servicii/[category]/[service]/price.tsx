'use client';

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const PriceCard = ({option, index} : {option: number, index: number}) => {
    const sedinte = [1, 6, 10];
    return (
    <Card className="mb-4">
        <CardContent className="p-4">
            <h4 className="text-lg font-semibold text-primary mb-2">{index === 0 ? 'O sedinta:' : sedinte[index] + ' sedinte:'}</h4>
            <p className="text-2xl font-bold text-primary">{option} lei</p>
        </CardContent>
    </Card>
)
}

const PriceComponent = ({ prices }: { prices: number[] }) => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <motion.div className="mb-12" {...fadeIn} transition={{ delay: 0.6 }}>
            <h2 className="text-2xl font-semibold text-primary mb-4">Prețuri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prices.map((option, index) => (
                    <PriceCard key={index} option={option} index={index}/>
                ))}
            </div>
        </motion.div>
    )
}

export default PriceComponent;