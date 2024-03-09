import type { Metadata } from 'next';

import DetailedArtists from '@/components/artist/DetailedArtists';
import { siteConfig } from '@/lib/config';
import { getAuthorInfo } from '@/service/server/artists';

type Params = {
  params: { nickname: string };
};

// Image url 고민
export function generateMetadata({ params: { nickname } }: Params): Metadata {
  const { title, description, url } = siteConfig.artists.detailed(nickname);
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

export default async function page({ params: { nickname } }: Params) {
  const decodedNickname = decodeURIComponent(nickname);
  const result = await getAuthorInfo(nickname);
  return <DetailedArtists nickname={decodedNickname} artistInfo={result} />;
}
