import { Box } from '@chakra-ui/react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import TopBackground from '@/components/common/TopBackground';
import GalleryTitle from '@/components/gallery/GalleryTitle';
import IsdGallery from '@/components/gallery/IsdGallery';
import GalleryHeader from '@/components/layout/GalleryHeader';
import queryOptions from '@/service/client/gallery/queries';

export default async function IsdPage() {
  const { queryKey, queryFn } = queryOptions.isdNoticeArtworks({
    member: 'all',
    ranktype: 'latest',
  });

  // const query = await getDehydratedQuery({ queryKey, queryFn });
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
        <GalleryTitle pageType="isdPick" />
        {/* <PageTitle topTitle={topTitle} /> */}
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
          <IsdGallery />
        </HydrationBoundary>
      </Box>
    </Box>
  );
}
