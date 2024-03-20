import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

import DetailedEvent from '@/components/event/DetailedEvent';
import { siteConfig } from '@/lib/config';
import queryOptions from '@/service/client/artists/queries';

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

export default async function page({ params: { keyword } }: Params) {
  const decodedKeyword = decodeURIComponent(keyword);

  const { queryKey, queryFn } = queryOptions.artistInfo({
    nickname: decodedKeyword,
    sortType: 'latest',
    field: '',
  });
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
  });
  const { queries } = dehydrate(queryClient);
  return (
    <HydrationBoundary state={{ queries }}>
      <DetailedEvent keyword={decodedKeyword} />;
    </HydrationBoundary>
  );
}
