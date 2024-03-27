import { Box } from '@chakra-ui/react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

import TopBackground from '@/components/common/TopBackground';
import DetailedGallery from '@/components/gallery/DetailedGallery';
import GalleryTitle from '@/components/gallery/GalleryTitle';
import gallery from '@/data/gallery';
import members2 from '@/data/members2';
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

export default async function page({ params: { name } }: Params) {
  const endpoint =
    members2.find((item) => item.value === name)?.query ||
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
    <Box className="body" minH="240vh" w="100%" m="0 auto">
      <TopBackground>
        <GalleryTitle pageType={name} />
        <></>
      </TopBackground>
      <Box
        as="section"
        w="100%"
        className="layout"
        position="relative"
        top={['-60px', '-90px', '-120px', '-180px', '-220px']} // -220px(-60px + -160px)
        zIndex="2"
      >
        <HydrationBoundary state={{ queries }}>
          <DetailedGallery value={name} endpoint={endpoint ?? ''} />
        </HydrationBoundary>
      </Box>
    </Box>
  );
}
