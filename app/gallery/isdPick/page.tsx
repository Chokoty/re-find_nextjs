import TopBackground from '@/components/common/TopBackground';
import GalleryTitle from '@/components/gallery/GalleryTitle';
import IsdGallery from '@/components/gallery/IsdGallery';
import { getDehydratedInfiniteQuery, Hydrate } from '@/lib/react-query';
import queryOptions from '@/service/client/gallery/queries';
import { Box } from '@chakra-ui/react';

export const revalidate = 60;

export default async function IsdPage() {
  const { queryKey, queryFn } = queryOptions.isdNoticeArtworks({
    member: 'isd',
    ranktype: 'latest',
  });

  const query = await getDehydratedInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
  });

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
        <Hydrate state={{ queries: [query] }}>
          <IsdGallery />
        </Hydrate>
      </Box>
    </Box>
  );
}
