import type { Metadata } from 'next';

import UpdateLog from '@/app/more/components/UpdateLog';
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

export default function Notice() {
  return (
    <div className="mx-4 mb-14 mt-4">
      <UpdateLog />
    </div>
  );
}
