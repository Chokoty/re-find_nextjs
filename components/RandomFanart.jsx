import React, { use, useEffect, useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";

import axios from "axios";
import { Text, Link, Button, Skeleton } from "@chakra-ui/react";
import { FaDice } from "react-icons/fa";

const RandomFanart = () => {
    const [isMobile, setIsMobile] = useState(true);
    const [fanart, setFanart] = useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [url, setUrl] = useState(null);

    // const [isClient, setIsClient] = useState(false);

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

    useEffect(() => {
        console.log(fanart);
    }, [fanart]);

    // const url2 = isMobile
    //     ? "https://m.cafe.naver.com/ca-fe/web/cafes/27842958/articles/" +
    //       fanart2?.id +
    //       "?fromList=true&menuId=344&tc=cafe_article_list"
    //     : "https://cafe.naver.com/steamindiegame/" + fanart2?.id;

    const fetchRandomFanart = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get("https://rerurureruru.com:8443/rand");
            setFanart(res.data);
            const url = isMobile
                ? "https://m.cafe.naver.com/ca-fe/web/cafes/27842958/articles/" +
                  res.data?.id +
                  "?fromList=true&menuId=344&tc=cafe_article_list"
                : "https://cafe.naver.com/steamindiegame/" + res.data?.id;
            setUrl(url);
        } catch (error) {
            if (error.response && error.response.status === 500) {
                console.log("Server Error: ", error.response.status);
            } else if (error.code == "ERR_NETWORK") {
                console.log("Network Error: ", error.code);
            } else {
                console.log(error);
            }
        }
        setIsLoading(false);
    };

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
        // height: "50%",
    };

    return (
        <div style={previewContainer} className="random-fanart">
            <Skeleton isLoaded={!isLoading}>
                {fanart && (
                    <Link href={url} passHref isExternal style={linkDiv}>
                        <NextImage
                            style={img}
                            width={475}
                            height={475}
                            src={fanart?.img_url}
                            alt="Description of the image"
                        />
                        <Text>랜덤 팬아트 게시글 id: {fanart?.id}</Text>
                    </Link>
                )}
                {/* {isClient === true && (
                    <Link href={url2} passHref isExternal style={linkDiv}>
                        <NextImage
                            style={img}
                            width={475}
                            height={475}
                            src={fanart2?.img_url}
                            alt="Description of the image"
                        />
                        <Text>랜덤 팬아트 게시글 id: {fanart2?.id}</Text>
                    </Link>
                )} */}
            </Skeleton>
            <Button
                w="120px"
                colorScheme="yellow"
                size="md"
                mt="1.5rem"
                onClick={fetchRandomFanart}
            >
                <FaDice />
                &nbsp; 랜덤 팬아트
            </Button>
        </div>
    );
};

export default RandomFanart;
