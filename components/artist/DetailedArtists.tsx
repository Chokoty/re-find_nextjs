'use client';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { HashLoader } from 'react-spinners';

import AuthorProfileHead from '@/components/artist/AuthorProfileHead';
import ViewSelectBar from '@/components/common/ViewSelectBar';
import ArtistHeader from '@/components/layout/ArtistHeader';
import ViewSkeleton from '@/components/skeleton/ViewSkeleton';
import MasonryView from '@/components/views/MasonryView';
import SimpleView from '@/components/views/SimpleView';
import { useArtistInfo } from '@/service/client/artists/useArtistService';

type Props = {
  nickname: string;
  artistInfo: AuthorOverview;
};

export default function DetailedArtists({ nickname, artistInfo }: Props) {
  // const validSortOptions = menuItems.map((item) => item.id);
  // const validBoardOptions = viewTypes.map((item) =>
  //   item.value.replace('_cnt', '')
  // );
  const { ref, inView } = useInView({
    // infinite scroll을 위한 옵저버
    threshold: 0,
    rootMargin: '600px 0px', // 상단에서 600px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });
  let actualNickname = '';
  if (Array.isArray(nickname)) [actualNickname] = nickname;
  else actualNickname = nickname;

  // const [profile] = useState(artistInfo);
  // const [artworks, setArtworks] = useState<ArtworkList[]>([]);
  // const [page, setPage] = useState(1);
  // const [isLastPage, setIsLastPage] = useState(false);
  // const [selectedBoard, setSelectedBoard]setArtworks = useState(null);
  const [sortCriteria, setSortCriteria] = useState({
    field: '',
    order: 'descending', // 'ascending' 또는 'descending'
  });
  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonry'); // 초기 뷰 설정
  const [boardType, setBoardType] = useState(
    // router.query.board &&
    //   validBoardOptions.includes(router.query.board.toString())
    //   ? router.query.board.toString()
    // :
    ''
  );
  // const [sortType, setSortType] = useState(
  //   router.query.sort && validSortOptions.includes(router.query.sort.toString())
  //     ? router.query.sort.toString()
  //     : 'latest'
  // );
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
    // router.push(`/artists/${nickname}?view=${view}&sort=${sortType}`);
  }, []);

  // 삭제된 게시글 보이기
  const handleShowDeleted = useCallback(() => {
    setIsDeletedVisible((prev) => !prev);
  }, []);

  const handleViewTypeSelect = (value: string) => {
    // 같은거 누르면 해제,토글
    // console.log(value.replace('_cnt', ''));
    if (value === sortCriteria.field) {
      setBoardType('');
      setSortCriteria((prevState) => {
        return { ...prevState, field: '', order: 'descending' };
      });
    } else {
      // setBoardType(value.replace('_cnt', ''));
      setBoardType(value);
      setSortCriteria((prevState) => {
        return { ...prevState, field: value, order: 'descending' };
      });
    }
  };

  // useEffect(() => {
  //   if (router.isReady && router.query.board) {
  //     handleViewTypeSelect(router.query.board);
  //   }
  // }, [router, handleViewTypeSelect]);

  // useEffect(() => {
  //   // router.push(`/artists/${nickname}?view=${activeView}&sort=${sortType}`);
  // }, [activeView, sortType]);

  // useEffect(() => {
  //   resetArtworks();
  //   getArtistArtworks();
  // }, [sortCriteria, sortCriteria.field]);

  // useEffect(() => {
  //   if (isInitialRender) {
  //     setIsInitialRender(false);
  //     return;
  //   }
  //   getArtistArtworks();
  // }, [sortType, page]);

  // 무한 스크롤
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  // 초기 작가 artworks 렌더링
  // useEffect(() => {
  //   if (nickname) {
  //     console.log('useEffect when nickname is changed', nickname);
  //     getArtistArtworks();
  //   }
  // }, [nickname]);

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
            nickname={nickname}
            artworks={artworks}
            isDeletedVisible={isDeletedVisible}
            // loadingImage={loadingImage}
            // handleLoading={handleLoading}
            isGallery={false}
          />
        )}
        {activeView === 'grid' && (
          <SimpleView
            artworks={artworks}
            isDeletedVisible={isDeletedVisible}
            // handleLoading={handleLoading}
          />
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
    <Box>
      <>
        <ArtistHeader title="" />
        {artistInfo.author_nickname === '' && artistInfo.num_artworks === 0 && (
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
        )}
        {artistInfo.author_nickname !== '' && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            margin="0 auto"
            mb="2rem"
          >
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
          </Box>
        )}
      </>
    </Box>
  );
}
