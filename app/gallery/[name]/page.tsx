import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

import DetailedGallery from '@/components/gallery/DetailedGallery';
import gallery from '@/data/gallery';
import members from '@/data/members';
import { siteConfig } from '@/lib/config';
import queryOptions from '@/service/client/gallery/queries';

type Params = { params: { name: string } };

// Image url 고민
export function generateMetadata({ params: { name } }: Params): Metadata {
  const { title, description, url } = siteConfig.gallery.detailed(name);
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
  const { name } = params;

  const endpoint =
    members.find((item) => item.value === name)?.query ||
    gallery.find((item) => item.value === name)?.query;

  const { queryKey, queryFn } = queryOptions.galleryArtworks({
    query: endpoint ?? '',
    sortType: 'alzaltak',
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
      <DetailedGallery value={name} endpoint={endpoint ?? ''} />;
    </HydrationBoundary>
  );
}
