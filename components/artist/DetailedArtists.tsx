'use client';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { HashLoader } from 'react-spinners';

import AuthorProfileHead from '@/components/artist/AuthorProfileHead';
import ViewSelectBar from '@/components/common/ViewSelectBar';
import ViewSkeleton from '@/components/skeleton/ViewSkeleton';
import MasonryView from '@/components/views/MasonryView';
import SimpleView from '@/components/views/SimpleView';
import { useArtistInfo } from '@/service/client/artists/useArtistService';

type Props = {
  nickname: string;
  artistInfo: AuthorOverview;
};

export default function DetailedArtists({ nickname, artistInfo }: Props) {
  const { ref, inView } = useInView({
    // infinite scroll을 위한 옵저버
    threshold: 0,
    rootMargin: '1300px 0px', // 상단에서 1000px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });
  let actualNickname = '';
  if (Array.isArray(nickname)) [actualNickname] = nickname;
  else actualNickname = nickname;
  const [sortCriteria, setSortCriteria] = useState({
    field: '',
    order: 'descending', // 'ascending' 또는 'descending'
  });
  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonry'); // 초기 뷰 설정
  const [boardType, setBoardType] = useState('');
  const [sortType, setSortType] = useState('latest'); // TODO: 이전 부분 삭제 (query가 들어갈 수 있는 상황이 없는 것 같아서)
  const [isDeletedVisible, setIsDeletedVisible] = useState(false);

  const { fetchNextPage, artworks, isError, isFetchingNextPage, isLoading } =
    useArtistInfo({ nickname, sortType, field: sortCriteria.field });

  // 정렬 선택하기
  const handleMenuItemClick = useCallback(
    (menuText: string) => {
      // console.log(menuText);
      if (menuText === sortType) return;
      setSortType(menuText);
    },
    [sortType]
  );

  // 뷰 선택하기
  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  // 삭제된 게시글 보이기
  const handleShowDeleted = useCallback(() => {
    setIsDeletedVisible((prev) => !prev);
  }, []);

  const handleViewTypeSelect = (value: string) => {
    // 같은거 누르면 해제,토글
    if (value === sortCriteria.field) {
      setBoardType('');
      setSortCriteria((prevState) => {
        return { ...prevState, field: '', order: 'descending' };
      });
    } else {
      setBoardType(value);
      setSortCriteria((prevState) => {
        return { ...prevState, field: value, order: 'descending' };
      });
    }
  };

  // 무한 스크롤
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const content = () => {
    if (isLoading) {
      return <ViewSkeleton view={activeView} />;
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

    if (!artworks || artworks.length === 0) return;

    return (
      <Box
        w="100%"
        overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
      >
        {activeView === 'masonry' && (
          <MasonryView
            artworks={artworks}
            isDeletedVisible={isDeletedVisible}
          />
        )}
        {activeView === 'grid' && (
          <SimpleView artworks={artworks} isDeletedVisible={isDeletedVisible} />
        )}
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
      </Box>
    );
  };

  return (
    <>
      <AuthorProfileHead
        nickname={actualNickname}
        profile={artistInfo}
        boardType={boardType}
        handleViewTypeSelect={handleViewTypeSelect}
      />
      <ViewSelectBar
        activeView={activeView}
        onViewChange={handleViewChange}
        selectedMenu={sortType}
        onMenuItemClick={handleMenuItemClick}
        isDeletedVisible={isDeletedVisible}
        handleShowDeleted={handleShowDeleted}
        topOffset={59}
        isdPick={false}
      />
      {content()}
    </>
  );
}
