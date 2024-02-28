import type { Metadata } from 'next';

import DetailedEvent from '@/components/event/DetailedEvent';
import { siteConfig } from '@/lib/config';

type Params = { params: { keyword: string } };

// Image url 고민
export function generateMetadata({ params: { keyword } }: Params): Metadata {
  const { title, description, url } = siteConfig.events.detailed(keyword);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: siteConfig.type,
      images: siteConfig.image,
      siteName: siteConfig.siteName,
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      site: siteConfig.siteName,
      creator: siteConfig.creator,
      images: siteConfig.image,
    },
    icons: siteConfig.icons,
  };
}

export default function page({ params }: Params) {
  const { keyword } = params;
  return <DetailedEvent keyword={keyword} />;
}
