import React, { use, useEffect, useState } from "react";
import NextLink from "next/link";
import axios from "axios";
import { Link, Image } from "@chakra-ui/react";

const RandomFanart = ({ fanart }) => {
    const [isMobile, setIsMobile] = useState(true);

    const [fanart2, setFanart2] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);

    useEffect(() => {
        console.log("RandomFanart");
        console.log(fanart);
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
          fanart?.id +
          "?fromList=true&menuId=344&tc=cafe_article_list"
        : "https://cafe.naver.com/steamindiegame/" + fanart?.id;

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
        flexWrap: "wrap",
        marginTop: 16,
        marginBottom: 30,
    };
    const img = {
        display: "flex",
        height: "100%",
        borderRadius: "1rem",
        objectFit: "cover",
        width: "80%",
    };

    return (
        <div style={previewContainer} className="random-fanart">
            {fanart && (
                <Link href={url} passHref isExternal>
                    <Image
                        style={img}
                        width={475}
                        height={475}
                        src={fanart?.img_url}
                        alt="Description of the image"
                    />
                </Link>
            )}
        </div>
    );
};

export default RandomFanart;
