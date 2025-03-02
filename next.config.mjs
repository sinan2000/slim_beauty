import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({	
    enabled: process.env.ANALYZE === 'true',	
});

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
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            }
        ],
    },
    reactStrictMode: true,
};

export default bundleAnalyzer(nextConfig);
