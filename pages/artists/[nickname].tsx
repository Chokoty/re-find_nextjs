import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import axios from 'axios';

import { useRouter } from 'next/router';
import { Box, useColorModeValue, Button } from '@chakra-ui/react';

import { lightMode, darkMode } from '@/styles/theme';
import AuthorProfileHead from '@/components/AuthorProfileHead';
import ViewSelectBar from '@/components/ViewSelectBar';
import MasonryView from '../../components/MasonryView';
import SimpleView from '../../components/SimpleView';
// import ListView from '../../components/ListView';
//
import HashLoader from 'react-spinners/HashLoader';
import { useInView } from 'react-intersection-observer';

// const data = {
//   lastPage: false,
//   list: [
//     {
//       id: 11494030,
//       url: 'https://cafe.naver.com/steamindiegame/11494030',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDdfMjYx/MDAxNjg2MTM3MDQ3NDQz.g8Vd5jhI0m-JNvKOVn_vtIsvLidy_CLfppsjh-4zUjkg.paUbDJENzbCdDsvPw0Ib_kxb36plV6N0xCQVhm6GUGMg.PNG/%ED%80%B8%EC%B9%B4.png',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '비챤',
//       title: '그저 퀸카',
//       date: '2023.06.07. 20:24',
//       deleted: false,
//       view: 12707,
//       like: 1026,
//       comment: 177,
//     },
//     {
//       id: 7409821,
//       url: 'https://cafe.naver.com/steamindiegame/7409821',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMjA4MjdfMTcy/MDAxNjYxNjA2Njg3OTQy.QDbPBvw9FejP_ZKBggVOk4TS5BJGMFlHO_DKkkrjG0wg.QJz2vytQI5mf4VPUX4X5hVFcVR9YWGefCrHapvEQmLwg.PNG/1.png',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '비챤',
//       title: '고라니와 셀카',
//       date: '2022.08.27. 22:30',
//       deleted: false,
//       view: 6761,
//       like: 625,
//       comment: 126,
//     },
//     {
//       id: 10392553,
//       url: 'https://cafe.naver.com/steamindiegame/10392553',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzAzMjJfMTU0/MDAxNjc5NDg0NjAzMjEw.SzGT0MinTI76gz4q4Xwi82fMutj79W-Cj02AwOVghcMg.33NsieokKX-tD9TdgJdRhO7xdWaM3vQbVM1b_LFY064g.GIF/%EC%98%A4%EC%97%B4%EC%B1%A4_gif.gif',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '비챤',
//       title: '비챤 카트 합방 요약 gif',
//       date: '2023.03.22. 20:37',
//       deleted: false,
//       view: 7100,
//       like: 572,
//       comment: 125,
//     },
//     {
//       id: 8549317,
//       url: 'https://cafe.naver.com/steamindiegame/8549317',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMjExMTlfMTEy/MDAxNjY4ODI3NTY3NDAy.1NRm3NHtB0N7xxnqAXA5nw8WL875pdFv-RysDmey2VIg.DxhzAxBxb40zCLbK4f9OuQQxe9kSSG8iasJpfgcG6-sg.JPEG/%EC%9E%90%EA%B8%B01.jpg',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '릴파',
//       title: '자기~',
//       date: '2022.11.19. 12:14',
//       deleted: false,
//       view: 7330,
//       like: 566,
//       comment: 107,
//     },
//     {
//       id: 10703236,
//       url: 'https://cafe.naver.com/steamindiegame/10703236',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDlfMzkg/MDAxNjgxMDIzNjIxODMw.dH6zl2cj8rnTMSf716p3u-voITG8XDjd0qUwEdgtyGUg.LgkvTOw3PLExbsOlPH0CUZaxh29Sea-O1BHrVkQlnwsg.PNG/%EB%B4%87%EC%B9%98%EC%9D%B4%EB%84%A4_%ED%8E%B8%EC%A7%91.png',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '아이네',
//       title: '요즘 유행하는 그거',
//       date: '2023.04.09. 16:00',
//       deleted: false,
//       view: 1532,
//       like: 312,
//       comment: 74,
//     },
//     {
//       id: 11509478,
//       url: 'https://cafe.naver.com/steamindiegame/11509478',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzA2MDhfNzkg/MDAxNjg2MjMwMjU2MzQ5.wCuQZlOVxBBROX-PgusY7nfQVoPthrAd9lGY7l_a92Ig.fj-3Go7-QO-ZsqrE519ldIVKuRdsHhCADzEOOY3qBDkg.PNG/%ED%80%B8%EC%B9%B4_ver2.png',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '비챤',
//       title: '옛날 그림체로 퀸카',
//       date: '2023.06.08. 22:21',
//       deleted: false,
//       view: 1860,
//       like: 301,
//       comment: 70,
//     },
//     {
//       id: 12186234,
//       url: 'https://cafe.naver.com/steamindiegame/12186234',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MjVfMTQ4/MDAxNjkwMjg1OTUyMzU2.qVy3vVatPZqznRIkWsLLo4Iau6M1wukAsuuFyDBvY9Mg.wiXF7RQDoU979UCq4rDZJI_TGbPP5dS98yaynmQ_NWUg.PNG/%EB%8B%A8%EC%B2%B4_%EC%82%AC%EC%A7%84_%EC%A0%84%EC%B2%B4_%EC%88%98%EC%A0%95.png',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '릴파',
//       title: '[박취더락] 2주년 기념 단체사진',
//       date: '2023.07.25. 20:54',
//       deleted: false,
//       view: 1083,
//       like: 269,
//       comment: 48,
//     },
//     {
//       id: 12002834,
//       url: 'https://cafe.naver.com/steamindiegame/12002834',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzA3MTRfMTgg/MDAxNjg5MzA2NzMyMTg4.WupmRMiYLWxZfhFjuPXt09f8vm5mef5-IajNOPJdwmUg.agRF1ofGNuECAbV1g4za9l11jGPFOZUNnlivK435RWgg.PNG/%EB%A7%9B%EB%B3%B4%EA%B8%B0_%EC%8D%B8%EB%84%AC.png',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '비챤',
//       title: '에잇 짤하나 투척!',
//       date: '2023.07.14. 12:52',
//       deleted: false,
//       view: 898,
//       like: 268,
//       comment: 52,
//     },
//     {
//       id: 9368861,
//       url: 'https://cafe.naver.com/steamindiegame/9368861',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzAxMTZfMjQ2/MDAxNjczODM5MzkxNjU0.ja_UVmtydQWcLFnuNBDFOWwU8ncreN2FqcfJV3KuTXEg.Pu9tNyNsjRppSufWXVPQF7uaXqvSUN4CHd62BbWY9hMg.PNG/%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8_%ED%9D%B0%EB%B0%B0%EA%B2%BD.png',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '비챤',
//       title: '비챤넴 생일파티',
//       date: '2023.01.16. 15:11',
//       deleted: false,
//       view: 1932,
//       like: 266,
//       comment: 67,
//     },
//     {
//       id: 11131005,
//       url: 'https://cafe.naver.com/steamindiegame/11131005',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzA1MDlfMTUy/MDAxNjgzNjE3MjQ4ODQz.rr4pbbXFXAJij1If603Jo2SqUXLcRejdWlFHRrEnxTAg.iREhvf6fAaLAT_aAsnnltT9V7uemLWlynoGofseF5JEg.PNG/%EC%96%B8%EB%8B%88%EC%95%BC_%EA%B8%B0%EB%B3%B8.png',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '비챤',
//       title: '나라별 비챤 의상 모음 _ 나랑놀아 편',
//       date: '2023.05.09.16:31',
//       deleted: false,
//       view: 1318,
//       like: 241,
//       comment: 56,
//     },
//     {
//       id: 10816821,
//       url: 'https://cafe.naver.com/steamindiegame/10816821',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MTZfMTkg/MDAxNjgxNjQ2ODk5NjUz.MZkz9VQgmerEpK8mOsZly4BFfvbi7txN8MTQN6b5kUkg.f1Is-0nT88RfkzJz8pgXtXHxFT4Dk2UiaLQNJFqlBn0g.PNG/%EB%A9%9C%EB%A1%A036%EC%9C%84_%ED%98%B8%EC%A3%BC.png',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '비챤',
//       title: '멜론 36위 캥거루!',
//       date: '2023.04.17. 13:06',
//       deleted: false,
//       view: 1179,
//       like: 234,
//       comment: 50,
//     },
//     {
//       id: 10126471,
//       url: 'https://cafe.naver.com/steamindiegame/10126471',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzAzMDVfMzIg/MDAxNjc3OTU5NjIyOTky.Tn6IROgmSoteqs_EiLGAMwZJnrGBzivIvDvnAtP4cFEg.jarHLnOa8dOOLnh-VlwPCVpQN1TppqyW6__gzlu2N0og.PNG/%EB%B9%84%EC%B9%98%EB%B3%BC_%EC%A3%BC%EB%A5%B4%EB%A5%B4.png',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '주르르',
//       title: '비치볼 주르르',
//       date: '2023.03.05. 04:54',
//       deleted: false,
//       view: 1712,
//       like: 223,
//       comment: 49,
//     },
//     {
//       id: 10401342,
//       url: 'https://cafe.naver.com/steamindiegame/10401342',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzAzMjNfMTYy/MDAxNjc5NTU2NjY2MDgw.Yw1QVHzsbvE0tbMCLuqqN2_IkYgUQn_KM4hhfAceJ5og.0EkPMH_V6JCfjfnNRSDb6AFi9SUQxMq5AvuFSetU7Rwg.GIF/%ED%90%89%EC%8A%A4%EC%A6%88_gif.gif',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '2인 이상',
//       title: '퐉스즈 카트 요약 gif',
//       date: '2023.03.23. 16:32',
//       deleted: false,
//       view: 1296,
//       like: 219,
//       comment: 52,
//     },
//     {
//       id: 11255375,
//       url: 'https://cafe.naver.com/steamindiegame/11255375',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzA1MTlfODcg/MDAxNjg0NTAwNjI3NzQ2.OsKgeffr0UsGHgQ_dRv7DmFyveE0zXXrRPx515d28wQg.Xxio7at0zKw_R6F6_IfQ7TljOce4Dq1FiwxuC0KsEKsg.GIF/%EC%B1%A4%ED%88%AC%EB%B6%80_%EA%B5%AC%EB%8F%85%ED%95%B4%EC%A4%98.gif',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '비챤',
//       title: '에잇 귀여운 움짤 하나 투척',
//       date: '2023.05.19. 21:52',
//       deleted: false,
//       view: 1190,
//       like: 214,
//       comment: 45,
//     },
//     {
//       id: 11062331,
//       url: 'https://cafe.naver.com/steamindiegame/11062331',
//       img_url:
//         'https://cafeptthumb-phinf.pstatic.net/MjAyMzA1MDNfMTk5/MDAxNjgzMTIzNDc0MzYx.tax9ZiS86dmM_dRuQggAYeLEpGH9rEQ_05ve6GFhxF4g.BF5h1de14VHTA4RnL0BNm2nqG7JaNKf9cG--TOS3dV0g.PNG/%EB%A7%9B%EB%B3%B4%EA%B8%B0_%EC%8D%B8%EB%84%AC.png',
//       img_url_list: [],
//       board: '🎨 이세돌┃팬아트',
//       category: '릴파',
//       title: '애니메이션 중 한 컷',
//       date: '2023.05.04. 09:24',
//       deleted: false,
//       view: 1048,
//       like: 209,
//       comment: 34,
//     },
//   ],
// };

