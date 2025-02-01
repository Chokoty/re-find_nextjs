import type { Metadata } from 'next';

import BackToTopButton from '@/components/BackToTopButton';
import LeftSection from '@/components/LeftSection';
import PageContent from '@/components/PageContent';
import { siteConfig } from '@/lib/config';

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
    // <div className="pb-[60px]">
    <div className="mx-auto mt-1 flex h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2">
      <LeftSection />
      <PageContent>{children}</PageContent>
      <BackToTopButton />
    </div>
  );
}
