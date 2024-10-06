/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true
    },
    images: {
        domains: ['s3-alpha-sig.figma.com'],
    },
};

export default nextConfig;
