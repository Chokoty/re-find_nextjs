import type { Metadata } from 'next';

import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: siteConfig.gallery.isd.title,
  description: siteConfig.gallery.isd.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.gallery.isd.title,
    description: siteConfig.gallery.isd.description,
    images: siteConfig.image,
    url: siteConfig.gallery.isd.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.gallery.isd.title,
    description: siteConfig.gallery.isd.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

export default function IsdGalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
