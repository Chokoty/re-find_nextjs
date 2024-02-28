import axios from 'axios';
import type { Metadata } from 'next';

import DetailedArtists from '@/components/artist/DetailedArtists';
import { siteConfig } from '@/lib/config';

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

export default async function page({ params }: Params) {
  const { nickname } = params;
  const artistInfo = await axios
    .get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/author_name2info?name=${nickname}`
    )
    .then((res) => res.data);

  return <DetailedArtists nickname={nickname} artistInfo={artistInfo} />;
}
