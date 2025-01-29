import type { Metadata } from 'next';

import queryOptions from '@/app/artists/service/client/queries';
import DetailedEvent from '@/app/events/components/DetailedEvent';
import FanartWorldCup from '@/app/events/components/FanartWorldCup';
import GomemVotePredict from '@/app/events/components/GomemVotePredict';
import RandomGacha from '@/app/events/components/RandomGacha';
import WaktyHall from '@/app/events/components/WaktyHall';
import { siteConfig } from '@/lib/config';
import { getDehydratedInfiniteQuery, Hydrate } from '@/lib/react-query';

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

export default async function Page({ params: { keyword } }: Params) {
  const decodedKeyword = decodeURIComponent(keyword);

  if (keyword === 'randomGacha') {
    return <RandomGacha />;
  }
  if (keyword === 'waktyhall') {
    return <WaktyHall />;
  }
  if (keyword === 'fanartWorldCup') {
    return <FanartWorldCup />;
  }
  if (keyword === 'gomemVotePredict') {
    return <GomemVotePredict />;
  }

  // ✅ 환경 변수를 안전하게 체크 (undefined 방지)
  const isLocal = process.env.NEXT_PUBLIC_IS_LOCAL === 'true';

  if (!isLocal) {
    // ✅ 서버에서 실행될 경우 window 사용 방지
    if (typeof window === 'undefined') {
      console.log('Running on server, skipping client-side logic.');
    } else {
      console.log('Running on client.');
    }

    const { queryKey, queryFn } = queryOptions.artistInfo({
      nickname: decodedKeyword,
      sortType: 'latest',
      board: null,
    });

    const query = await getDehydratedInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam: 1,
    });

    return (
      <Hydrate state={{ queries: [query] }}>
        <DetailedEvent keyword={decodedKeyword} />
      </Hydrate>
    );
  }

  return <DetailedEvent keyword={decodedKeyword} />;
}