const Artist = ({
  artist_name2info,
  // artist_artworks_data
}) => {
  const router = useRouter();
  const { nickname } = router.query;

  const [profile, setProfile] = useState(artist_name2info); //useState(null);
  // const [artworks, setArtworks] = useState(data.list);
  const [artworks, setArtworks] = useState([]); // useState(artist_artworks_data?.list);

  // infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
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
  let [loadingData, setLoadingData] = useState(false);
  let [loadingImage, setLoadingImage] = useState(true);
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);

  // 정렬 선택하기
  const handleMenuItemClick = useCallback((menuText: string) => {
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
      console.log(response);
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
    console.log('artworks loading...');

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
      if (page === 1) setArtworks([...response.list]);
      else setArtworks([...artworks, ...response.list]);
    } catch (error) {
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
  }, [sortType, page]);

  useEffect(() => {
    // if (init) return;
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) console.log('inView: ', inView);
    if (inView && !isLastPage) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, isLastPage]);

  useEffect(() => {
    if (nickname) {
      console.log(nickname);
      // getArtistInfo();
      getArtistArtworks();
      // setInit(false); // 초기 렌더링 완료
    }
  }, [nickname]);

  return (
    <Box>
      <Head>
        <title>{`${profile?.author_nickname} - RE:FIND`}</title>
        {/* <title>{`${nickname} - RE:FIND`}</title> */}
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
      >
        <AuthorProfileHead nickname={nickname} profile={profile} />
        <ViewSelectBar
          // artworks={artworks}
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
                  <MasonryView
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
                <Box ref={ref} w="100%" h="2rem"></Box>
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
        artist_name2info: artist_name2info,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      notFound: true, // Next.js에서 제공하는 notFound 속성을 사용하여 페이지를 404로 표시
    };
  }
}
