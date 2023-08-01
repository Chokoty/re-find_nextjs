import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import axios from "axios";
import { Link, Image } from "@chakra-ui/react";

const RandomFanart = () => {
    const [fanart, setFanart] = useState(null);

    useEffect(() => {
        // fetchRandomFanart();
    }, []);

    const fetchRandomFanart = async () => {
        try {
            const res = await axios.get("http://search.reruru.com:65432/rand");
            console.log(res.data);
            setFanart(res.data);
        } catch (error) {
            if (error.response && error.response.status === 500) {
                console.log("Server Error: ", error.response.status);
                toast({
                    title: `현재 서버와 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.`,
                    status: `error`,
                    isClosable: true,
                });
            } else if (error.code == "ERR_NETWORK") {
                console.log("Network Error: ", error.code);
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
    };

    return (
        <div style={previewContainer} className="random-fanart">
            {fanart && (
                <NextLink
                    href={
                        "https://cafe.naver.com/steamindiegame/11327255" +
                        fanart?.id
                    }
                    passHref
                >
                    <Image
                        style={img}
                        width={475}
                        height={475}
                        src={fanart?.img_url}
                        alt="Description of the image"
                    />
                </NextLink>
            )}
        </div>
    );
};

export default RandomFanart;
