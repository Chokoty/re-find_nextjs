import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import {
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { lightMode, darkMode } from '@/styles/theme';

import Title from '../components/Title';
import SubTitle from '../components/SubTitle';
import Loading from '../components/Loading';
import Preview from '../components/Preview';
import Counter from '../components/Counter';
import UpdateBoard from '../components/UpdateBoard';
import UploadImages from '../components/UploadImages';
import SearchResult from '../components/SearchResult';
import RandomFanart from '../components/RandomFanart';

import { useStore } from '../store/store';

// import EventModal from "../components/events/EventModal";
import MelonVoteModal from '../components/events/MelonVoteModal';
import KiddingFanart from '../components/events/KiddingFanart';

export default function Home({ last_update_info, initialFanart }) {
  const setIsOpen = useStore((state) => state.setIsOpen);
  const targetRef = useRef(null);
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

  //temp
  const [congrat, setCongrat] = useState(false);
  const [counter, setCounter] = useState(null);
  const [counterLoading, setCounterLoading] = useState(true);

  const [uploadedfiles, setUploadedFiles] = useState([]); // 파일 업로드를 위한 상태
  const [data, setData] = useState(null); // fetch를 통해 받아온 데이터를 저장할 상태

  const [ids, setIds] = useState([]); // 게시글 여러 개
  const [hasSearchResult, setHasSearchResult] = useState(false); // 재검색 방지
  const [isSearchingData, setIsSearchingData] = useState(false);
  const [isSearchingAuthor, setIsSearchingAuthor] = useState(false);

  const [author, setAuthor] = useState(null);
  const [author2, setAuthor2] = useState(null);
  const [searchTime, setSearchTime] = useState(0);

  // Theme
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const badge = useColorModeValue(lightMode.badge, darkMode.badge);
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

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

  // 검색시간 토스트
  useEffect(() => {
    if (uploadedfiles === null) {
      toast({
        title: `Searching Time: ${searchTime / 1000}s`,
        status: `${data === null ? 'error' : 'success'}`,
        isClosable: true,
      });
    }
  }, [data, searchTime]);
  useEffect(() => {
    if (uploadedfiles.length > 0) {
      toast({
        title: `Searching Time: ${searchTime / 1000}s`,
        status: `${data === null ? 'error' : 'success'}`,
        isClosable: true,
      });
    }
  }, [data, searchTime]);

  // 이미지 검색 상태 토스트
  useEffect(() => {
    // if (uploadedfiles.length > 0 && counter === null) {
    //     toast({
    //         title: `현재 이미지 검색을 이용할 수 없습니다.`,
    //         status: `error`,
    //         isClosable: true,
    //     });
    // }
    if (uploadedfiles.length > 0) {
      fetchOriginalUrl();
    }
  }, [uploadedfiles]);

  // 이미지 검색하기
  const fetchOriginalUrl = async () => {
    try {
      setIsSearchingData(true); // 검색중
      const body = new FormData();
      body.append('file', uploadedfiles[0]);

      if (!hasSearchResult) {
        // 재검색 방지
        const startTime = new Date().getTime(); // 시작시간 기록
        const response = await axios.post(
          ' https://re-find.reruru.com/receive',
          body
        );
        const endTime = new Date().getTime(); // 종료시간 기록
        console.log(`Image search time: ${endTime - startTime}ms`); // 차이값 출력
        const searchTime = endTime - startTime; // ms
        setSearchTime(searchTime); // 차이값 저장

        if (response.data.id.length === 0) {
          setData(null);
        } else {
          // console.log(response.data); // >>>테스트용
          setAuthor2(response.data.author);
          setData(response.data);
          setIds(response.data.id.slice(0, 15)); // 검색결과 10~15개 제한
          // fetchAuthorProfile(response.data.id[0]); // 첫번째 게시글의 작가 프로필 가져오기

          // if (response.data.total_counter == 20000) setCongrat(true); // 20000번째 검색시 축하메시지
        }
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
      } else if (error.code == 'ERR_NETWORK') {
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

  // 작가 프로필 가져오기 - 자체 api
  const fetchAuthorProfile = async (postId) => {
    try {
      setIsSearchingAuthor(true); // 검색중
      const startTime = new Date().getTime(); // 시작시간 기록
      const response = await axios.get('/api/getAuthorProfile', {
        params: {
          postId: postId,
        },
      });
      const endTime = new Date().getTime(); // 종료시간 기록
      // console.log(`Profile search time: ${endTime - startTime}ms`); // 차이값 출력
      const authorData = response.data;
      setAuthor(authorData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // 401 Unauthorized 에러 처리
        console.log('Unauthorized');
        const privateData = {
          profURL: 'NULL',
          title: '카페 멤버에게만 공개된 게시글 입니다.',
        };
        setAuthor(privateData);
      } else if (error.response && error.response.status === 404) {
        // 404 Not Found 에러 처리
        console.log('Not Found');
        const DeletedData = {
          // 삭제된 게시글 작성자 정보는 보여줄 수 있음
          profURL: 'NULL',
          title: '삭제되었거나 없는 게시글입니다.',
          // writerURL: data.author_profile,
          // nickname: data.author_nickname,
        };
        setAuthor(DeletedData);
      } else {
        console.error(error);
      }
    }
    setIsSearchingAuthor(false); //  검색 완료
  };

  // useEffect(() => {
  //     if (author === null) return;
  //     if (author?.title === "카페 멤버에게만 공개된 게시글 입니다.")
  //         setAuthor({
  //             profURL: "NULL",
  //             title: "카페 멤버에게만 공개된 게시글 입니다.",
  //             writerURL: data.author_profile,
  //             nickname: data.author_nickname,
  //         });
  //     else if (author?.title === "삭제되었거나 없는 게시글입니다.")
  //         setAuthor({
  //             profURL: "NULL",
  //             title: "삭제되었거나 없는 게시글입니다.",
  //             writerURL: data.author_profile,
  //             nickname: data.author_nickname,
  //         });
  // }, [author]);

  // 프로필 테스트용
  const testProfile = () => {
    fetchAuthorProfile('11379038');
    // fetchAuthorProfile("11379754");
    // fetchAuthorProfile("11251877"); // 0004 로그인 필요 401에러
    // fetchAuthorProfile("10532685"); // 4003 게시글이 존재하지 않습니다 404에러 // 삭제되었거나 없는 게시글입니다.
  };

  // 자식 컴포넌트로부터 데이터 받기
  const getDataFromChild = (data) => {
    setUploadedFiles(data);
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
      style={{ backgroundColor: bgColor, color: color }}
      ref={targetRef}
    >
      {/*상단 타이틀 */}
      <Counter data={data} />
      <Title onTitleClick={resetFiles} />
      <SubTitle />

      <br />

      {/*이벤트 */}
      {/* {congrat && <EventModal />} */}
      <MelonVoteModal />

      {/*업로드 전 */}
      {uploadedfiles.length === 0 && (
        <>
          <KiddingFanart initialFanart={initialFanart} />
          <UploadImages getDataFromChild={getDataFromChild} />
          <RandomFanart />
          <UpdateBoard last_update_info={last_update_info} color={color} />
        </>
      )}

      {/*업로드 후 */}
      {uploadedfiles.length !== 0 && (
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

const fetchRandomFanartPrerender = async () => {
  try {
    const res = await axios.get(`https://re-find.reruru.com/third_album`);
    return res.data; // 데이터를 직접 반환합니다.
  } catch (error) {
    console.error('Error fetching fanart:', error); // 오류 메시지 출력
    return null; // 오류가 발생한 경우 null을 반환합니다.
  }
};

export async function getServerSideProps() {
  try {
    const timeout = 2000; // 3초
    // const counter = axios
    //     .get("https://isd-fanart.reruru.com/counter")
    //     .then((res) => res.data);
    const last_update_info = axios
      .get('https://re-find.reruru.com/last_update_info', { timeout })
      .then((res) => res.data);
    const initialFanart = axios
      .get(`https://re-find.reruru.com/third_album`)
      .then((res) => res.data);

    // const random_fanart = axios
    //     .get("https://rerurureruru.com:8443/rand", { timeout })
    //     .then((res) => res.data);

    const ret = await Promise.all([
      // wow - 병렬로 요청해서 페이지 로딩 줄임!
      // counter,
      last_update_info,
      initialFanart,
      // random_fanart,
    ]);

    return {
      props: {
        // counter: ret[0],
        // last_update_info: ret[1],
        // random_fanart: ret[1],
        last_update_info: ret[0],
        initialFanart: ret[1],
      },
    };
  } catch (error) {
    console.log('Error fetching data :', error);

    // Return an alternate value if the fetch fails
    return {
      props: {
        // counter: null,
        last_update_info: null,
        initialFanart: null,
        // random_fanart: null,
      },
    };
  }
}
