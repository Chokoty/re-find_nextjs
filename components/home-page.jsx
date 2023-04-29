import { useState, useEffect } from "react";
import axios from "axios";

import UploadImages from "./UploadImages";
import Preview from "./Preview";
import CountUp from "react-countup";

import {
    Box,
    Button,
    Collapse,
    Heading,
    Link,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
// import { LinkPreview } from "@dhaiwat10/react-link-preview";

const HomePage = ({ counter, today_counter }) => {
    const [files, setFiles] = useState([]); // 파일 업로드를 위한 상태
    const [data, setData] = useState(null); // fetch 를 통해 받아온 데이터를 저장할 상태
    const [search, setSearch] = useState(false); // 검색 여부
    const [loading, setLoading] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onToggle } = useDisclosure();

    // const titleColor = useColorModeValue("#154532", "#fff");
    // const titleBg = useColorModeValue("#c4f1ca", "none");
    const bg = useColorModeValue("red.500", "red.200");
    const color = useColorModeValue("white", "gray.800");
    const isDark = colorMode === "dark";

    const fetchOriginalUrl = async () => {
        try {
            setLoading(true); // 검색중
            const body = new FormData();
            body.append("file", files[0]);
            if (!search) {
                const response = await axios.post(
                    "https://isd-fanart.reruru.com/receive",
                    body
                );
                console.log(response.data.id);
                if (response.data.id.length === 0) {
                    setData(null);
                } else {
                    setData(response.data.id[0]);
                }
            }
            setLoading(false); //  검색 완료
            setSearch(true); // 재검색을 방지
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (files.length > 0) {
            fetchOriginalUrl();
        }
    }, [files]);

    const getDataFromChild = (data) => {
        setFiles(data);
    };

    // files 을 [] 로 초기화
    const resetFiles = () => {
        setFiles([]);
        setData(null);
        setSearch(false);
    };

    return (
        <div className="home_body">
            {counter === null ? (
                <div className="counter">
                    현재 서버와의 연결이 불안정합니다.
                </div>
            ) : (
                <div className={`counter ${isDark ? "" : "light"}`}>
                    <CountUp end={counter} />
                    (+
                    <CountUp end={today_counter} duration={5} /> ) 개의 출처를
                    찾았습니다.
                </div>
            )}

            <div className="title">
                <Link href="/" className="content">
                    <Heading className="title-main">
                        <span className="highlight">RE: </span> FIND
                    </Heading>
                </Link>
                <p className="title-sub">이세계 아이돌 팬아트 출처 찾기</p>
            </div>
            {files.length === 0 && (
                <UploadImages getDataFromChild={getDataFromChild} />
            )}
            {files.length !== 0 && (
                <div className="result-area">
                    {loading ? (
                        <div>검색중...</div>
                    ) : (
                        <div>
                            {data === null ? (
                                <div className="notFound">
                                    <div className="notFoundText">
                                        이미지 출처를 찾지 못했습니다.
                                    </div>
                                    <div>
                                        <Button
                                            onClick={resetFiles}
                                            colorScheme="blue"
                                        >
                                            다른 이미지 검색
                                        </Button>
                                        <Button onClick={onToggle}>
                                            Click Me
                                        </Button>
                                    </div>

                                    <Collapse in={isOpen} animateOpacity>
                                        <Box
                                            p="40px"
                                            color="white"
                                            mt="4"
                                            bg="teal.500"
                                            rounded="md"
                                            shadow="md"
                                        >
                                            <p>
                                                다음과 같은 경우에 검색결과가
                                                나오지 않을 수 있습니다:
                                            </p>
                                            <ul>
                                                <li>
                                                    게시글이 존재하는 이미지여도
                                                    못 찾는 모시깽이가 가끔
                                                    있습니다.
                                                </li>
                                                <li>
                                                    왁물원에 새로 올라온
                                                    팬아트가 반영되기까지 시간이
                                                    좀 걸릴 수 있습니다. (길면
                                                    하루 정도)
                                                </li>
                                                <li>
                                                    현재 상단에 명시된 게시판에
                                                    올라온 것만 찾을 수
                                                    있습니다. (자유 게시판이나
                                                    웹툰 게시판에 올라온 것은
                                                    찾을 수 없습니다.)
                                                </li>
                                                <li>
                                                    원본 팬아트에서 변형을 가한
                                                    경우 찾기 어렵습니다. (일부
                                                    잘라낸 이미지, 크기 변형,
                                                    배경 투명화 등)
                                                </li>
                                            </ul>
                                            <p>
                                                구글 이미지 검색을 활용하여 다른
                                                곳에 업로드된 이미지를 찾은 뒤,
                                                그것으로 검색하면 간혹 찾을 수
                                                있습니다. [구글 이미지
                                                검색](https://www.google.co.kr/imghp?hl=ko)
                                            </p>
                                        </Box>
                                    </Collapse>
                                </div>
                            ) : (
                                <div>
                                    <Link
                                        href={
                                            "https://cafe.naver.com/steamindiegame/" +
                                            data
                                        }
                                    >
                                        https://cafe.naver.com/steamindiegame/
                                        {data} <ExternalLinkIcon mx="2px" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    <Preview files={files} className="preview" />
                </div>
            )}
        </div>
    );
};

export default HomePage;
