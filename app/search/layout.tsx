import type { Metadata } from 'next';
import { Suspense } from 'react';

import PageButtonListForSearch from '@/app/(home)/components/PageButtonListForSearch';
import Loading from '@/app/search/components/Loading';
import SearchMobile from '@/app/search/components/SearchMobile';
import CustomScrollContainer from '@/components/CustomScrollContainer';
import LeftSection from '@/components/LeftSection';
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
      <Suspense>
        <SearchMobile />
      </Suspense>
      <div className="flex w-full flex-col items-center justify-center pb-[60px] md:hidden">
        {children}
      </div>
      {/* /** 데스크톱 레이아웃 */}
      <div className="mx-auto mt-1 hidden h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2 md:flex">
        <LeftSection />
        <section className="flex h-full w-2/3 grow flex-col items-center justify-start overflow-hidden rounded-lg border-base border-dark-myText bg-white shadow-sm dark:border-0 dark:bg-dark-card">
          <CustomScrollContainer className="flex size-full flex-col items-center justify-start bg-white shadow-sm dark:border-0 dark:bg-dark-card">
            <PageButtonListForSearch />
            {children}
            <Suspense>
              <Loading />
            </Suspense>
          </CustomScrollContainer>
        </section>
      </div>
    </div>
  );
}
