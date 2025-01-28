import type { Metadata } from 'next';

import UpdateLog from '@/app/more/components/UpdateLog';
import PageTitle from '@/components/PageTitle';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: siteConfig.more.notice.title,
  description: siteConfig.more.notice.description,
  openGraph: {
    type: siteConfig.type,
    title: siteConfig.more.notice.title,
    description: siteConfig.more.notice.description,
    images: siteConfig.image,
    url: siteConfig.more.notice.url,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.siteName,
    creator: siteConfig.creator,
    title: siteConfig.more.notice.title,
    description: siteConfig.more.notice.description,
    images: siteConfig.image,
  },
  icons: siteConfig.icons,
};

const topTitle = {
  title: '공지사항',
  description: '',
};

export default function Notice() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <PageTitle topTitle={topTitle} />
      <UpdateLog />
    </div>
  );
}
