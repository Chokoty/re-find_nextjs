/** @type {import('next').NextConfig} */
const path = require('path');
const nextComposePlugins = require('next-compose-plugins');
const { withPlugins } = nextComposePlugins.extend(() => ({}));
const withPWA = require('next-pwa');
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
    // 추가 플러그인 작성
  ],
  nextConfig
);
