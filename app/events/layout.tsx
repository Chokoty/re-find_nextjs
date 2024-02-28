import type { Metadata } from 'next';

import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: siteConfig.events.main.title,
  description: siteConfig.events.main.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.events.main.title,
    description: siteConfig.events.main.description,
    images: siteConfig.image,
    url: siteConfig.events.main.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.events.main.title,
    description: siteConfig.events.main.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

export default function ArtistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
