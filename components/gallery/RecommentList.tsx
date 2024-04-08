import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React from 'react';

import ViewSkeleton from '@/components/skeleton/ViewSkeleton';
import MasonryView from '@/components/views/MasonryView';
import { useRecommendArtwork } from '@/service/client/gallery/useGalleryService';

export default function RecommentList({ getAp }: { getAp: () => number }) {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useRecommendArtwork({
    artworkId: parseInt(params.id),
    ap: getAp(),
  });
  if (isLoading) {
    return (
      <Box
        mt="2rem"
        w="100%"
        p="0 1.5rem"
        overflow="hidden"
        display="flex"
        flex="row"
        justifyContent="center"
      >
        <ViewSkeleton view="masonry" />
      </Box>
    );
  }

  return (
    <Box
      mt="2rem"
      w="100%"
      p="0 1.5rem"
      overflow="hidden"
      display="flex"
      flex="row"
      justifyContent="center"
    >
      {!data || !data.list || data.list.length === 0 ? (
        <Alert status="error" w="90%" borderRadius="1rem" flexDir="column">
          <Box display="flex">
            <AlertIcon />
            <AlertTitle>추천 시스템 준비</AlertTitle>
          </Box>
          <AlertDescription>
            현재 해당 게시글에 대한 추천 시스템이 준비 중입니다.
          </AlertDescription>
        </Alert>
      ) : (
        <MasonryView
          artworks={data.list.filter((artwork) => artwork.is_hyum === false)}
          isDeletedVisible={false}
        />
      )}
    </Box>
  );
}
