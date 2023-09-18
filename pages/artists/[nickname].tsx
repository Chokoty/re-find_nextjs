import React, { useState, useEffect, useCallback, use } from 'react';
import Head from 'next/head';
import axios from 'axios';

import { useRouter } from 'next/router';
import {
  Text,
  Box,
  Flex,
  Center,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';

import { lightMode, darkMode } from '@/styles/theme';
import AuthorProfileHead from '@/components/AuthorProfileHead';
import ViewSelectBar from '@/components/ViewSelectBar';
import MansonryView from '../../components/MansonryView';
import SimpleView from '../../components/SimpleView';
// import ListView from '../../components/ListView';
//
import HashLoader from 'react-spinners/HashLoader';
import { useInView } from 'react-intersection-observer';

const Artist = (
  {
    // artist_name2info,
    // artist_artworks_data
  }
) => {
  const router = useRouter();
  const { nickname } = router.query;

  const [profile, setProfile] = useState(null);
  // const [profile, setProfile] = useState(artist_name2info);
  const [artworks, setArtworks] = useState(null);
  // const [artworks, setArtworks] = useState(artist_artworks_data?.list);

  // infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [page, setPage] = useState(1);
  // const [isLastPage, setIsLastPage] = useState(artist_artworks_data?.lastPage);
  const [isLastPage, setIsLastPage] = useState(false);

  // 뷰 선택 메뉴
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [activeView, setActiveView] = useState('masonryView'); // 초기 뷰 설정
  const [sortType, setSortType] = useState('like'); // 초기 상태 설정
  const [isDeletedVisible, setIsDeletedVisible] = useState(false);

  // react-spinners
  let [loadingData, setLoadingData] = useState(false);
  let [loadingImage, setLoadingImage] = useState(true);
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);

  // 정렬 선택하기
  const handleMenuItemClick = useCallback((menuText: string) => {
    setSortType(menuText);
    // 다시 불러오기
  }, []);

  // 뷰 선택하기
  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  // 삭제된 게시글 보이기
  const handleShowDeleted = useCallback(() => {
    setIsDeletedVisible((prev) => !prev);
  }, []);

  // 이미지 로딩
  const handleLoading = useCallback((Loading) => {
    setLoadingImage(Loading);
  }, []);

  const artist_name2info = async () => {
    try {
      const response = await axios
        .get(`/api/artistInfo?nickname=${nickname}`)
        // .get(`https://re-find.reruru.com/author_name2info?name=${nickname}`)
        .then((res) => res.data);
      setProfile(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const loadMoreData = async () => {
    console.log('loadMoreData');
    // if (isLastPage) return;

    // 2초 뒤 setLoadingData(false);
    getItems();
    // setTimeout(() => {
    //   setLoadingData(false);
    // }, 2000);
    setPage((prevState) => prevState + 1);
  };

  // const getItems = useCallback(async () => {
  const getItems = async () => {
    console.log('getItems');
    // if (isLastPage) return;

    if (loadingData) return;

    setLoadingData(true);
    console.log('loading...');

    try {
      const response = await axios
        .get(
          `https://re-find.reruru.com/author_artworks?name=${nickname}&type=${sortType}&page=${page}`
        )
        .then((res) => res.data);

      console.log(response.lastPage);
      console.log(response.list);
      if (response.lastPage === true) {
        setIsLastPage(true);
      }
      if (page === 0) setArtworks([...response.list]);
      else setArtworks([...artworks, ...response.list]);
    } catch (error) {
      console.error('Error fetching more data:', error);
      setIsLastPage(true);
      // return true; // Assume it's the last page if there's an error
    } finally {
      setLoadingData(false); // Set loading state to false regardless of success or failure
    }
  };
  // }, [page, sortType]);

  // `getItems` 가 바뀔 때 마다 함수 실행
  // useEffect(() => {
  //   getItems();
  // }, [getItems]);

  // useEffect(() => {
  //   // sortType이 바뀔 때마다 artworks를 다시 불러옴
  //   if (isInitialRender) {
  //     setIsInitialRender(false);
  //     return;
  //   }

  //   setPage(0);
  //   setIsLastPage(false);
  //   getItems();
  // }, [sortType, isInitialRender]);

  // useEffect(() => {
  //   // page가 바뀔 때마다 artworks를 다시 불러옴
  //   getItems();
  // }, [page]);

  // useEffect(() => {
  //   // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
  //   if (inView) console.log('inView: ', inView);
  //   console.log('isLastPage: ', isLastPage);
  //   if (inView && !isLastPage) {
  //     setPage((prevState) => prevState + 1);
  //   }
  // }, [inView, isLastPage]);
  useEffect(() => {
    console.log(nickname);

    if (nickname) {
      artist_name2info();
    }
  }, [nickname]);

  useEffect(() => {
    // getItems();
    console.log(nickname);
    // artist_name2info();
    // console.log(artworks);
  }, []);

  return (
    <Box>
      <Head>
        <title>{profile?.author_nickname} - RE:FIND</title>
        <meta
          property="og:title"
          content={profile?.author_nickname + '- Profile | RE:FIND '}
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        mb="2rem"
        // position="relative"
        // overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
      >
        <Button onClick={loadMoreData}>{page}</Button>
        <AuthorProfileHead nickname={nickname} profile={profile} />
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
            {loadingImage && (
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
            )}
            {/* {artworks?.length === 0 && (
              <Center>
                <Text>아직 업로드한 작품이 없네요!</Text>
              </Center>
            )} */}
            {artworks?.length !== 0 && (
              <Box
                w="100%"
                overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
              >
                {activeView === 'masonryView' && (
                  <MansonryView
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
              </Box>
            )}
            {/* Observer를 위한 div */}
            <Box ref={ref}>
              {loadingData && (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <HashLoader color="#01BFA2" />
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Artist;

// export async function getServerSideProps(context) {
//   const { nickname } = context.query;

//   try {
//     const artist_name2info = await axios
//       .get(`https://re-find.reruru.com/author_name2info?name=${nickname}`)
//       .then((res) => res.data);
//     // const artist_artworks_data = await axios
//     //   // .get(`/api/getArtistArtworks?nickname=${nickname}&type=like&page=1`)
//     //   .get(
//     //     `https://re-find.reruru.com/author_artworks?name=${nickname}&type=like&page=1`
//     //   )
//     //   .then((res) => res.data);
//     // console.log(artist_name2info);
//     // console.log(artist_artworks);
//     const ret = await Promise.all([
//       artist_name2info,

//       // artist_artworks_data
//     ]);

//     return {
//       props: {
//         artist_name2info: ret[0],
//         // artist_artworks_data: ret[1],
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);

//     return {
//       notFound: true, // Next.js에서 제공하는 notFound 속성을 사용하여 페이지를 404로 표시
//     };
//   }
// }
