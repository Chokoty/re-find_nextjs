import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PuffLoader } from 'react-spinners';
import { useShallow } from 'zustand/react/shallow';

import { convertBoardParams, convertRankTypeParams } from '@/lib/convertParams';
import NotSearch from '@/public/static/images/original_18.png';
import { useArtistList } from '@/service/client/artists/useArtistService';
import { useArtistSearchInfoStore } from '@/store/artistSearchInfoStore';
import { darkMode, lightMode } from '@/styles/theme';
import type { SortCriteria } from '@/types';

import ArtistCard from './ArtistCard';

type Props = {
  sortCriteria: SortCriteria;
  selectedView: keyof AuthorCommon | null;
};

export default function ArtistList({ sortCriteria, selectedView }: Props) {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const { setTotal, debounceVal: q } = useArtistSearchInfoStore(
    useShallow((state) => ({
      debounceVal: state.debounceValue,
      setTotal: state.setTotal,
    }))
  );
  const {
    fetchNextPage,
    total,
    artists,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useArtistList({
    q,
    board: selectedView ? convertBoardParams(selectedView) : null,
    ranktype: convertRankTypeParams(sortCriteria.field),
  });

  const { ref, inView } = useInView({
    threshold: 0,
    // 상단에서 1200px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
    rootMargin: '1200px 0px',
  });

  useEffect(() => {
    setTotal(total);
  }, [total]);

  // 무한 스크롤
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const highlightText = (text: string) => {
    const regex = new RegExp(q, 'gi');

    return text.replace(
      regex,
      (match) => `<span style="color: #01BFA2">${match}</span>`
    );
  };

  if (isLoading) {
    return (
      <Box
        w="100%"
        mt="1.5rem"
        mb="1.5rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="500px"
        borderBottomRadius="1rem"
      >
        <PuffLoader color="#01BFA2" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert
        status="error"
        w="100%"
        borderRadius="1rem"
        justifyContent="center"
      >
        <AlertIcon />
        <AlertTitle>서버 에러</AlertTitle>
        <AlertDescription>
          현재 서버와의 연결이 불안정합니다! 이용에 불편을 드려 죄송합니다. 빠른
          시일 내에 해결하겠습니다.
        </AlertDescription>
      </Alert>
    );
  }

  if (!artists || artists.length === 0 || (total ?? 0) === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minH="350px"
        width="100%"
      >
        <Image
          src={NotSearch}
          alt="찾을 수 없음을 표시"
          width={202}
          height={172}
          unoptimized
        />
        <Text
          pl="1rem"
          m="1rem 0"
          as="h3"
          fontSize="1rem"
          textAlign="left"
          // w="500px"
        >
          검색 결과가 없습니다. 다른 닉네임으로 검색해 보세요
        </Text>
      </Box>
    );
  }

  return (
    <Box
      w="100%"
      overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
    >
      <Box
        mt="1rem"
        p="1rem"
        w="100%"
        maxW="1024px"
        m="0 auto"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        backgroundColor={bg2}
        borderRadius="1rem"
      >
        {artists.map((artist, index) => {
          return (
            !artist.nick.includes('탈퇴회원') && (
              <ArtistCard
                artist={artist}
                nth={index + 1}
                sortCriteria={sortCriteria}
                selectedView={selectedView}
                highlightedText={highlightText(artist.nick)}
                key={`${artist.nick}-${index}`}
              />
            )
          );
        })}
      </Box>
      {isFetchingNextPage ? (
        <Box
          w="100%"
          m="2rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PuffLoader color="#01BFA2" />
        </Box>
      ) : (
        // Observer를 위한 div
        <Box ref={ref} w="100%" h="5rem" />
      )}
    </Box>
  );
}
