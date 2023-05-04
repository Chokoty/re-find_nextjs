import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useStore } from "zustand";

import Title from "./Title";
import UploadImages from "./UploadImages";
import Preview from "./Preview";
import CountUp from "react-countup";
import UpdateBoard from "./UpdateBoard";
import AuthorProfileCard from "./AuthorProfileCard";
import { lightMode, darkMode } from "@/styles/theme";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    Spinner,
    Box,
    Badge,
    Button,
    Heading,
    Link,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    UnorderedList,
    ListItem,
    useToast,
    Card,
    CardBody,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Image from "next/image";

const HomePage = ({ counter, today_counter, last_update_info }) => {
    // const bear = useStore((state) => state.bears);

    const [files, setFiles] = useState([]); // 파일 업로드를 위한 상태
    const [data, setData] = useState(null); // fetch 를 통해 받아온 데이터를 저장할 상태
    const [search, setSearch] = useState(false); // 검색 여부
    const [loading, setLoading] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();

    const [counterNow, setCounterNow] = useState(0);
    const [counterTodayNow, setCounterTodayNow] = useState(0);

    const { isOpen, onToggle } = useDisclosure();
    const loadingRef = useRef(null);
    const [searchTime, setSearchTime] = useState(0);
    const toast = useToast();
    const last_update = last_update_info.split(", ");
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
                console.log(response.data.id);
                // console.log(response.data);
                if (response.data.id.length === 0) {
                    setData(null);
                } else {
                    // setData(response.data.id[0]);
                    setData(response.data);
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
            } else {
                console.log(error);
            }
        }
    };

    // 작가 프로필 가져오기
    const fetchAuthorProfile = async (postId) => {
        try {
            const response = await axios.get("/api/getAuthorProfile", {
                params: {
                    postId: postId,
                },
            });
            const data = response.data;
            console.log(data);
            // setContent(data.content);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // fetchAuthorProfile("10933229");
        console.log(last_update_info);
    }, []);

    // 1분마다 counter 업데이트?
    const fetchCounter = async () => {
        try {
            const counter = await fetch(
                "https://isd-fanart.reruru.com/counter"
            ).then((res) => res.json());
            const today_counter = await fetch(
                "https://re-find.reruru.com/today_counter"
            ).then((res) => res.json());
            setCounterNow(counter);
            setCounterTodayNow(today_counter);
            // console.log(counter);
            // console.log(today_counter);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (files.length > 0) {
            toast({
                title: `Searching Time: ${searchTime / 1000}s`,
                status: `${data === null ? "error" : "success"}`,
                isClosable: true,
            });
        }
    }, [data, searchTime]);

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

    // useEffect(() => {
    //     if (loadingRef.current) {
    //         loadingRef.current.focus();
    //         // scroll to
    //         loadingRef.current.scrollIntoView({
    //             behavior: "smooth",
    //             block: "start",
    //         });
    //     }
    // }, []);

    // 자식 컴포넌트로부터 데이터 받기
    const getDataFromChild = (data) => {
        setFiles(data);
    };

    // files 을 [] 로 초기화
    const resetFiles = () => {
        setFiles([]);
        setData(null);
        setSearch(false);
        onToggle();
        // fetchCounter();
    };

    return (
        <div
            className="home_body"
            style={{ backgroundColor: bgColor, color: color }}
        >
            <div className="counter">
                {counter === null ? (
                    "현재 서버와의 연결이 불안정합니다."
                ) : (
                    <>
                        <CountUp
                            end={counterNow === 0 ? counter : counterNow}
                        />
                        &nbsp;
                        <Badge
                            style={{ backgroundColor: badge }}
                            fontSize="1em"
                        >
                            +
                            <CountUp
                                end={
                                    counterTodayNow === 0
                                        ? today_counter
                                        : counterTodayNow
                                }
                                duration={5}
                            />
                        </Badge>
                        &nbsp; 개의 출처를 찾았습니다.
                    </>
                )}
            </div>
            <Title />
            <p className="title-sub">이세계 아이돌 팬아트 출처 찾기</p>

            {files.length === 0 && (
                <>
                    <UploadImages getDataFromChild={getDataFromChild} />
                    <div
                        className="update-info"
                        style={{
                            marginTop: "3em",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Card width="90%">
                            <CardBody>
                                <Heading
                                    as="h1"
                                    size="md"
                                    textTransform="uppercase"
                                >
                                    마지막 업데이트 게시글
                                </Heading>
                                <Text fontSize="1em">{last_update[0]}</Text>
                                <Text fontSize="1em">
                                    <Link
                                        color={highlightColor}
                                        className="link"
                                        href={
                                            "https://cafe.naver.com/steamindiegame/" +
                                            last_update[1]
                                        }
                                        isExternal
                                    >
                                        https://cafe.naver.com/steamindiegame/
                                        {last_update[1]}{" "}
                                        <ExternalLinkIcon mx="2px" />
                                    </Link>
                                </Text>
                            </CardBody>
                        </Card>
                        <UpdateBoard />
                    </div>
                </>
            )}
            {files.length !== 0 && (
                <div className="result-area">
                    <Preview files={files} />
                    {loading ? (
                        <div className="loading" ref={loadingRef}>
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

                                    {/* <AuthorProfileCard
                                        authorName={data.author_name}
                                        authorUrl={data.author_url}
                                        authorProfUrl={data.author_prof_url}
                                    /> */}
                                    {/* <p>게시판: </p> */}
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
        </div>
    );
};

export default HomePage;
