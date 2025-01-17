import type { Metadata } from 'next';
import { Suspense } from 'react';

import Loading from '@/app/search/components/Loading';
import BackToTopButton from '@/components/BackToTopButton';
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
    <div className="pb-[60px]">
      {children}
      <Suspense>
        <Loading />
      </Suspense>
      <BackToTopButton />
    </div>
  );
}
