import { Box } from '@chakra-ui/react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Artists from '@/components/artist/Artists';
import ArtistsSearchInput from '@/components/artist/ArtistsSearchInput';
import PageTitle from '@/components/common/PageTitle';
import queryOptions from '@/service/client/artists/queries';

const topTitle = {
  title: '왁타버스 작가',
  description: '왁물원에서 활동중인 작가님의 작품을 모아서 볼 수 있어요',
};

export default async function ArtistsPage() {
  // const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  const { queryKey, queryFn } = queryOptions.artistList({
    q: '',
    ranktype: 'like',
    board: null,
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
    <Box
      mt="10px"
      mb="10px"
      p="1rem"
      textAlign="center"
      w="100%"
      // backgroundColor={bg}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <PageTitle topTitle={topTitle} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt="3rem"
        w="100%"
        maxW="1024px"
        gap="1rem"
      >
        <ArtistsSearchInput />
        <HydrationBoundary state={{ queries }}>
          <Artists />
        </HydrationBoundary>
      </Box>
    </Box>
  );
}
