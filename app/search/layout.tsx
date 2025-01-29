import type { Metadata } from 'next';
import { Suspense } from 'react';

import Loading from '@/app/search/components/Loading';
import SearchMobile from '@/app/search/components/SearchMobile';
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

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col items-center justify-start">
      {/* /** 모바일 레이아웃 */}
      <SearchMobile />
      <div className="flex w-full flex-col items-center justify-center pb-[60px] md:hidden">
        {children}
      </div>
      {/* /** 데스크톱 레이아웃 */}
      <div className="mx-auto mt-1 hidden h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2 md:flex">
        <LeftSection />
        <PageContentForSearch>
          {children}
          <Suspense>
            <Loading />
          </Suspense>
          <BackToTopButton />
        </PageContentForSearch>
      </div>
    </div>
  );
}
