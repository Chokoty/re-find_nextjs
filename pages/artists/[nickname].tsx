import { Box, Center, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HashLoader from 'react-spinners/HashLoader';

import AuthorProfileHead from '@/components/artist/AuthorProfileHead';
import LoadButton from '@/components/common/LoadButton';
import ViewSelectBar from '@/components/common/ViewSelectBar';
import { ArtistHeader } from '@/components/layout/ArtistHeader';
import MasonryView from '@/components/views/MasonryView';
import SimpleView from '@/components/views/SimpleView';
// import useUrlQuery from '@/hooks/useUrlQuery';

const Artist = ({ artist_name2info, initialSort, initialBoard }) => {
  const router = useRouter();
  // const { sort, board } = router.query;
  const toast = useToast();

  const { ref, inView } = useInView({
    // infinite scroll을 위한 옵저버
    threshold: 0,
    rootMargin: '600px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const nickname = router.query.nickname as string;
  let actualNickname = '';
  if (Array.isArray(nickname)) [actualNickname] = nickname;
  else actualNickname = nickname;

  // console.log(artist_name2info);
  const [profile, setProfile] = useState(artist_name2info);
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  // const [selectedBoard, setSelectedBoard] = useState(null);
  const [sortCriteria, setSortCriteria] = useState({
    field: '',
    order: 'descending', // 'ascending' 또는 'descending'
  });

  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonry'); // 초기 뷰 설정
  // const [sortType, setSortType] = useState('latest'); // 초기 상태 설정
  const [board, setBoard] = useState(initialBoard);
  const [sortType, setSortType] = useState(initialSort);
  // const [sortType, setSortType] = useState('latest');
  const [isDeletedVisible, setIsDeletedVisible] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // react-spinners
  const [loadingData, setLoadingData] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  // sortCriteria, sortType 업데이트 시 URL 업데이트

  // const urlQuery = useUrlQuery(sortCriteria, setSortCriteria, setBoard);

  useEffect(() => {
    const currentPath = router.pathname;
    // const currentQuery = {
    //   ...router.query,
    //   sort: sortType,
    //   // board 파라미터는 sortCriteria.field가 비어있지 않을 때만 포함
    //   // ...(sortCriteria.field && { board: sortCriteria.field }),
    //   ...(boards !== '' && { board: boards }),
    // };
    // eslint-disable-next-line prefer-const
    let currentQuery = {
      ...router.query,
      sort: sortType,
      board,
    };
    if (board !== '') {
      // board 값이 있는 경우에만 추가
      currentQuery.board = board;
    } else {
      // board 값이 없는 경우 삭제
      delete currentQuery.board;
    }
    router.replace(
      {
        pathname: currentPath,
        query: currentQuery,
      },
      undefined,
      { shallow: true }
    );
  }, [sortType, board, router]);

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
  const handleLoading = useCallback((Loading) => {
    setLoadingImage(Loading);
  }, []);

  const handleViewTypeSelect = (value) => {
    // 같은거 누르면 해제,토글
    // console.log(value);
    if (value === sortCriteria.field) {
      setBoard('');
      setSortCriteria((prevState) => {
        return { ...prevState, field: '', order: 'descending' };
      });
    } else {
      setBoard(value.replace('_cnt', ''));
      setSortCriteria((prevState) => {
        return { ...prevState, field: value, order: 'descending' };
      });
    }
    resetArtworks();
  };

  const getArtistInfo = useCallback(async () => {
    try {
      const response = await axios
        .get(`https://re-find.reruru.com/author_name2info?name=${nickname}`)
        .then((res) => res.data);
      setProfile(response);
      // console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
      // 404 페이지로 이동
      router.push('/404');
    }
  }, [nickname]);

  const getArtistArtworks = useCallback(async () => {
    // console.log('getArtistArtworks');
    if (isLastPage) return;
    if (loadingData) return;

    setLoadingData(true);
    // console.log('artworks loading...');

    try {
      let url = `https://re-find.reruru.com/author_artworks?name=${nickname}&type=${sortType}&page=${page}`;
      if (sortCriteria.field !== '') {
        url += `&board=${sortCriteria.field.replace('_cnt', '')}`;
      }
      // console.log(url); //!

      const response = await axios.get(url).then((res) => res.data);
      // console.log(response);
      if (response.lastPage === true) {
        setIsLastPage(true);
      }
      if (page === 1) setArtworks([...response.list]);
      else setArtworks([...artworks, ...response.list]);
    } catch (error) {
      // 500에러 예외처리
      console.log(error.response);
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
    // console.log('page: ', page);
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

  useEffect(() => {
    if (nickname) {
      // console.log(nickname);
      getArtistArtworks();
    }
  }, [nickname]);

  return (
    <Box>
      <Head>
        <title>{`${profile?.author_nickname} - RE:FIND`}</title>
        <meta
          property="og:title"
          content={`작가님 - Profile | RE:FIND `}
          // content={`${profile?.author_nickname}- Profile | RE:FIND `}
        />
        <meta
          property="og:description"
          content="리파인드 - 왁타버스 이세계아이돌 팬아트 출처 찾기"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={profile?.author_prof_url} />
        <meta
          property="og:url"
          content={`https://re-find.xyz/artists/${profile?.author_nickname}`}
        />
      </Head>
      <>
        <ArtistHeader title="" />
        {profile?.author_nickname === '' && profile.num_artworks === 0 && (
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
        {profile?.author_nickname !== '' && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            margin="0 auto"
            mb="2rem"
          >
            <AuthorProfileHead
              nickname={actualNickname}
              profile={profile}
              sortCriteria={sortCriteria}
              handleViewTypeSelect={handleViewTypeSelect}
            />
            <ViewSelectBar
              activeView={activeView}
              onViewChange={handleViewChange}
              selectedMenu={sortType}
              onMenuItemClick={handleMenuItemClick}
              isDeletedVisible={isDeletedVisible}
              handleShowDeleted={handleShowDeleted}
              topOffset={0}
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
                        handleLoading={handleLoading}
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
};

export default Artist;

export async function getServerSideProps(context) {
  // const { nickname } = context.query;
  const { nickname, sort = '', board = '' } = context.query;

  try {
    const artist_name2info = await axios
      .get(`https://re-find.reruru.com/author_name2info?name=${nickname}`)
      .then((res) => res.data);

    return {
      props: {
        artist_name2info,
        initialSort: sort,
        initialBoard: board,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      notFound: true, // Next.js에서 제공하는 notFound 속성을 사용하여 페이지를 404로 표시
    };
  }
}
