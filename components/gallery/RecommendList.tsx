import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { HashLoader } from 'react-spinners';

import ViewSkeleton from '@/components/skeleton/ViewSkeleton';
import MasonryView from '@/components/views/MasonryView';
import { useRecommendArtwork } from '@/service/client/gallery/useGalleryService';

export default function RecommendList({ getAp }: { getAp: () => number }) {
  const params = useParams<{ id: string }>();
  // infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '800px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const { fetchNextPage, artworks, isError, isFetchingNextPage, isLoading } =
    useRecommendArtwork({
      artworkId: parseInt(params.id),
      ap: getAp(),
    });

  // 무한 스크롤
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const contents = () => {
    if (isLoading) return <HashLoader color="#01BFA2" />;
    if (isError || !artworks || artworks.length === 0 || !artworks?.[0]) {
      return (
        <Alert status="error" w="90%" borderRadius="1rem" flexDir="column">
          <Box display="flex">
            <AlertIcon />
            <AlertTitle>추천 시스템 준비</AlertTitle>
          </Box>
          <AlertDescription>
            현재 해당 게시글에 대한 추천 시스템이 준비 중입니다.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <>
        <MasonryView
          artworks={artworks.filter((artwork) => artwork.is_hyum === false)}
          isDeletedVisible={false}
        />
        {isFetchingNextPage ? (
          <Box
            w="100%"
            mt="1.5rem"
            mb="1.5rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <HashLoader color="#01BFA2" />
          </Box>
        ) : (
          // Observer를 위한 div
          <Box ref={ref} w="100%" h="5rem" />
        )}
      </>
    );
  };

  return (
    <Box
      mt="2rem"
      w="100%"
      p={['0 0.5rem', '0 1.5rem']}
      overflow="hidden"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      {contents()}
    </Box>
  );
}
