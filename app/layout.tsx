import '@/styles/globals.css';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';

import AlbumSelectionSaveButton from '@/components/Button/AlbumSelectionSaveButton';
import FanartsInAlbumDeleteButton from '@/components/Button/FanartsInAlbumDeleteButton';
import Header from '@/components/Header';
import MobileActionBar from '@/components/MobileActionBar';
import MobileTabBar from '@/components/MobileTabBar';
import { siteConfig } from '@/lib/config';
import { oneMobilePop, pretendard } from '@/lib/fonts';
import { Providers } from '@/lib/Providers';

export const metadata: Metadata = {
  title: siteConfig.home.title,
  description: siteConfig.home.description,
  verification: siteConfig.verification,
  metadataBase: new URL(siteConfig.mainDomain),
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.home.title,
    description: siteConfig.home.description,
    images: siteConfig.image,
    url: siteConfig.home.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.home.title,
    description: siteConfig.home.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
  referrer: 'no-referrer',
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID!;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="kr"
      className={`dark ${pretendard.className} ${oneMobilePop.variable} h-full`}
      suppressHydrationWarning
    >
      {/** className="h-full bg-light-background text-gray-900 dark:bg-dark-background dark:text-gray-50" */}
      <body className="h-full">
        <Providers>
          {/* var(--green-200) - #9ae6b4 */}
          <NextTopLoader color="#9ae6b4" showSpinner={false} shadow={false} />
          <Header />
          {/* main height: includes header + mobileTabBar */}
          {/* <main className="overflow-x-hidden py-[calc(60px+16px)]"> */}
          <main className="overflow-x-hidden pt-[calc(60px)]">{children}</main>
          <MobileTabBar />
          <Suspense>
            <MobileActionBar />
            <AlbumSelectionSaveButton />
            {/* TODO: Popover 를 활용하여 삭제 버튼 쪽에 위치 변경하기 */}
            <FanartsInAlbumDeleteButton />
          </Suspense>
          <div id="modal-root" />
        </Providers>
      </body>
      {!process.env.NEXT_PUBLIC_IS_LOCAL! && (
        <>
          <GoogleAnalytics gaId={GA_ID} />
          <GoogleTagManager gtmId={GTM_ID} />
        </>
      )}
    </html>
  );
}
