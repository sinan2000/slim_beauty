'use client'

import { useEffect, useState } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import Cookies from 'js-cookie';

export default function GoogleTagManagerInit() {
    const [isGTMEnabled, setIsGTMEnabled] = useState(false);

    useEffect(() => {
        const consent = Cookies.get('cookie_consent');
        if (consent === 'accepted') {
            setIsGTMEnabled(true);
        }
    }, []);

    return isGTMEnabled ? <GoogleTagManager gtmId="AW-16731906773" /> : null;
}
