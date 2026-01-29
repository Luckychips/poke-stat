import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https", // 모든 HTTPS 도메인 허용
                hostname: "**",
            },
            {
                protocol: "http", // 모든 HTTP 도메인 허용 (보안 주의)
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
