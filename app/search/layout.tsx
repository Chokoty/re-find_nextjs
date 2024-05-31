import type { Metadata } from 'next';

import Loading from '@/app/search/components/Loading';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: siteConfig.search.main.title,
  description: siteConfig.search.main.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.search.main.title,
    description: siteConfig.search.main.description,
    images: siteConfig.image,
    url: siteConfig.search.main.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.search.main.title,
    description: siteConfig.search.main.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

export default function NoticeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Loading />
    </>
  );
}
