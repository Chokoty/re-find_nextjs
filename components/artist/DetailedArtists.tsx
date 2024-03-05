'use client';

import { Box, Center, Text, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import AuthorProfileHead from '@/components/artist/AuthorProfileHead';
import LoadButton from '@/components/common/LoadButton';
import ViewSelectBar from '@/components/common/ViewSelectBar';
import ArtistHeader from '@/components/layout/ArtistHeader';
import MasonryView from '@/components/views/MasonryView';
import SimpleView from '@/components/views/SimpleView';
import { getArtistInfo } from '@/lib/service/client/artists';
import { isAxiosError } from 'axios';

type Props = {
  nickname: string;
  artistInfo: AuthorOverview;
};

export default function DetailedArtists({ nickname, artistInfo }: Props) {
  const toast = useToast();
  // const validSortOptions = menuItems.map((item) => item.id);
  // const validBoardOptions = viewTypes.map((item) =>
  //   item.value.replace('_cnt', '')
  // );
  const { ref, inView } = useInView({
    // infinite scroll을 위한 옵저버
    threshold: 0,
    rootMargin: '600px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });
  let actualNickname = '';
  if (Array.isArray(nickname)) [actualNickname] = nickname;
  else actualNickname = nickname;

  // const [profile] = useState(artistInfo);
  const [artworks, setArtworks] = useState<ArtworkList[]>([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  // const [selectedBoard, setSelectedBoard] = useState(null);
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
  const [isInitialRender, setIsInitialRender] = useState(true);

  // react-spinners
  const [loadingData, setLoadingData] = useState(false);

  // useEffect(() => {
  //   // URL에 새로운 정렬 조건을 반영합니다.
  //   const currentPath = router.pathname;
  //   const { board, ...restQuery } = router.query;
  //   const currentQuery: { [key: string]: string } = {
  //     ...restQuery,
  //     sort: sortType,
  //   };
  //   // if (boardType !== '') {
  //   //   currentQuery = { ...currentQuery, board: boardType };
  //   // }
  //   router.push(
  //     {
  //       pathname: currentPath,
  //       query: currentQuery,
  //     },
  //     undefined,
  //     { shallow: true }
  //   );
  // }, [sortType, boardType, router]);

  const loadData = () => {
    console.log('loadData');
    getArtistArtworks();
  };

  const resetArtworks = useCallback(() => {
    setArtworks([]);
    setPage(1);
    setIsLastPage(false);
  }, []);

  // 정렬 선택하기
  const handleMenuItemClick = useCallback(
    (menuText: string) => {
      // console.log(menuText);
      if (menuText === sortType) return;
      setSortType(menuText);
      resetArtworks();
    },
    [sortType, resetArtworks] // useCallback 문제였음...
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

  // 이미지 로딩
  // const handleLoading = useCallback((Loading) => {
  //   setLoadingImage(Loading);
  // }, []);
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
    resetArtworks();
  };

  // useEffect(() => {
  //   if (router.isReady && router.query.board) {
  //     handleViewTypeSelect(router.query.board);
  //   }
  // }, [router, handleViewTypeSelect]);

  // const getArtistInfo = useCallback(async () => {
  //   try {
  //     const response = await axios
  //       .get(
  //         `${process.env.NEXT_PUBLIC_SERVER_URL}/author_name2info?name=${nickname}`
  //       )
  //       .then((res) => res.data);
  //     setProfile(response);
  //     console.log(response);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     // 404 페이지로 이동
  //     router.push('/404');
  //   }
  // }, [nickname]);

  const getArtistArtworks = useCallback(async () => {
    if (isLastPage) return;
    if (loadingData) return;

    setLoadingData(true);

    try {
      const { list, lastPage } = await getArtistInfo({
        nickname,
        sortType,
        page,
        field: sortCriteria.field,
      });
      if (lastPage === true) {
        setIsLastPage(true);
      }
      if (page === 1) setArtworks([...list]);
      else setArtworks((prev) => [...prev, ...list]);
    } catch (error) {
      if (!isAxiosError(error)) return;
      // 500에러 예외처리
      if (error.response?.status === 500) {
        toast({
          title:
            '현재 작가 프로필 쪽 서버가 점검중 입니다. 잠시 후 다시 시도해주세요.',
          description: '500 error',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      // 504 에러 예외처리, 504 에러는 서버가 불안정할 때 발생
      else if (error.response?.status === 504) {
        toast({
          title:
            '현재 작가 프로필 쪽 서버가 불안정합니다. 잠시 후 다시 시도해주세요.',
          description: '504 error',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      console.error('Error fetching more data:', error);
      setIsLastPage(true);
    } finally {
      setLoadingData(false); // Set loading state to false regardless of success or failure
    }
  }, [sortType, page, nickname, sortCriteria.field]);

  // useEffect(() => {
  //   // router.push(`/artists/${nickname}?view=${activeView}&sort=${sortType}`);
  // }, [activeView, sortType]);

  useEffect(() => {
    resetArtworks();
    getArtistArtworks();
  }, [sortCriteria, sortCriteria.field]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    getArtistArtworks();
  }, [sortType, page]);

  // 무한 스크롤
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    // if (inView) console.log('inView: ', inView);
    if (inView && !isLastPage && !loadingData) {
      // !loadingData: 작가페이지 카운트 버그 수정
      // throttledGetArtistArtworks(); // 1초 동안 한 번만 요청을 보냅니다.
      setPage((prevState) => prevState + 1);
    }
  }, [inView, isLastPage]);

  // 초기 작가 artworks 렌더링
  // useEffect(() => {
  //   if (nickname) {
  //     console.log('useEffect when nickname is changed', nickname);
  //     getArtistArtworks();
  //   }
  // }, [nickname]);

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
            {!artworks && (
              <Box
                w="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <HashLoader color="#01BFA2" />
              </Box>
            )}
            {artworks && (
              <>
                {artworks?.length !== 0 && (
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
                    {/* {activeView === 'listView' && <ListView artworks={artworks} /> */}
                    {/* Observer를 위한 div */}
                    {<Box ref={ref} w="100%" h="5rem"></Box>}
                  </Box>
                )}
              </>
            )}
            {loadingData && (
              <Box display="flex" justifyContent="center" alignItems="center">
                <HashLoader color="#01BFA2" />
              </Box>
            )}
            {/* Observer를 위한 div */}
            {<Box ref={ref} w="100%" h="5rem"></Box>}
            {!loadingData && <LoadButton loadData={loadData} />}
          </Box>
        )}
      </>
    </Box>
  );
}
