'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from 'lucide-react'
import Cookies from 'js-cookie';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const consent = Cookies.get('cookie_consent');
        if (!consent) {
            setIsVisible(true)
        }
    }, [])

    const handleAccept = () => {
        Cookies.set('cookie_consent', 'accepted', { expires: 365 })
        setIsVisible(false)
    }

    const handleDecline = () => {
        Cookies.set('cookie_consent', 'declined', { expires: 365 })
        setIsVisible(false)
    }

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-4 right-4 z-50 max-w-sm w-full sm:w-96"
                >
                    <Card className="bg-white/90 backdrop-blur-sm shadow-lg border border-primary/10">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-primary">Politica de Cookie-uri</h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-gray-500 hover:text-gray-700"
                                    onClick={handleDecline}
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Închide</span>
                                </Button>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                Folosim cookie-uri pentru a vă îmbunătăți experiența pe site-ul nostru. Acceptați utilizarea cookie-urilor în conformitate cu Politica noastră de Confidențialitate?
                            </p>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDecline}
                                    className="text-primary border-primary hover:bg-primary/10"
                                >
                                    Refuz
                                </Button>
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={handleAccept}
                                    className="bg-primary hover:bg-primary/90 text-white"
                                >
                                    Accept
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    )
}