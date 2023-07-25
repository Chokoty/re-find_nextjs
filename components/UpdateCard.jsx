import React, { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    Heading,
    Text,
    Link,
    useColorModeValue,
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

    useEffect(() => {
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
        <Card width="100%">
            <CardBody>
                <Heading as="h1" size="md" textTransform="uppercase" mb="8px">
                    <Link
                        color={highlightColor}
                        className="link"
                        href={url}
                        isExternal
                    >
                        {
                            data.find((item) => item.board === update.board)
                                ?.state
                        }
                        &nbsp;
                        {update.board}
                        <ExternalLinkIcon mx="2px" />
                    </Link>
                </Heading>
                <Text fontSize="1em">{update.date}</Text>
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
            </CardBody>
        </Card>
    );
};

export default UpdateCard;
