import type { Metadata } from 'next';

import BackToTopButton from '@/components/BackToTopButton';
import LeftSection from '@/components/LeftSection';
import PageContent from '@/components/PageContent';
import { siteConfig } from '@/lib/config';
import PageContentForMore from '@/components/PageContentForMore';

export const metadata: Metadata = {
  title: siteConfig.gallery.main.title,
  description: siteConfig.gallery.main.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.gallery.main.title,
    description: siteConfig.gallery.main.description,
    images: siteConfig.image,
    url: siteConfig.gallery.main.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.gallery.main.title,
    description: siteConfig.gallery.main.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

export default function GalleryLayout({
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
        <BackToTopButton />
      </div>
    </div>
  );
}
