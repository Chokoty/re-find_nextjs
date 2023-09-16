import React, { useState, useEffect, CSSProperties } from 'react';
import Head from 'next/head';
import axios from 'axios';

import { useRouter } from 'next/router';
import { Text, Box, Flex, Center, useColorModeValue } from '@chakra-ui/react';

import { lightMode, darkMode } from '@/styles/theme';
import AuthorProfileHead from '@/components/AuthorProfileHead';
import ViewSelectBar from '@/components/ViewSelectBar';
import MansonryView from '../../components/MansonryView';
import SimpleView from '../../components/SimpleView';
// import ListView from '../../components/ListView';
//
import HashLoader from 'react-spinners/HashLoader';

const Artist = ({ artist_name2info, artist_artworks }) => {
  const router = useRouter();
  const { nickname } = router.query;

  const [profile, setProfile] = useState(artist_name2info);
  const [artworks, setArtworks] = useState(artist_artworks);

  const [page, setPage] = useState(1); // Current page number
  const [hasMoreData, setHasMoreData] = useState(true); // Whether there is more data to load

  // 뷰 선택 메뉴
  const [activeView, setActiveView] = useState('masonryView'); // 초기 뷰 설정
  const [selectedMenu, setSelectedMenu] = useState('최신순'); // 초기 상태 설정
  const [isDeletedVisible, setIsDeletedVisible] = useState(false);

  // react-spinners
  let [loading, setLoading] = useState(false);
  let [loading2, setLoading2] = useState(false);
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);

  const handleMenuItemClick = (menuText: string) => {
    setSelectedMenu(menuText);
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const handleShowDeleted = () => {
    setIsDeletedVisible(!isDeletedVisible);
  };

  const handleLoading = (Loading) => {
    setLoading2(Loading);
  };

  useEffect(() => {
    console.log(page);
    const loadMoreData = async () => {
      while (hasMoreData && !loading) {
        setLoading(true); // Set loading state to true

        try {
          const nextPage = page + 1;
          // const response = await axios
          //   .get(
          //     `/api/getArtistArtworks?nickname=${nickname}&type=like&page=${nextPage}`
          //   )
          const response = await axios
            .get(
              `https://re-find.reruru.com/author_artworks?name=${nickname}&type=like&page=${nextPage}`
            )
            .then((res) => res.data);

          if (response.data.length === 0) {
            console.log(':::' + response.data);
            setHasMoreData(false); // No more data to load
          } else {
            setArtworks([...artworks, ...response.data]);
            setPage(nextPage);
          }
        } catch (error) {
          console.error('Error fetching more data:', error);
          setHasMoreData(false); // No more data to load
        } finally {
          setLoading(false); // Set loading state to false regardless of success or failure
        }
      }
    };
    loadMoreData();
  }, []);

  // Function to load more data when scrolling to the bottom
  // const loadMoreData = async () => {
  //   if (!hasMoreData || isLoading) return; // No more data to load or already loading
  //   setIsLoading(true); // Set loading state to true

  //   try {
  //     const nextPage = page + 1;
  //     const response = await axios.get(
  //       `https://re-find.reruru.com/author_artworks?name=${nickname}&type=like&page=${nextPage}`
  //     );

  //     if (response.data.length === 0) {
  //       setHasMoreData(false); // No more data to load
  //     } else {
  //       console.log('!!!' + page);
  //       console.log(response.data);
  //       setArtworks([...artworks, ...response.data]);
  //       setPage(nextPage);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching more data:', error);
  //     setHasMoreData(false); // No more data to load
  //   } finally {
  //     setIsLoading(false); // Set loading state to false regardless of success or failure
  //   }
  // };

  // useEffect(() => {
  //   window.dispatchEvent(new Event('resize'));
  // }, [isDeletedVisible]);

  // // useEffect(() => {
  // //   window.addEventListener('scroll', () => {
  // //     if (
  // //       window.innerHeight + window.scrollY >=
  // //       document.body.scrollHeight - 100
  // //     ) {
  // //       loadMoreData();
  // //     }
  // //   });

  //   return () => {
  //     // Remove the event listener when the component unmounts
  //     window.removeEventListener('scroll', loadMoreData);
  //   };
  // }, [page, hasMoreData, isLoading]);

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
        // w="100%"
        mb="2rem"
        // position="relative"
        // overflow="hidden" // 모바일 사파리에서 여백이 생기는 문제 해결
      >
        {/* <AuthorProfileHead nickname={nickname} profile={profile} /> */}
        <ViewSelectBar
          activeView={activeView}
          onViewChange={handleViewChange}
          selectedMenu={selectedMenu}
          onMenuItemClick={handleMenuItemClick}
          isDeletedVisible={isDeletedVisible}
          handleShowDeleted={handleShowDeleted}
        />

        {artworks?.length === 0 && (
          <Center>
            <Text>아직 업로드한 작품이 없네요!</Text>
          </Center>
        )}
        {loading2 && (
          <Box>
            <Box
              w="100vw"
              h="100vh"
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
        {artworks?.length !== 0 && (
          <Box w="100%">
            {activeView === 'masonryView' && (
              <MansonryView
                loading={loading2}
                artworks={artworks}
                isDeletedVisible={isDeletedVisible}
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
      </Box>
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
    const artist_artworks = await axios
      // .get(`/api/getArtistArtworks?nickname=${nickname}&type=like&page=1`)
      .get(
        `https://re-find.reruru.com/author_artworks?name=${nickname}&type=like&page=1`
      )
      .then((res) => res.data);

    // console.log(artist_name2info);
    // console.log(artist_artworks);
    // const ret = await Promise.all([artist_name2info]);
    const ret = await Promise.all([artist_name2info, artist_artworks]);

    return {
      props: {
        artist_name2info: ret[0],
        artist_artworks: ret[1],
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      notFound: true, // Next.js에서 제공하는 notFound 속성을 사용하여 페이지를 404로 표시
    };
  }
}
