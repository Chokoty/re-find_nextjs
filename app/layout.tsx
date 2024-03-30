import 'normalize.css';
import '@/styles/general.scss';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import NextTopLoader from 'nextjs-toploader';

import Header from '@/components/Header';
import TabBar from '@/components/TabBar/TabBar';
import { siteConfig } from '@/lib/config';
import { Providers } from '@/lib/Providers';

export const metadata: Metadata = {
  title: siteConfig.home.title,
  description: siteConfig.home.description,
  metadataBase: new URL(siteConfig.mainDomain),
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.home.title,
    description: siteConfig.home.description,
    images: siteConfig.image,
    url: siteConfig.home.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.home.title,
    description: siteConfig.home.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
  referrer: 'no-referrer',
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID!;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <body>
        <Providers>
          <NextTopLoader color="#9ae6b4" showSpinner={false} shadow={false} />
          <Header />
          <main>{children}</main>
          <TabBar />
          <div id="overlays" />
          <div id="promptOverlays" />
        </Providers>
      </body>
      <GoogleAnalytics gaId={GA_ID} />
      <GoogleTagManager gtmId={GTM_ID} />
    </html>
  );
}
