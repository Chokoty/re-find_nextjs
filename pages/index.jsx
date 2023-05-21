import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
    Text,
    Spinner,
    Skeleton,
    Button,
    Heading,
    Link,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { lightMode, darkMode } from "@/styles/theme";

import Title from "../components/Title";
import Counter from "../components/Counter";
import UploadImages from "../components/UploadImages";
import Preview from "../components/Preview";
import UpdateCard from "../components/UpdateCard";
import AuthorProfileCard from "../components/AuthorProfileCard";
import Description from "../components/Description";

import { useStore } from "../store/store";

const ScrollAnimation = ({ targetRef, topPosition }) => {
    return (
        <motion
            defaultStyle={{ scrollTop: 0 }}
            style={{ scrollTop: spring(topPosition) }}
        >
            {({ scrollTop }) => (
                <div
                    ref={targetRef}
                    style={{ position: "relative", top: scrollTop }}
                >
                    {/* 스크롤 애니메이션을 적용할 요소 내용 */}
                </div>
            )}
        </motion>
    );
};

export default function Home({ last_update_info }) {
    const setIsOpen = useStore((state) => state.setIsOpen);

    const [files, setFiles] = useState([]); // 파일 업로드를 위한 상태
    const [data, setData] = useState(null); // fetch 를 통해 받아온 데이터를 저장할 상태
    const [search, setSearch] = useState(false); // 검색 여부
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onToggle } = useDisclosure();

    const [counter, setCounter] = useState(null);
    const [author, setAuthor] = useState(null);
    const [counterLoading, setCounterLoading] = useState(true);
    const [searchTime, setSearchTime] = useState(0);

    const toast = useToast();
    const targetRef = useRef(null);
    // const loadingRef = useRef(null);

    const handleClick = () => {
        const headerHeight = 108;
        const targetElement = targetRef.current;
        const topPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
            top: topPosition,
            behavior: "smooth", // 부드럽게 스크롤하기 위해 'smooth' 옵션 사용
        });
    };

    // Theme
    const isDark = colorMode === "dark";
    const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
    const color = useColorModeValue(lightMode.color, darkMode.color);
    const badge = useColorModeValue(lightMode.badge, darkMode.badge);
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );

    // 페이지 랜더링되면 카운터 가져오기, 서랍 닫기
    useEffect(() => {
        fetchCounter();
        setIsOpen(false);
    }, []);

    // 검색시간 토스트
    useEffect(() => {
        if (files.length > 0) {
            toast({
                title: `Searching Time: ${searchTime / 1000}s`,
                status: `${data === null ? "error" : "success"}`,
                isClosable: true,
            });
        }
    }, [data, searchTime]);

    // 이미지 검색 상태 토스트
    useEffect(() => {
        if (files.length > 0 && counter === null) {
            toast({
                title: `현재 이미지 검색을 이용할 수 없습니다.`,
                status: `error`,
                isClosable: true,
            });
        }
        if (files.length > 0 && counter !== null) {
            fetchOriginalUrl();
        }
    }, [files]);

    // 이미지 검색하기
    const fetchOriginalUrl = async () => {
        try {
            setLoading(true); // 검색중
            const body = new FormData();
            body.append("file", files[0]);
            if (!search) {
                const startTime = new Date().getTime(); // 시작시간 기록
                const response = await axios.post(
                    "https://isd-fanart.reruru.com/receive",
                    body
                );
                const endTime = new Date().getTime(); // 종료시간 기록
                console.log(`Image search time: ${endTime - startTime}ms`); // 차이값 출력
                const searchTime = endTime - startTime; // ms
                setSearchTime(searchTime); // 차이값 저장

                console.log(response.data);
                if (response.data.id.length === 0) {
                    setData(null);
                } else {
                    setData(response.data);
                    fetchAuthorProfile(response.data.id[0]);
                }
            }
            setLoading(false); //  검색 완료
            setSearch(true); // 재검색을 방지
        } catch (error) {
            if (error.response && error.response.status === 500) {
                console.log("Server Error: ", error.response.status);
                setData(null);
                setLoading(false); //  검색 완료
                setSearch(true); // 재검색을 방지
                toast({
                    title: `현재 서버 점검중 입니다. 잠시 후 다시 시도해주세요.`,
                    status: `error`,
                    isClosable: true,
                });
                // 500 에러 처리 코드 작성
            } else if (error.code == "ERR_NETWORK") {
                console.log("Network Error: ", error.code);
                setData(null);
                setLoading(false); //  검색 완료
                setSearch(true); // 재검색을 방지
                toast({
                    title: `${error.code}`,
                    status: `error`,
                    isClosable: true,
                });
            } else {
                console.log(error);
            }
        }
    };

    // counter 가져오기
    const fetchCounter = async () => {
        try {
            setCounterLoading(true);
            const response = await axios.get(
                "https://isd-fanart.reruru.com/counter"
            );
            const counter = response.data;

            setCounter(counter);
            setCounterLoading(false);
        } catch (err) {
            setCounterLoading(false);
            console.log(err);
        }
    };

    // 작가 프로필 가져오기 - 자체 api
    const fetchAuthorProfile = async (postId) => {
        try {
            setLoading2(true); // 검색중
            const startTime = new Date().getTime(); // 시작시간 기록
            const response = await axios.get("/api/getAuthorProfile", {
                params: {
                    postId: postId,
                },
            });
            const endTime = new Date().getTime(); // 종료시간 기록
            // console.log(`Profile search time: ${endTime - startTime}ms`); // 차이값 출력

            const data = response.data;
            console.log(data);
            setAuthor(data);
        } catch (error) {
            // console.error(error);

            if (error.response && error.response.status === 401) {
                // 401 Unauthorized 에러 처리
                console.log("Unauthorized");
                const data = response.data;
                console.log(data);
                setAuthor(data);
            } else {
                console.error(error);
            }
        }
        setLoading2(false); //  검색 완료
    };

    // 프로필 테스트용
    // useEffect(() => {
    //     fetchAuthorProfile("11251877"); //11251877 //10851152
    // }, []);

    // 자식 컴포넌트로부터 데이터 받기
    const getDataFromChild = (data) => {
        setFiles(data);
    };

    // files 을 [] 로 초기화
    const resetFiles = () => {
        handleClick();
        setFiles([]);
        setData(null);
        setSearch(false);
        onToggle();
        fetchCounter();
        setAuthor(null);
    };
    return (
        // <>
        //     <HomePage last_update_info={last_update_info} />
        // </>
        <div
            ref={targetRef}
            className="home_body"
            style={{ backgroundColor: bgColor, color: color }}
        >
            {/* <h1>{count}</h1> */}
            {/* <button onClick={increaseCount}>count up</button> */}
            {/* <button onClick={handleClickSearching}>스크롤 이동</button> */}
            <Counter counter={counter} counterLoading={counterLoading} />
            <Title />
            <p className="title-sub">이세계 아이돌 팬아트 출처 찾기</p>
            {files.length === 0 && (
                <>
                    <UploadImages getDataFromChild={getDataFromChild} />
                    <div
                        className="update-info"
                        style={{
                            marginTop: "3em",
                            display: "grid",
                            // display: "flex", -> ios14 아래 지원 안됨
                            // flexDirection: "column",
                            // justifyContent: "center",
                            alignItems: "center",
                            placeItems: "center",
                            gridGap: "1em",
                            gap: "1em",
                        }}
                    >
                        <Heading
                            as="h1"
                            size="md"
                            mb="20px"
                            textTransform="uppercase"
                            color={color}
                        >
                            게시판 업데이트 현황
                        </Heading>
                        {last_update_info.map((update, index) => (
                            <UpdateCard key={index} update={update} />
                        ))}
                        <Text whiteSpace="normal">
                            현재 명시된 게시판에서만 찾을 수 있습니다.
                        </Text>
                    </div>
                </>
            )}
            {files.length !== 0 && (
                <div className="result-area">
                    <Preview files={files} />
                    {loading ? (
                        <div className="loading">
                            <div>검색중</div>
                            &nbsp;
                            <Spinner size="sm" />
                        </div>
                    ) : (
                        <div className="result">
                            <Text fontSize="xl" mb="20px" textAlign="center">
                                검색시간: {searchTime / 1000}s
                            </Text>
                            {data === null ? (
                                <div className="notFound">
                                    <Description />
                                </div>
                            ) : (
                                <div className="found">
                                    {/* {author === null && ( */}
                                    <Link
                                        fontSize="xl"
                                        mb="20px"
                                        textAlign="center"
                                        // color="#01bda1"
                                        color={highlightColor}
                                        className="link"
                                        href={
                                            "https://cafe.naver.com/steamindiegame/" +
                                            data.id[0]
                                        }
                                        isExternal
                                    >
                                        https://cafe.naver.com/steamindiegame/
                                        {data.id[0]}
                                        <ExternalLinkIcon mx="2px" />
                                    </Link>
                                    {/* )} */}

                                    <Skeleton
                                        isLoaded={!loading2}
                                        mt="20px"
                                        mb="20px"
                                    >
                                        <Text
                                            fontSize="xl"
                                            mb="20px"
                                            textAlign="center"
                                        >
                                            {author?.board}
                                        </Text>
                                        <Link
                                            fontSize="xl"
                                            mb="20px"
                                            textAlign="center"
                                            // color="#01bda1"
                                            color={highlightColor}
                                            className="link"
                                            href={
                                                "https://cafe.naver.com/steamindiegame/" +
                                                data.id[0]
                                            }
                                            isExternal
                                        >
                                            {author?.title}
                                            <ExternalLinkIcon mx="2px" />
                                        </Link>
                                    </Skeleton>
                                    <Skeleton isLoaded={!loading2}>
                                        <AuthorProfileCard
                                            writerURL={author?.writerURL}
                                            profURL={author?.profURL}
                                            nickname={author?.nickname}
                                            board={author?.uploadText}
                                        />
                                    </Skeleton>
                                </div>
                            )}
                        </div>
                    )}
                    {!loading && (
                        <Button onClick={resetFiles} colorScheme="blue">
                            다른 이미지 검색
                        </Button>
                    )}
                </div>
            )}
            {/* <div className="loadingTarget" ref={loadingRef}></div> */}
        </div>
    );
}

export async function getServerSideProps() {
    try {
        // const counter = axios
        //     .get("https://isd-fanart.reruru.com/counter")
        //     .then((res) => res.data);
        const last_update_info = axios
            .get("https://re-find.reruru.com/last_update_info")
            .then((res) => res.data);

        const ret = await Promise.all([
            // wow - 병렬로 요청해서 페이지 로딩 줄임!
            // counter,
            last_update_info,
        ]);

        return {
            props: {
                // counter: ret[0],
                // last_update_info: ret[1],
                last_update_info: ret[0],
            },
        };
    } catch (error) {
        console.log("Error fetching data :", error);

        // Return an alternate value if the fetch fails
        return {
            props: {
                // counter: null,
                last_update_info: null,
            },
        };
    }
}
