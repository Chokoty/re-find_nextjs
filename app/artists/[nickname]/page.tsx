import { Box, Center, Text } from '@chakra-ui/react';
import type { Metadata } from 'next';
import Image from 'next/image';

import DetailedArtists from '@/components/artist/DetailedArtists';
import ArtistHeader from '@/components/layout/ArtistHeader';
import { siteConfig } from '@/lib/config';
import { getDehydratedInfiniteQuery, Hydrate } from '@/lib/react-query';
import queryOptions from '@/service/client/artists/queries';
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
  const { author_nickname, num_artworks } = result;
  const { queryKey, queryFn } = queryOptions.artistInfo({
    nickname: decodedNickname,
    sortType: 'latest',
    field: '',
  });
  const query = await getDehydratedInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
  });
  return (
    <Box>
      <ArtistHeader title="" />
      {author_nickname === '' && num_artworks === 0 ? (
        <NotFount nickname={decodedNickname} />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin="0 auto"
          mb="2rem"
        >
          <Hydrate state={{ queries: [query] }}>
            <DetailedArtists nickname={decodedNickname} artistInfo={result} />
          </Hydrate>
        </Box>
      )}
    </Box>
  );
}

const NotFount = ({ nickname }: { nickname: string }) => {
  return (
    <Center
      w="100%"
      h="80vh"
      p="3rem 0"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Text fontSize={['2xl', '4xl']} fontWeight="600" mb="4rem">
        {`'${nickname}' 님의 프로필`}
      </Text>
      <Text fontSize={['xl', '3xl']}>존재하지 않는 아이디 이거나</Text>
      <Text fontSize={['xl', '3xl']} mb="2rem">
        아직 업로드한 작품이 없는 것 같네요
      </Text>
      <Image
        src="/static/images/original_18.png"
        alt="이파리티콘-추워"
        width={200}
        height={200}
        unoptimized
      />
    </Center>
  );
};
