import type { Metadata } from 'next';

import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: siteConfig.more.main.title,
  description: siteConfig.more.main.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.more.main.title,
    description: siteConfig.more.main.description,
    images: siteConfig.image,
    url: siteConfig.more.main.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.more.main.title,
    description: siteConfig.more.main.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

export default function MoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-[60px]">
      <div className="mx-auto my-6 h-1 w-full max-w-40 rounded-md bg-green-highlight dark:bg-pink-highlight" />
      {children}
    </div>
  );
}
