/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'scontent-ams2-1.xx.fbcdn.net',
            },
            {
                protocol: 'https',
                hostname: 'scontent-ams4-1.xx.fbcdn.net',
            }
        ],
    },
    reactStrictMode: true,
    // Treatments the salon no longer offers keep their search traffic: each old URL (current and legacy slug) points
    // to the nearest live page.
    redirects() {
        return [
            { source: '/servicii/remodelare-corporala/masaj-vacuum-anticelulitic', destination: '/servicii/remodelare-corporala', permanent: true },
            { source: '/servicii/Remodelare-Corporala/Masaj-Vacuum-Anticelulitic', destination: '/servicii/remodelare-corporala', permanent: true },
            { source: '/servicii/dermato-cosmetica/microdermabraziune', destination: '/servicii/dermato-cosmetica/aqua-hydra-hidrodermabraziune', permanent: true },
            { source: '/servicii/Dermato-Cosmetica/Microdermabraziune', destination: '/servicii/dermato-cosmetica/aqua-hydra-hidrodermabraziune', permanent: true },
        ];
    },
};

export default nextConfig;