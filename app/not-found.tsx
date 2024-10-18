'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-86px)] bg-gradient-to-br from-[#FDF8F5] to-[#F5EBE6] flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden">
                <CardContent className="p-6 md:p-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                            className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <Search className="w-12 h-12 text-primary" />
                        </motion.div>
                        <h1 className="text-4xl font-bold text-primary mb-4">Pagină negăsită</h1>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Ne pare rău, dar pagina pe care o căutați nu există. Este posibil să fi fost mutată sau ștearsă.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                                <Link href="/">
                                    <Home className="w-4 h-4 mr-2" />
                                    Acasă
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                                <Link href="/servicii">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Înapoi la Servicii
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    )
}