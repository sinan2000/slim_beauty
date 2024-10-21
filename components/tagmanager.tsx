import { cookies } from 'next/headers';
import { GoogleTagManager } from '@next/third-parties/google';

export default function GoogleTagManagerInit() {
    const cookieStore = cookies();
    const consent = cookieStore.get('cookie_consent')?.value;

    if (consent === 'accepted') {
        return <GoogleTagManager gtmId="AW-16731906773" />;
    }

    return null;
}
