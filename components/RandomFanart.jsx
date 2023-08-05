import React, { use, useEffect, useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";

import axios from "axios";
import { Text, Link, Button, Skeleton } from "@chakra-ui/react";
import { FaArrowDown, FaDice } from "react-icons/fa";

const RandomFanart = () => {
    const [isMobile, setIsMobile] = useState(true);
    const [fanart, setFanart] = useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [url, setUrl] = useState(null);
    const [urlId, setUrlId] = useState(null);
    const [isvisible, setIsvisible] = useState(false);

    useEffect(() => {
        fetchRandomFanart();

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // useEffect(() => {
    //     console.log(fanart);
    // }, [fanart]);

    const handleLoad = async () => {
        await new Promise((r) => setTimeout(r, 1000));
        setIsLoading(false);
    };

    const showRandomFanart = () => {
        if (!isvisible) setIsvisible(true);
        fetchRandomFanart();
    };
    const fetchRandomFanart = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get("https://rerurureruru.com:8443/rand");
            setFanart(res.data);
            // const url = isMobile
            //     ? "https://m.cafe.naver.com/ca-fe/web/cafes/27842958/articles/" +
            //       res.data?.id +
            //       "?fromList=true&menuId=344&tc=cafe_article_list"
            //     : "https://cafe.naver.com/steamindiegame/" + res.data?.id;
            setUrl(urlId);
        } catch (error) {
            if (error.response && error.response.status === 500) {
                console.log("Server Error: ", error.response.status);
            } else if (error.code == "ERR_NETWORK") {
                console.log("Network Error: ", error.code);
            } else {
                console.log(error);
            }
        }
        // 0.5초 대기
        // await new Promise((r) => setTimeout(r, 500));
        // setIsLoading(false);
    };

    const url2 = isMobile
        ? "https://m.cafe.naver.com/ca-fe/web/cafes/27842958/articles/"
        : //  +urlId +
          //   "?fromList=true&menuId=344&tc=cafe_article_list"
          "https://cafe.naver.com/steamindiegame/";
    // + urlId;

    const previewContainer = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 16,
        marginBottom: 30,
    };
    const img = {
        display: "flex",
        height: "100%",
        maxHeight: "400px",
        borderRadius: "1rem",
        objectFit: "cover",
        width: "80%",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        marginBottom: "0.5rem",
    };

    const linkDiv = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    };

    const guide = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
        height: "100px",
    };

    return (
        <div style={previewContainer} className="random-fanart">
            {!isvisible && (
                <div className="random-fanart__guide" style={guide}>
                    <Text fontSize="xl" fontWeight="bold" mb="1rem">
                        아래 버튼을 누르면 랜덤 팬아트가 나와요!
                    </Text>
                    <FaArrowDown boxSize={12} />
                </div>
            )}
            {isvisible && (
                <Skeleton isLoaded={!isLoading}>
                    {fanart && (
                        <Link
                            href={url2 + fanart?.id}
                            passHref
                            isExternal
                            style={linkDiv}
                        >
                            <NextImage
                                unoptimized
                                style={img}
                                width={475}
                                height={475}
                                src={fanart?.img_url}
                                alt={"랜덤 팬아트 게시글 id: " + fanart?.id}
                                onLoad={handleLoad}
                            />
                            <Text>랜덤 팬아트 id: {fanart?.id}</Text>
                            <Text>작가: {fanart?.nickname}</Text>
                        </Link>
                    )}
                </Skeleton>
            )}
            <Button
                w="160px"
                colorScheme="yellow"
                size="md"
                mt="1.5rem"
                onClick={showRandomFanart}
            >
                <FaDice boxSize={12} />
                &nbsp; 팬아트 랜덤가챠
            </Button>
        </div>
    );
};

export default RandomFanart;
