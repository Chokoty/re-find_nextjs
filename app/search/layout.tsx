import type { Metadata } from 'next';
import { Suspense } from 'react';

import Loading from '@/app/search/components/Loading';
import BackToTopButton from '@/components/BackToTopButton';
import LeftSection from '@/components/LeftSection';
import PageContentForSearch from '@/components/PageContentForSearch';
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
    // <div className="pb-[60px]">
    <div className="mx-auto mt-1 flex h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2">
      <LeftSection />
      <PageContentForSearch>
        {children}
        <Suspense>
          <Loading />
        </Suspense>
        <BackToTopButton />
      </PageContentForSearch>
    </div>
  );
}
