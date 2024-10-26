'use client'

import { useEffect, useState } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import Cookies from 'js-cookie';

export default function GoogleTagManagerInit() {
    const [isGTMEnabled, setIsGTMEnabled] = useState(false);

    useEffect(() => {
        const handleConsentUpdate = () => {
            if (Cookies.get('cookie_consent') === 'accepted') {
                setIsGTMEnabled(true);
            }
        };

        handleConsentUpdate();
        window.addEventListener('cookieConsentUpdate', handleConsentUpdate);

        return () => {
            window.removeEventListener('cookieConsentUpdate', handleConsentUpdate)
        };
    }, []);

    return isGTMEnabled ? <GoogleTagManager gtmId="AW-16731906773" /> : null;
}
