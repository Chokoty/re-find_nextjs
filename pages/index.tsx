import React, { useState, useEffect, useRef, use } from "react";
import axios from "axios";

import {
    Text,
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
import Loading from "../components/Loading";
import Preview from "../components/Preview";
import Counter from "../components/Counter";
import EventModal from "../components/events/EventModal";
import UpdateBoard from "../components/UpdateBoard";
import Description from "../components/Description";
import UploadImages from "../components/UploadImages";
// import MelonVoteModal from "../components/events/MelonVoteModal";
import AuthorProfileCard from "../components/AuthorProfileCard";

import { useStore } from "../store/store";

export default function Home({ last_update_info }) {
    const setIsOpen = useStore((state) => state.setIsOpen);

    //temp
    const [congrat, setCongrat] = useState(false); // 파일 업로드를 위한 상태

    const [uploadedfiles, setUploadedFiles] = useState([]); // 파일 업로드를 위한 상태
    const [data, setData] = useState(null); // fetch 를 통해 받아온 데이터를 저장할 상태
    const [ids, setIds] = useState([]); // 게시글 여러 개
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
        // fetchCounter();
        setIsOpen(false);
    }, []);

    // 검색시간 토스트
    useEffect(() => {
        if (uploadedfiles.length > 0) {
            toast({
                title: `Searching Time: ${searchTime / 1000}s`,
                status: `${data === null ? "error" : "success"}`,
                isClosable: true,
            });
        }
    }, [data, searchTime]);

    // 이미지 검색 상태 토스트
    useEffect(() => {
        // if (files.length > 0 && counter === null) {
        //     toast({
        //         title: `현재 이미지 검색을 이용할 수 없습니다.`,
        //         status: `error`,
        //         isClosable: true,
        //     });
        // }
        // if (files.length > 0 && counter !== null) {
        //     fetchOriginalUrl();
        // }
        if (uploadedfiles.length > 0) fetchOriginalUrl();
    }, [uploadedfiles]);

    // 이미지 검색하기
    const fetchOriginalUrl = async () => {
        try {
            setLoading(true); // 검색중
            const body = new FormData();
            body.append("file", uploadedfiles[0]);
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
                    // console.log(response.data);
                    setData(response.data);
                    setIds(response.data.id.slice(0, 15)); // 10~15개 제한

                    if (response.data.total_counter == 20000) setCongrat(true);

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
                    title: `현재 서버와 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.`,
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
            // console.log(data);
            setAuthor(data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // 401 Unauthorized 에러 처리
                console.log("Unauthorized");
                const data = {
                    profURL: "NULL",
                    title: "카페 멤버에게만 공개된 게시글 입니다.",
                };
                setAuthor(data);
            } else if (error.response && error.response.status === 404) {
                // 404 Not Found 에러 처리
                console.log("Not Found");
                const data = {
                    // 삭제된 게시글 작성자 정보는 보여줄 수 있음
                    profURL: "NULL",
                    title: "삭제되었거나 없는 게시글입니다.",
                    // writerURL: data.author_profile,
                    // nickname: data.author_nickname,
                };
                setAuthor(data);
            } else {
                console.error(error);
            }
        }
        setLoading2(false); //  검색 완료
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
    useEffect(() => {
        // fetchAuthorProfile("11379038");
        // fetchAuthorProfile("11379754");
        // fetchAuthorProfile("11251877"); // 0004 로그인 필요 401에러
        // fetchAuthorProfile("10532685"); // 4003 게시글이 존재하지 않습니다 404에러 // 삭제되었거나 없는 게시글입니다.
    }, []);

    // 자식 컴포넌트로부터 데이터 받기
    const getDataFromChild = (data) => {
        setUploadedFiles(data);
    };

    // files 을 [] 로 초기화
    const resetFiles = () => {
        handleClick();
        setUploadedFiles([]);
        setData(null);
        setSearch(false);
        onToggle();
        // fetchCounter();
        setAuthor(null);
    };

    return (
        <div
            className="home_body"
            style={{ backgroundColor: bgColor, color: color }}
            ref={targetRef}
        >
            {congrat && <EventModal />}
            {/*상단 타이틀 */}
            <Counter />
            <Title />
            <p className="title-sub">이세계 아이돌 팬아트 출처 찾기</p>
            <br />
            {/* <MelonVoteModal /> */}
            {/*검색 전 */}
            {uploadedfiles.length === 0 && (
                <>
                    <UploadImages getDataFromChild={getDataFromChild} />
                    <UpdateBoard
                        last_update_info={last_update_info}
                        color={color}
                    />
                </>
            )}
            {/*검색 후 */}
            {uploadedfiles.length !== 0 && (
                <div className="result-area">
                    <Preview files={uploadedfiles} />
                    {loading && <Loading />}
                    {!loading && (
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
                                    {ids.map((item, index) => (
                                        <Link
                                            key={index}
                                            fontSize="xl"
                                            mb="20px"
                                            textAlign="center"
                                            // color="#01bda1"
                                            color={highlightColor}
                                            className="link"
                                            href={
                                                "https://cafe.naver.com/steamindiegame/" +
                                                item
                                            }
                                            isExternal
                                        >
                                            https://cafe.naver.com/steamindiegame/
                                            {item}
                                            <ExternalLinkIcon mx="2px" />
                                        </Link>
                                    ))}

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
                                            {author?.board || ""}
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
                                                data?.id[0]
                                            }
                                            isExternal
                                        >
                                            {author?.title}
                                            <ExternalLinkIcon mx="2px" />
                                        </Link>
                                    </Skeleton>
                                    <Skeleton isLoaded={!loading2}>
                                        <AuthorProfileCard
                                            writerURL={
                                                author?.writerURL ||
                                                data?.author_profile
                                            }
                                            profURL={author?.profURL}
                                            nickname={
                                                author?.nickname ||
                                                data?.author_nickname
                                            }
                                            board={author?.uploadText}
                                        />
                                    </Skeleton>
                                </div>
                            )}
                            <Button
                                onClick={resetFiles}
                                colorScheme="blue"
                                w={140}
                            >
                                다른 이미지 검색
                            </Button>
                        </div>
                    )}
                </div>
            )}
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
