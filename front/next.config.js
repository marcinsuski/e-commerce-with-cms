/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
        ssr: true,
        cssProp: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "marcin-next-ecommerce.s3.amazonaws.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
