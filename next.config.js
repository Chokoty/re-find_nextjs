/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const path = require('path');
const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', // 환경변수 ANALYZE가 true일 때 실행
  openAnalyzer: true, // 브라우저에 자동으로 분석결과를 새 탭으로 Open
});

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: !isProduction,
  runtimeCaching: [],
});

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dthumb-phinf.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cafeptthumb-phinf.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blogpfthumb-phinf.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ssl.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '146.56.39.42:65434',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  // 개발 환경을 위한 proxy 설정입니다.
  rewrites: async () => {
    return [
      // {
      //   source: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/:path*`,
      //   destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
      // },
      {
        source: `/api2/:path*`,
        destination: `http://146.56.39.42:65434/:path*`,
      },
    ];
  },
};

module.exports = withPlugins([withPWA, withBundleAnalyzer], nextConfig);
