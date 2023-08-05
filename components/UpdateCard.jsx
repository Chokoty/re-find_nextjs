import React, { useState, useEffect } from "react";
import NextImage from "next/image";

import {
    Card,
    CardBody,
    Heading,
    Text,
    Link,
    Image,
    Flex,
    Square,
    useColorModeValue,
    Center,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { lightMode, darkMode } from "@/styles/theme";
import data from "../data/board.js";

const UpdateCard = ({ update }) => {
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );

    const [isMobile, setIsMobile] = useState(true);
    const [uploadTime, setUploadTime] = useState("");

    useEffect(() => {
        // console.log(update);

        const now = new Date();
        const uploadedDate = new Date(update.date);
        const timeDifference = now.getTime() - uploadedDate.getTime();

        const secondsDifference = Math.floor(timeDifference / 1000);
        const minutesDifference = Math.floor(secondsDifference / 60);
        const hoursDifference = Math.floor(minutesDifference / 60);
        const daysDifference = Math.floor(hoursDifference / 24);
        const monthsDifference = Math.floor(daysDifference / 30);
        const yearsDifference = Math.floor(daysDifference / 365);

        let uploadText = "";

        if (monthsDifference >= 1) {
            uploadText = `${monthsDifference}달 전`;
        } else if (daysDifference >= 1) {
            uploadText = `${daysDifference}일 전 `;
        } else if (hoursDifference >= 1) {
            uploadText = `${hoursDifference}시간 전 `;
        } else if (minutesDifference >= 1) {
            uploadText = `${minutesDifference}분 전 `;
        }
        // console.log(uploadText);
        setUploadTime(uploadText);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const url = isMobile
        ? data.find((item) => item.board === update.board)?.mlink
        : data.find((item) => item.board === update.board)?.link;

    return (
        <Card
            width="100%"
            style={{
                height: "100px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                placeItems: "center",
                paddingLeft: "10px",
            }}
        >
            <NextImage
                unoptimized
                width={100}
                height={100}
                style={{
                    borderRadius: "0.5rem",
                    objectFit: "cover",
                    width: "80px",
                    height: "80px",
                }}
                src={
                    data.find((item) => item.board === update.board)?.state ===
                    "-관-"
                        ? "/close.jpeg"
                        : update.info.img_url
                }
                alt={update.info.title}
                // fallbackSrc="https://via.placeholder.com/80"
            />

            <CardBody>
                <Heading as="h1" size="md" textTransform="uppercase" mb="8px">
                    <Link
                        color={highlightColor}
                        className="link"
                        href={url}
                        isExternal
                    >
                        {/* {
                            data.find((item) => item.board === update.board)
                                ?.state
                        } */}

                        {update.board}
                        <ExternalLinkIcon mx="2px" />
                    </Link>
                </Heading>
                <Text fontSize="1em">
                    게시글 id:
                    <Link
                        color={highlightColor}
                        className="link"
                        href={
                            "https://cafe.naver.com/steamindiegame/" + update.id
                        }
                        isExternal
                    >
                        {update.id}
                        <ExternalLinkIcon mx="2px" />
                    </Link>
                </Text>
                <Text fontSize="1em">{uploadTime}</Text>
            </CardBody>
        </Card>
    );
};

export default UpdateCard;
