import React, { use, useEffect, useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";

import axios from "axios";
import { Text, Link, Button } from "@chakra-ui/react";
import { FaDice } from "react-icons/fa";

const RandomFanart = ({ fanart }) => {
    const [isMobile, setIsMobile] = useState(true);

    const [fanart2, setFanart2] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);

    useEffect(() => {
        console.log("RandomFanart");
        console.log(fanart);
        setFanart2(fanart);
        // fetchRandomFanart();

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };

        setImgUrl(fanart?.img_url);
    }, []);

    useEffect(() => {
        console.log(fanart2);
    }, [fanart2]);
    const url = isMobile
        ? "https://m.cafe.naver.com/ca-fe/web/cafes/27842958/articles/" +
          fanart2?.id +
          "?fromList=true&menuId=344&tc=cafe_article_list"
        : "https://cafe.naver.com/steamindiegame/" + fanart2?.id;

    const fetchRandomFanart = async () => {
        try {
            const res = await axios.get("http://search.reruru.com:65432/rand");
            setFanart(res.data);
        } catch (error) {
            if (error.response && error.response.status === 500) {
                console.log("Server Error: ", error.response.status);
            } else if (error.code == "ERR_NETWORK") {
                console.log("Network Error: ", error.code);
            } else {
                console.log(error);
            }
        }
    };

    const previewContainer = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
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
            {fanart2 && (
                <Link href={url} passHref isExternal style={linkDiv}>
                    <NextImage
                        style={img}
                        width={475}
                        height={475}
                        src={fanart2?.img_url}
                        alt="Description of the image"
                    />
                    <Text>랜덤 팬아트 게시글 id: {fanart2?.id}</Text>
                </Link>
            )}
            <Button
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
