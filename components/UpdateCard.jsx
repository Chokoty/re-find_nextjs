import React, { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    Heading,
    Text,
    Link,
    useColorModeValue,
} from "@chakra-ui/react";
import { lightMode, darkMode } from "@/styles/theme";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import data from "../data/board.js";

const UpdateCard = ({ update }) => {
    const [author, setAuthor] = useState(null);
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );

    return (
        <Card width="100%">
            <CardBody>
                <Heading as="h1" size="md" textTransform="uppercase" mb="8px">
                    <Link
                        color={highlightColor}
                        className="link"
                        href={
                            data.find((item) => item.board === update.board)
                                ?.link
                        }
                        isExternal
                    >
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
