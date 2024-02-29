import type { Metadata } from 'next';

import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: siteConfig.more.support.title,
  description: siteConfig.more.support.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.more.support.title,
    description: siteConfig.more.support.description,
    images: siteConfig.image,
    url: siteConfig.more.support.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.more.support.title,
    description: siteConfig.more.support.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
