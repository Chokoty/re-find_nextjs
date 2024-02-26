/** @type {import('next').NextConfig} */
const path = require('path');
const nextComposePlugins = require('next-compose-plugins');
const { withPlugins } = nextComposePlugins.extend(() => ({}));
const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', // 환경변수 ANALYZE가 true일 때 실행
  openAnalyzer: true, // 브라우저에 자동으로 분석결과를 새 탭으로 Open
});
const isProduction = process.env.NODE_ENV === 'production';

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
    ],
  },
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  // 개발 환경을 위한 proxy 설정입니다.
  // rewrites: async () => {
  //   return [
  //     {
  //       source: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/:path*`,
  //       destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
  //     },
  //   ];
  // },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          disable: !isProduction,
          runtimeCaching: [],
        },
      },
    ],
    [withBundleAnalyzer],
  ],
  nextConfig
);
