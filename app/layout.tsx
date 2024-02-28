import 'normalize.css';
import '@/styles/general.scss';

import type { Metadata, Viewport } from 'next';

import { Header } from '@/components/Header/Header';
import { TabBar } from '@/components/TabBar/TabBar';
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
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

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
          <Header />
          {children}
          <TabBar />
        </Providers>
      </body>
    </html>
  );
}
