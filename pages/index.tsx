import {
  Flex,
  Heading,
  Text,
  // useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import React, { use, useEffect, useRef, useState } from 'react';

import Counter from '@/components/Counter';
import EventFanarts from '@/components/events/EventFanarts';
import EventModal from '@/components/events/EventModal';
// import MelonVoteModal from '@/components/events/MelonVoteModal';
import Loading from '@/components/Loading';
import Preview from '@/components/Preview';
import RandomFanart from '@/components/RandomFanart';
import SearchResult from '@/components/SearchResult';
import SubTitle from '@/components/SubTitle';
import Title from '@/components/Title';
import UpdateBoard from '@/components/UpdateBoard';
import UpdateLog from '@/components/UpdateLog';
import UploadImages from '@/components/UploadImages';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

interface HomeProps {
  last_update_info: any;
}

const targetCount = 38650; // 이벤트 타겟 카운트
const DynamicUploadImages = dynamic(() => import('@/components/UploadImages'), {
  ssr: false, // 이 옵션은 서버 사이드 렌더링을 비활성화합니다.
  loading: () => <p></p>,
});

export default function Home({ last_update_info }: HomeProps) {
  const setIsOpen = useStore((state) => state.setIsOpen);
  const targetRef = useRef(null);
  const toast = useToast();
  const { onToggle } = useDisclosure();

  const [uploadedfiles, setUploadedFiles] = useState([]); // 파일 업로드를 위한 상태
  const [data, setData] = useState(null); // fetch를 통해 받아온 데이터를 저장할 상태
  const [hash, setHash] = useState(null); // fetch를 통해 받아온 hash데이터를 저장할 상태

  const [ids, setIds] = useState([]); // 게시글 여러 개
  const [hasSearchResult, setHasSearchResult] = useState(false); // 재검색 방지
  const [isSearchingData, setIsSearchingData] = useState(false);
  const [isSearchingAuthor, setIsSearchingAuthor] = useState(false);

  const [author, setAuthor] = useState(null);
  const [author2, setAuthor2] = useState(null);
  const [searchTime, setSearchTime] = useState(0);

  // event
  const [congrat, setCongrat] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  // Theme
  // const { colorMode, toggleColorMode } = useColorMode();
  // const isDark = colorMode === 'dark';
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  // const badge = useColorModeValue(lightMode.badge, darkMode.badge);
  // const highlightColor = useColorModeValue(
  //   lightMode.highlight,
  //   darkMode.highlight
  // );

  const handleClick = () => {
    const headerHeight = 108;
    const targetElement = targetRef.current;
    const topPosition = targetElement.offsetTop - headerHeight;

    window.scrollTo({
      top: topPosition,
      behavior: 'smooth', // 부드럽게 스크롤하기 위해 'smooth' 옵션 사용
    });
  };

  // 페이지 랜더링되면 카운터 가져오기, 서랍 닫기
  useEffect(() => {
    console.log(last_update_info);
    setIsOpen(false);
    // fetchCounter();
    // testProfile();
  }, []);

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

        // if (response.data.total_counter === targetCount) {
        //   setCongrat(true); // 20000번째 검색시 축하메시지
        //   console.log('축하합니다!');
        // }
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

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    if (
      data?.total_counter === targetCount ||
      data?.total_counter === targetCount + 1
    ) {
      setCongrat(true); // targetCount 번째 검색 시 축하메시지
      console.log('축하합니다!');
    }
  }, [data]);

  // 자식 컴포넌트로부터 데이터 받기
  const getDataFromChild = (childData) => {
    setUploadedFiles(childData);
  };
  const getHashFromChild = (childHashData) => {
    setHash(childHashData);
    console.log(hash);
  };

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
    <div
      className="home_body"
      style={{ backgroundColor: bgColor, color }}
      ref={targetRef}
    >
      {/* 상단 타이틀 */}
      <Counter data={data} />
      <Title onTitleClick={resetFiles} />
      <SubTitle />

      <br />

      {/* 이벤트 */}
      {/* {<EventModal targetCount={targetCount} />} */}
      {congrat && <EventModal targetCount={targetCount} />}
      {/* <MelonVoteModal /> */}

      {/* 업로드 전 */}
      {uploadedfiles.length === 0 && (
        <>
          <EventFanarts initialFanart={null} />
          {/* <UploadImages
            getDataFromChild={getDataFromChild}
            getHashFromChild={getHashFromChild}
          /> */}
          <DynamicUploadImages
            getDataFromChild={getDataFromChild}
            getHashFromChild={getHashFromChild}
          />
          <RandomFanart />
          <UpdateBoard last_update_info={last_update_info} />

          <NextLink href="/notice" legacyBehavior>
            <Flex
              w="80%"
              maxW="540px"
              flexDir="row"
              justifyContent="space-between"
              alignItems="center"
              mt="2rem"
              mb="1rem"
              cursor="pointer"
            >
              <Heading size="md">업데이트 내용</Heading>
              <Text fontSize="md">더보기</Text>
            </Flex>
          </NextLink>

          <UpdateLog count={4} />
        </>
      )}

      {/* 업로드 후 */}
      {uploadedfiles.length !== 0 && hash !== null && (
        <div className="result-area">
          <Preview files={uploadedfiles} />
          {isSearchingData && <Loading />}
          {!isSearchingData && (
            <SearchResult
              searchTime={searchTime}
              data={data}
              ids={ids}
              isSearchingAuthor={isSearchingAuthor}
              author={author2}
              // author={author}
              resetFiles={resetFiles}
            />
          )}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const timeout = 2000; // 3초
    // const counter = axios
    //     .get("https://isd-fanart.reruru.com/counter")
    //     .then((res) => res.data);
    const last_update_info = axios
      .get('https://re-find.reruru.com/last_update_info', { timeout })
      .then((res) => res.data);
    // const initialFanart = axios
    //   .get(`https://re-find.reruru.com/isegye_festival`)
    //   .then((res) => res.data);
    // const random_fanart = axios
    //     .get("https://rerurureruru.com:8443/rand", { timeout })
    //     .then((res) => res.data);

    const ret = await Promise.all([
      // wow - 병렬로 요청해서 페이지 로딩 줄임!
      // counter,
      last_update_info,
      // initialFanart,
      // random_fanart,
    ]);

    return {
      props: {
        // counter: ret[0],
        // last_update_info: ret[1],
        // random_fanart: ret[1],
        last_update_info: ret[0],
        // initialFanart: ret[1],
      },
    };
  } catch (error) {
    console.log('Error fetching data :', error);

    // Return an alternate value if the fetch fails
    return {
      props: {
        // counter: null,
        last_update_info: null,
        // initialFanart: null,
        // random_fanart: null,
      },
    };
  }
}
