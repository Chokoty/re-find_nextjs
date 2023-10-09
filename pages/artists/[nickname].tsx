import {
  Box,
  Center,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
// import { throttle } from 'lodash';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
// import ListView from '../../components/ListView';
import HashLoader from 'react-spinners/HashLoader';

import AuthorProfileHead from '@/components/AuthorProfileHead';
import MasonryView from '@/components/MasonryView';
import SimpleView from '@/components/SimpleView';
import ViewSelectBar from '@/components/ViewSelectBar';
import { darkMode, lightMode } from '@/styles/theme';

const data = {};

const profileTest = [
  '바게트빵 옴뇸뇸',
  '징버거',
  '라면조리기',
  '곶곶이',
  '어금니브레이커',
];

const Artist = ({
  artist_name2info,
  // artist_artworks_data
}) => {
  const router = useRouter();
  const { nickname } = router.query;
  let actualNickname = '';
  if (Array.isArray(nickname)) {
    [actualNickname] = nickname;
  } else {
    actualNickname = nickname;
  }

  const [profile, setProfile] = useState(artist_name2info); // useState(null);
  // const [artworks, setArtworks] = useState(data.list);
  const [artworks, setArtworks] = useState([]); // useState(artist_artworks_data?.list);

  // infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '400px 0px', // 상단에서 400px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });
  const [init, setInit] = useState(true);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false); // useState(artist_artworks_data?.lastPage);

  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonryView'); // 초기 뷰 설정
  const [sortType, setSortType] = useState('like'); // 초기 상태 설정
  const [isDeletedVisible, setIsDeletedVisible] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // react-spinners
  const [loadingData, setLoadingData] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);

  const toast = useToast();

  // console.log(artist_name2info);

  // 정렬 선택하기
  const handleMenuItemClick = useCallback((menuText: string) => {
    if (menuText === sortType) return;
    setSortType(menuText);
    // 다시 불러오기
    setPage(1);
    setIsLastPage(false);
    setArtworks([]);
  }, []);

  // 뷰 선택하기
  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  // 삭제된 게시글 보이기
  const handleShowDeleted = useCallback(() => {
    setIsDeletedVisible((prev) => !prev);
  }, []);

  // const throttledGetArtistArtworks = useCallback(
  //   throttle(getArtistArtworks, 1000), // 1초 동안 한 번만 요청을 보냅니다.
  //   [sortType, page, nickname]
  // );

  // 이미지 로딩
  const handleLoading = useCallback((Loading) => {
    setLoadingImage(Loading);
  }, []);

  const getArtistInfo = useCallback(async () => {
    try {
      const response = await axios
        // .get('/api/artistInfo', {
        //   params: {
        //     nickname: nickname,
        //   },
        // })
        .get(`https://re-find.reruru.com/author_name2info?name=${nickname}`)
        .then((res) => res.data);
      setProfile(response);
      // console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
      // setProfile(nickname);
      // 404 페이지로 이동
      router.push('/404');
    }
  }, [nickname]);

  const getArtistArtworks = useCallback(async () => {
    console.log('getArtistArtworks');
    if (isLastPage) return;
    if (loadingData) return;

    setLoadingData(true);
    // console.log('artworks loading...');

    try {
      const response = await axios
        .get(
          `https://re-find.reruru.com/author_artworks?name=${nickname}&type=${sortType}&page=${page}`
        )
        .then((res) => res.data);

      // console.log(response.lastPage);
      // console.log(response.list);
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
      console.error('Error fetching more data:', error);
      setIsLastPage(true);
    } finally {
      setLoadingData(false); // Set loading state to false regardless of success or failure
    }
  }, [sortType, page, nickname]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    console.log('page: ', page);
    getArtistArtworks();
    // 2초뒤 1번 더 호출
    // setTimeout(() => {
    //   // setPage((prevState) => prevState + 1);
    //   getArtistArtworks();
    // }, 1500);
  }, [sortType, page]);

  // 무한 스크롤
  useEffect(() => {
    // if (init) return;
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) console.log('inView: ', inView);
    if (inView && !isLastPage) {
      // throttledGetArtistArtworks(); // 1초 동안 한 번만 요청을 보냅니다.
      setPage((prevState) => prevState + 1);
    }
  }, [inView, isLastPage, throttledGetArtistArtworks]);

  useEffect(() => {
    if (nickname) {
      console.log(nickname);
      // getArtistInfo();
      getArtistArtworks();
      // setInit(false); // 초기 렌더링 완료
    }
    // temp
    if (!profileTest.includes(actualNickname)) {
      // nickname이 profileTest 배열에 없으면 404 페이지로 리디렉션
      router.push('/404');
    }
  }, [nickname]);

  return (
    <Box>
      <Head>
        <title>{`${profile?.author_nickname} - RE:FIND`}</title>
        <meta
          property="og:title"
          content={`${profile?.author_nickname}- Profile | RE:FIND `}
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
      {/* {profileTest.includes(actualNickname) && (
      )} */}
      <>
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
            <AuthorProfileHead nickname={actualNickname} profile={profile} />
            <ViewSelectBar
              activeView={activeView}
              onViewChange={handleViewChange}
              selectedMenu={sortType}
              onMenuItemClick={handleMenuItemClick}
              isDeletedVisible={isDeletedVisible}
              handleShowDeleted={handleShowDeleted}
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
                {/* {loadingImage && (
                <Box position="relative">
                  <Box
                    w="100vw"
                    h="100vh"
                    // position="absolute"
                    position="fixed"
                    display="flex"
                    top={0}
                    left={0}
                    justifyContent="center"
                    alignItems="center"
                    zIndex={160}
                  >
                    <HashLoader color="#01BFA2" />
                  </Box>
                  <Box
                    w="100%"
                    h="100%"
                    position="absolute"
                    top={0}
                    right={0}
                    backgroundColor={bgColor}
                    zIndex={150} // 다른 컴포넌트 위에 표시되도록 z-index 설정
                  ></Box>
                </Box>
              )} */}
                {/* {artworks?.length === 0 && (
  
              )} */}
                {artworks?.length !== 0 && (
                  <Box
                    w="100%"
                    overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
                  >
                    {activeView === 'masonryView' && (
                      <MasonryView
                        nickname={nickname}
                        artworks={artworks}
                        isDeletedVisible={isDeletedVisible}
                        // loadingImage={loadingImage}
                        handleLoading={handleLoading}
                      />
                    )}
                    {activeView === 'gridView' && (
                      <SimpleView
                        artworks={artworks}
                        isDeletedVisible={isDeletedVisible}
                        handleLoading={handleLoading}
                      />
                    )}
                    {/* {activeView === 'listView' && <ListView artworks={artworks} /> */}
                    {/* Observer를 위한 div */}
                    {<Box ref={ref} w="100%" h="2rem"></Box>}
                  </Box>
                )}
              </>
            )}
            {loadingData && (
              <Box display="flex" justifyContent="center" alignItems="center">
                <HashLoader color="#01BFA2" />
              </Box>
            )}
          </Box>
        )}
      </>
    </Box>
  );
};

export default Artist;

export async function getServerSideProps(context) {
  const { nickname } = context.query;

  try {
    const artist_name2info = await axios
      .get(`https://re-find.reruru.com/author_name2info?name=${nickname}`)
      .then((res) => res.data);

    return {
      props: {
        artist_name2info,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      notFound: true, // Next.js에서 제공하는 notFound 속성을 사용하여 페이지를 404로 표시
    };
  }
}
