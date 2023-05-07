import React from "react";
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

const data = [
    {
        board: "이세돌 팬아트 게시판",
        link: "https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=344%26search.boardtype=I",
    },
    {
        board: "통합 BEST 팬아트 게시판",
        link: "https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=551%26search.boardtype=I",
    },
    {
        board: "금손 일러레의 방",
        link: "https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=552%26search.boardtype=L",
    },
    {
        board: "왁타버스 불법 AI 팬아트",
        link: "https://cafe.naver.com/steamindiegame?iframe_url=/ArticleList.nhn%3Fsearch.clubid=27842958%26search.menuid=604%26search.boardtype=I",
    },
];

const UpdateCard = ({ update }) => {
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );

    return (
        <Card width="90%">
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
                        {update.id} <ExternalLinkIcon mx="2px" />
                    </Link>
                </Text>
            </CardBody>
        </Card>
    );
};

export default UpdateCard;
