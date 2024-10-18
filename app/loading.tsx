'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

const LoadingDot = ({ delay }: { delay: number }) => (
    <motion.div
        className="w-3 h-3 rounded-full bg-primary"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0] }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: delay,
        }}
    />
)

export default function LoadingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] to-[#F5EBE6] flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl">
                <CardContent className="p-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h2 className="text-2xl font-semibold text-primary mb-4">Slim & Beauty by MC</h2>
                        <p className="text-gray-600 mb-8">Pregătim experiența ta de frumusețe și relaxare...</p>

                        <div className="flex justify-center space-x-2 mb-8">
                            <LoadingDot delay={0} />
                            <LoadingDot delay={0.2} />
                            <LoadingDot delay={0.4} />
                        </div>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    )
}