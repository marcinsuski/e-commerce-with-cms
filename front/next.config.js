/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
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
