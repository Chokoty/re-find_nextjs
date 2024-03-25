import { Box } from '@chakra-ui/react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import TopBackground from '@/components/common/TopBackground';
import IsdGallery from '@/components/gallery/IsdGallery';
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
      {/* <GalleryHeader title={팬아트 갤러리} /> */}
      <TopBackground>
        {/* <GalleryTitle titleText={topTitle} isMember={false} /> */}
        {/* <PageTitle topTitle={topTitle} /> */}
        <></>
      </TopBackground>
      <Box
        w="100%"
        className="layout"
        position="relative"
        top="-460px"
        zIndex="2"
      >
        <HydrationBoundary state={{ queries }}>
          <IsdGallery />
        </HydrationBoundary>
      </Box>
    </Box>
  );
}
