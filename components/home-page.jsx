import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useStore } from "zustand";

import Title from "./Title";
import UploadImages from "./UploadImages";
import Preview from "./Preview";
import UpdateBoard from "./history/UpdateBoard";
import UpdateCard from "./UpdateCard";

import AuthorProfileCard from "./AuthorProfileCard";
import { lightMode, darkMode } from "@/styles/theme";
import { Skeleton } from "@chakra-ui/react";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    Spinner,
    Box,
    Button,
    Heading,
    Link,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    UnorderedList,
    ListItem,
    useToast,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Counter from "./Counter";

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

const HomePage = ({ last_update_info }) => {
    // const bear = useStore((state) => state.bears);
    const [files, setFiles] = useState([]); // 파일 업로드를 위한 상태
    const [data, setData] = useState(null); // fetch 를 통해 받아온 데이터를 저장할 상태
    const [search, setSearch] = useState(false); // 검색 여부
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();

    const [counter, setCounter] = useState(null);
    const [author, setAuthor] = useState(null);
    const [counterLoading, setCounterLoading] = useState(true);

    const { isOpen, onToggle } = useDisclosure();
    const [searchTime, setSearchTime] = useState(0);
    const toast = useToast();
    const targetRef = useRef(null);
    const loadingRef = useRef(null);

    const handleClick = () => {
        const headerHeight = 108;
        const targetElement = targetRef.current;
        const topPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
            top: topPosition,
            behavior: "smooth", // 부드럽게 스크롤하기 위해 'smooth' 옵션 사용
        });
    };

    // const handleClickSearching = () => {
    //     const targetElement = loadingRef.current;
    //     const topPosition =
    //         targetElement.offsetTop +
    //         targetElement.offsetHeight -
    //         window.innerHeight;

    //     window.scrollTo({
    //         top: topPosition,
    //         behavior: "auto", // 부드럽게 스크롤하기 위해 'smooth' 옵션 사용
    //     });
    // };
    // const statuses = ["success", "error", "warning", "info"];

    // Theme
    const isDark = colorMode === "dark";
    const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
    const color = useColorModeValue(lightMode.color, darkMode.color);
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );

    const badge = useColorModeValue(lightMode.badge, darkMode.badge);

    useEffect(() => {
        fetchCounter();
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
        // if (files.length > 0) handleClickSearching();

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

                // console.log(response.data);
                // console.log(response.data.id);
                // console.log(response.data);
                if (response.data.id.length === 0) {
                    setData(null);
                } else {
                    // setData(response.data.id[0]);
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

    // 작가 프로필 가져오기
    const fetchAuthorProfile = async (postId) => {
        try {
            setLoading2(true); // 검색중
            const response = await axios.get("/api/getAuthorProfile", {
                params: {
                    postId: postId,
                },
            });
            const data = response.data;
            // console.log(data);
            setAuthor(data);
        } catch (error) {
            console.error(error);
        }
        setLoading2(false); //  검색 완료
    };

    // const fetchTitles = async () => {
    //     try {
    //         const response1 = axios.get(" /api/getAuthorProfile", {
    //             params: {
    //                 postId: last_update_info[0].id,
    //             },
    //         });
    //         const response2 = axios.get("/api/getAuthorProfile", {
    //             params: {
    //                 postId: last_update_info[1].id,
    //             },
    //         });
    //         const response3 = axios.get("/api/getAuthorProfile", {
    //             params: {
    //                 postId: last_update_info[2].id,
    //             },
    //         });
    //         const response4 = axios.get("/api/getAuthorProfile", {
    //             params: {
    //                 postId: last_update_info[3].id,
    //             },
    //         });

    //         const ret = await Promise.all([
    //             response1.data,
    //             response2.data,
    //             response3.data,
    //             response4.data,
    //         ]);
    //         console.log(ret);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchTitles();
    //     // fetchAuthorProfile("10933229");
    // }, []);

    // counter 가져오기 -> axis로 바꾸기
    const fetchCounter = async () => {
        try {
            setCounterLoading(true);
            const response = await axios.get(
                "https://isd-fanart.reruru.com/counter"
            );
            const counter = response.data;

            // const counter = await fetch(
            //     "https://isd-fanart.reruru.com/counter"
            // ).then((res) => res.json());
            // console.log(counter);
            setCounter(counter);
            setCounterLoading(false);
        } catch (err) {
            setCounterLoading(false);
            console.log(err);
        }
    };

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
        <div
            ref={targetRef}
            className="home_body"
            style={{ backgroundColor: bgColor, color: color }}
        >
            {/* <AuthorProfileCard
                writerURL={author?.writerURL}
                profURL={author?.profURL}
                nickname={author?.nickname}
                board={author?.board}
            /> */}
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
                        {/* <UpdateBoard last_update_info={last_update_info} /> */}
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
                                    <Accordion
                                        className="description"
                                        allowToggle
                                        style={{
                                            color: "#ef5a9a",
                                        }}
                                    >
                                        <AccordionItem>
                                            <h2>
                                                <AccordionButton
                                                // _expanded={{ bg: "#ef5a9a", color: "white" }}
                                                >
                                                    <Box
                                                        fontWeight="bold"
                                                        flex="1"
                                                        textAlign="center"
                                                        color={"#F00"}
                                                    >
                                                        이미지 출처를 찾지
                                                        못했습니다.
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                <Box
                                                    p="40px"
                                                    color="white"
                                                    m="auto"
                                                    mt="4"
                                                    rounded="md"
                                                    shadow="md"
                                                    border="2px"
                                                    borderColor={highlightColor}
                                                    style={{
                                                        color: color,
                                                    }}
                                                >
                                                    <Text fontWeight="bold">
                                                        다음과 같은 경우에
                                                        검색결과가 나오지 않을
                                                        수 있습니다!
                                                    </Text>
                                                    <UnorderedList
                                                        spacing={2}
                                                        // color="#005666"
                                                        color={highlightColor}
                                                    >
                                                        <ListItem>
                                                            <Text fontWeight="bold">
                                                                원본 팬아트에서
                                                                변형을 가한 경우
                                                                찾기 어렵습니다.{" "}
                                                                <br />
                                                                (일부 잘라낸
                                                                이미지, 크기
                                                                변형, 배경
                                                                투명화 등)
                                                            </Text>
                                                        </ListItem>
                                                        <ListItem fontSize="md">
                                                            <Text fontWeight="bold">
                                                                왁물원에 새로
                                                                올라온 팬아트가
                                                                반영되기까지
                                                                시간이 좀 걸릴
                                                                수
                                                                있습니다.(길면
                                                                하루 정도)
                                                            </Text>
                                                        </ListItem>
                                                        <ListItem>
                                                            <Text fontWeight="bold">
                                                                현재 상단에
                                                                명시된 게시판에
                                                                올라온 것만 찾을
                                                                수 있습니다.
                                                                (자유 게시판이나
                                                                웹툰 게시판에
                                                                올라온 것은 찾을
                                                                수 없습니다.)
                                                            </Text>
                                                        </ListItem>

                                                        <ListItem>
                                                            {" "}
                                                            <Text fontWeight="bold">
                                                                게시글이
                                                                존재하는
                                                                이미지여도 못
                                                                찾는 모시깽이가
                                                                가끔 있습니다.
                                                            </Text>
                                                        </ListItem>
                                                    </UnorderedList>

                                                    <Text
                                                        fontWeight="bold"
                                                        alignItems="center"
                                                    >
                                                        구글 이미지 검색을
                                                        활용하여 다른 곳에
                                                        업로드된 이미지를 찾은
                                                        뒤, 그걸로 검색하면 간혹
                                                        찾을 수 있습니다. &nbsp;
                                                        <Link
                                                            fontWeight="bold"
                                                            color={
                                                                highlightColor
                                                            }
                                                            href="https://www.google.co.kr/imghp?hl=ko"
                                                            isExternal
                                                        >
                                                            구글 이미지
                                                            검색하러가기
                                                            <ExternalLinkIcon mx="2px" />
                                                        </Link>
                                                    </Text>
                                                </Box>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            ) : (
                                <div className="found">
                                    <Link
                                        mb="20px"
                                        color="#01bda1"
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
                                    <Skeleton
                                        isLoaded={!loading2}
                                        mt="20px"
                                        mb="20px"
                                    >
                                        <Text>{author?.board}</Text>
                                        <Link
                                            color="#01bda1"
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
                                            board={author?.board}
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
};

export default HomePage;
