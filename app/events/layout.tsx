import type { Metadata } from 'next';

import LeftSection from '@/components/LeftSection';
import PageContent from '@/components/PageContent';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: siteConfig.events.main.title,
  description: siteConfig.events.main.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.events.main.title,
    description: siteConfig.events.main.description,
    images: siteConfig.image,
    url: siteConfig.events.main.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.events.main.title,
    description: siteConfig.events.main.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

export default function ArtistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div className="w-full pb-[60px]">
    <div className="mx-auto mt-1 flex h-[calc(100vh-72px)] w-full items-start justify-center gap-2 overflow-hidden px-2">
      <LeftSection />
      <PageContent>{children}</PageContent>
    </div>
  );
}
