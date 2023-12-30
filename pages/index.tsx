import {
  Box,
  Flex,
  Heading,
  Skeleton,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import BannerSlider from '@/components/banner/BannerSlider';
import EventFanarts from '@/components/event/EventFanarts';
import EventModal from '@/components/event/EventModal';
import MySnowfall from '@/components/event/MySnowfall';
import { Footer } from '@/components/layout/Footer';
import Loading from '@/components/common/Loading';
import MoreButtons from '@/components/common/MoreButtons';
import Preview from '@/components/common/Preview';
import SearchResult from '@/components/common/SearchResult';
import UpdateBoard from '@/components/common/UpdateBoard';
import UpdateLogBoard from '@/components/common/UpdateLogBoard';
import UploadImages from '@/components/common/UploadImages';
import TopTitle from '@/components/TopTitle';
import { useResponsive } from '@/hook/useResponsive';
import { darkMode, lightMode } from '@/styles/theme';

interface HomeProps {
  last_update_info: any;
}

const targetCount = 50000; // 이벤트 타겟 카운트
const DynamicUploadImages = dynamic(
  () => import('@/components/common/UploadImages'),
  {
    ssr: false, // 이 옵션은 서버 사이드 렌더링을 비활성화합니다.
    loading: () => <p></p>,
  }
);

export default function Home() {
  // { last_update_info }: HomeProps
  const isMobile = useResponsive();

  const { ref, inView } = useInView({
    // infinite scroll을 위한 옵저버
    threshold: 0,
    rootMargin: '0px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const toast = useToast();
  const targetRef = useRef(null);
  const { onToggle } = useDisclosure();

  const [lastUpdateInfo, setLastUpdateInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [uploadedfiles, setUploadedFiles] = useState([]); // 파일 업로드
  const [data, setData] = useState(null); // fetch를 통해 받아온 데이터를 저장할 상태
  const [hash, setHash] = useState(null); // fetch를 통해 받아온 hash데이터를 저장할 상태
  const [ids, setIds] = useState([]); // 게시글 여러 개
  const [hasSearchResult, setHasSearchResult] = useState(false); // 재검색 방지
  const [isSearchingData, setIsSearchingData] = useState(false);
  const [isSearchingAuthor, setIsSearchingAuthor] = useState(false);
  const [author, setAuthor] = useState(null);
  const [author2, setAuthor2] = useState(null);
  const [searchTime, setSearchTime] = useState(0);

  // Theme
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const bgColor2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const color = useColorModeValue(lightMode.color, darkMode.color);

  // event
  const [congrat, setCongrat] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // 이미지 업로드, 해시값 받기
  const getDataFromChild = (childData) => {
    setUploadedFiles(childData);
  };
  const getHashFromChild = (childHashData) => {
    setHash(childHashData);
    console.log(hash);
  };

  useEffect(() => {
    const fetchLastUpdateInfo = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          'https://re-find.reruru.com/last_update_info'
        );
        setLastUpdateInfo(response.data);
      } catch (error) {
        console.log('Error fetching last update info:', error);
        // 오류 처리 로직
      }
      // 1초 후 로딩 종료
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchLastUpdateInfo();
  }, []);

  useEffect(() => {
    if (hash) {
      // console.log(hash);
      fetchOriginalUrl();
    }
  }, [hash]);

  // 이미지 검색하기
  const fetchOriginalUrl = async () => {
    try {
      setIsSearchingData(true); // 검색중
      const body = new FormData();
      body.append('file', uploadedfiles[0]);

      if (!hasSearchResult) {
        // 재검색 방지
        const startTime = new Date().getTime(); // 시작시간 기록
        const response = await axios.get(
          `https://re-find.reruru.com/receive?dhash=${hash[0]}`
        );
        // const response = await axios.post(
        //   'https://re-find.reruru.com/receive',
        //   body
        // );
        const endTime = new Date().getTime(); // 종료시간 기록
        console.log(`Image search time: ${endTime - startTime}ms`); // 차이값 출력
        const diffTime = endTime - startTime; // ms
        setSearchTime(diffTime); // 차이값 저장

        console.log(response.data); // >>>테스트용

        setAuthor2(response.data.author);
        setData(response.data);
        setIds(response.data.ids.slice(0, 15)); // 검색결과 10~15개 제한
        // fetchAuthorProfile(response.data.id[0]); // 첫번째 게시글의 작가 프로필 가져오기
      }
      setIsSearchingData(false); //  검색 완료
      setHasSearchResult(true); // 재검색을 방지
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log('Server Error: ', error.response.status);
        toast({
          title: `현재 서버와 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.`,
          status: `error`,
          isClosable: true,
        });
      } else if (error.code === 'ERR_NETWORK') {
        console.log('Network Error: ', error.code);
        toast({
          title: `${error.code}`,
          status: `error`,
          isClosable: true,
        });
      } else {
        console.log(error);
      }
      setData(null);
      setIsSearchingData(false); //  검색 완료
      setHasSearchResult(true); // 재검색을 방지
    }
  };

  // 결과 안내 메시지
  useEffect(() => {
    if (uploadedfiles.length > 0) {
      toast({
        title:
          data?.ids?.length === 0
            ? 'Search Failed'
            : `Searching Time: ${searchTime / 1000}s`,
        description:
          data?.ids[0]?.is_deleted === true ? '아! 삭제된 게시글입니다.' : '',
        status: `${
          data?.ids?.length === 0 || data?.ids[0]?.is_deleted === true
            ? 'error'
            : 'success'
        }`,
        isClosable: true,
      });
    }
  }, [data, searchTime]);

  const handleClick = () => {
    const headerHeight = 108;
    const targetElement = targetRef.current;
    const topPosition = targetElement.offsetTop - headerHeight;

    window.scrollTo({
      top: topPosition,
      behavior: 'smooth', // 부드럽게 스크롤하기 위해 'smooth' 옵션 사용
    });
  };

  // 4만 이벤트
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    if (data?.total_counter === targetCount.toString()) {
      setCongrat(true); // targetCount 번째 검색 시 축하메시지
      console.log('축하합니다!');
    }
  }, [data]);

  // files 을 [] 로 초기화
  const resetFiles = () => {
    setUploadedFiles([]);
    setData(null);
    setAuthor(null);
    setHasSearchResult(false);
    handleClick();
    onToggle();
  };

  return (
    <Box
      className="home_body"
      display="flex"
      justifyContent="center"
      alignItems="start"
      flexDirection="row"
      width="100%"
      maxW="1208px"
      flexWrap="wrap"
      gap="1.5rem"
      margin="1rem auto"
      ref={targetRef}
      backgroundColor={bgColor}
    >
      <MySnowfall />
      {congrat && <EventModal targetCount={targetCount} />}
      <Box
        w="100%"
        minH="100vh"
        maxW="700px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <BannerSlider />
        <TopTitle data={data} resetFiles={resetFiles} />
        {/* 업로드 전 */}
        {uploadedfiles.length === 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            w="100%"
          >
            <DynamicUploadImages
              getDataFromChild={getDataFromChild}
              getHashFromChild={getHashFromChild}
            />
            {/* <UploadImages
            getDataFromChild={getDataFromChild}
            getHashFromChild={getHashFromChild}
          /> */}
            <Skeleton isLoaded={!isLoading}>
              <UpdateBoard last_update_info={lastUpdateInfo} />
            </Skeleton>
          </Box>
        )}
        {/* 업로드 후 */}
        {uploadedfiles.length !== 0 && hash !== null && (
          <Box
            background={bgColor2}
            borderRadius="1rem"
            w="100%"
            className="result-area"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            m="1rem 0 10rem 0"
            p="1rem"
          >
            <Preview files={uploadedfiles} />
            {isSearchingData && <Loading />}
            {!isSearchingData && (
              <SearchResult
                searchTime={searchTime}
                data={data}
                ids={ids}
                isSearchingAuthor={isSearchingAuthor}
                author={author2}
                resetFiles={resetFiles}
              />
            )}
          </Box>
        )}
      </Box>
      <Box
        w="100%"
        maxW="400px"
        // ml="1.5rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {!isMobile && (
          <Box background={bgColor2} borderRadius="1rem" p="1rem 0">
            <Flex
              pl="1rem"
              w="100%"
              maxW="400px"
              flexDir="row"
              justifyContent="space-between"
              alignItems="center"
              cursor="pointer"
            >
              <Heading size="md">좀 더!</Heading>
              {/* <Text fontSize="md">더보기</Text> */}
              <Box
                h="2rem"
                w="2rem"
                borderRadius="50%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                // border="1px solid #828282"
              >
                {/* <IoIosArrowForward size="1rem" /> */}
              </Box>
            </Flex>
            <MoreButtons />
          </Box>
        )}
        <EventFanarts initialFanart={null} showCnt={2} width={'84%'} />
        <UpdateLogBoard width={'80%'} />
        <Footer />
        {/* {!inView ? <Footer /> : <Box h="398px"></Box>} */}
        {/* Observer를 위한 div */}
        {/* {<Box ref={ref} w="100%" h="3rem"></Box>} */}
        {/* {inView && (
          <Box position="fixed" bottom="-1rem" h="120vh" pt="10rem">
            <Footer />
          </Box>
        )} */}
      </Box>
      <Box
        w="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        // mt="1rem"
      >
        {/* <BannerSlider />
        <TopTitle data={data} resetFiles={resetFiles} /> */}
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    const timeout = 2000; // 3초
    const last_update_info = axios
      .get('https://re-find.reruru.com/last_update_info', { timeout })
      .then((res) => res.data);
    // const counter = axios
    //     .get("https://isd-fanart.reruru.com/counter")
    //     .then((res) => res.data);
    // const initialFanart = axios
    //   .get(`https://re-find.reruru.com/isegye_festival`)
    //   .then((res) => res.data);
    // const random_fanart = axios
    //     .get("https://rerurureruru.com:8443/rand", { timeout })
    //     .then((res) => res.data);

    const ret = await Promise.all([
      // wow - 병렬로 요청해서 페이지 로딩 줄임!
      last_update_info,
      // counter,
      // initialFanart,
      // random_fanart,
    ]);

    return {
      props: {
        last_update_info: ret[0],
        // counter: ret[0],
        // last_update_info: ret[1],
        // random_fanart: ret[1],
        // initialFanart: ret[1],
      },
    };
  } catch (error) {
    console.log('Error fetching data :', error);

    // Return an alternate value if the fetch fails
    return {
      props: {
        last_update_info: null,
        // counter: null,
        // initialFanart: null,
        // random_fanart: null,
      },
    };
  }
}
