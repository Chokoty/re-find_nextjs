'use client';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { PuffLoader } from 'react-spinners';

import ArtistsList from '@/components/artist/ArtistsList';
import ArtistsSearchInput from '@/components/artist/ArtistsSearchInput';
import SortTypeButtonGroup from '@/components/artist/SortTypeButtonGroup';
import ViewTypeButtonGroup from '@/components/artist/ViewTypeButtonGroup';
import { useDebounce } from '@/hook/useDebounce';
import { convertBoardParams, convertRankTypeParams } from '@/lib/convertParams';
import NotSearch from '@/public/static/images/original_18.png';
import { useArtistList } from '@/service/client/artists/useArtistService';
import type { SortCriteria } from '@/types';

export default function Artists() {
  const [inputText, setInputText] = useState('');
  const [selectedView, setSelectedView] = useState<keyof AuthorCommon | null>(
    null
  );
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>({
    field: 'total_likes',
    active: true,
  });

  const debouncedSearchTerm = useDebounce<string>(inputText, 600); // 600ms 지연
  const { ref, inView } = useInView({
    threshold: 0,
    // 상단에서 1200px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
    rootMargin: '1200px 0px',
  });

  const {
    fetchNextPage,
    total,
    artists,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useArtistList({
    q: debouncedSearchTerm,
    board: selectedView ? convertBoardParams(selectedView) : null,
    ranktype: convertRankTypeParams(sortCriteria.field),
  });
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleViewSelect = (value: keyof AuthorCommon) => {
    if (selectedView === value) {
      // 뷰 선택 해제
      setSelectedView(null);
    } else {
      setSelectedView((prevValue) => (prevValue === value ? null : value));
    }
  };

  const handleChangeSortCriteria = (field: keyof AuthorCommon) => {
    if (sortCriteria.field === field) {
      return;
    }
    setSortCriteria((prevState) => {
      return { ...prevState, field, active: true };
    });
  };

  const handleClearInputText = () => {
    setInputText('');
  };

  // 무한 스크롤
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const content = () => {
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
            현재 서버와의 연결이 불안정합니다! 이용에 불편을 드려 죄송합니다.
            빠른 시일 내에 해결하겠습니다.
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
        <ArtistsList
          q={debouncedSearchTerm}
          artists={artists}
          sortCriteria={sortCriteria}
          selectedView={selectedView}
        />
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
  };

  return (
    <>
      <ArtistsSearchInput
        nickname={inputText}
        handleSearch={handleSearch}
        handleClear={handleClearInputText}
      />
      <ViewTypeButtonGroup
        total={total}
        selectedView={selectedView}
        handleViewSelect={handleViewSelect}
      />
      <SortTypeButtonGroup
        sortCriteria={sortCriteria}
        handleChangeSortCriteria={handleChangeSortCriteria}
      />
      {content()}
    </>
  );
}
