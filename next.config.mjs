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
};

export default nextConfig;