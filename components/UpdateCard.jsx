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
            setAuthor(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAuthorProfile(update.id);
    }, []);

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
                        {author?.title} <ExternalLinkIcon mx="2px" />
                    </Link>
                </Text>
            </CardBody>
        </Card>
    );
};

export default UpdateCard;
