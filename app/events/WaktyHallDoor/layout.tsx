import type { Metadata } from 'next';

import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: siteConfig.more.about.title,
  description: siteConfig.more.about.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.more.about.title,
    description: siteConfig.more.about.description,
    images: siteConfig.image,
    url: siteConfig.more.about.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.more.about.title,
    description: siteConfig.more.about.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

// export const dynamic = 'force-dynamic';

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
