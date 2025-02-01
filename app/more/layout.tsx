import type { Metadata } from 'next';

import LeftSection from '@/components/LeftSection';
import PageContentForMore from '@/components/PageContentForMore';
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
    <div className="flex w-full flex-col items-center justify-start">
      {/** 모바일 레이아웃 */}
      <div className="flex w-full flex-col items-center justify-center pb-[60px] md:hidden">
        {children}
      </div>
      {/** 데스크톱 레이아웃 */}
      <div className="mx-auto mt-1 hidden h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2 md:flex">
        <LeftSection />
        <PageContentForMore>{children}</PageContentForMore>
      </div>
    </div>
  );
}
