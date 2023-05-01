/** @type {import('next').NextConfig} */
const path = require("path");
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "blogpfthumb-phinf.pstatic.net",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = withPlugins(
    [
        [
            withPWA,
            {
                pwa: {
                    dest: "public",
                },
            },
        ],
        // 추가 플러그인 작성
    ],
    nextConfig
);
