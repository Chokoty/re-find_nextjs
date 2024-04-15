import 'normalize.css';
import '@/styles/general.scss';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import NextTopLoader from 'nextjs-toploader';

import Header from '@/components/Header';
import MobileTabBar from '@/components/MobileTabBar';
import { siteConfig } from '@/lib/config';
import { Providers } from '@/lib/Providers';

export const metadata: Metadata = {
  title: siteConfig.home.title,
  description: siteConfig.home.description,
  verification: siteConfig.verification,
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
  ArtworkModal,
}: Readonly<{
  children: React.ReactNode;
  ArtworkModal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <body>
        <Providers>
          <NextTopLoader color="#9ae6b4" showSpinner={false} shadow={false} />
          <Header />
          {ArtworkModal}
          <main>{children}</main>
          <MobileTabBar />
          <div id="modal-root" />
          <div id="artwork-modal-root" />
        </Providers>
      </body>
      <GoogleAnalytics gaId={GA_ID} />
      <GoogleTagManager gtmId={GTM_ID} />
    </html>
  );
}
