import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Link,
    Box,
    useColorModeValue,
    Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { lightMode, darkMode } from "@/styles/theme";

const date = [
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

const UpdateBoard = ({ data }) => {
    const color = useColorModeValue(lightMode.color, darkMode.color);
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );
    return (
        <Box
            width="90%"
            p="20px"
            color="white"
            m="auto"
            mt="40px"
            rounded="md"
            shadow="md"
            border="2px"
            borderColor={highlightColor}
            style={{
                color: color,
            }}
        >
            <TableContainer>
                <Table variant="simple">
                    <TableCaption>
                        <Text whiteSpace="normal">
                            현재 명시된 게시판에 올라온 것만 찾을 수 있습니다.
                        </Text>
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th textAlign="center">게시판</Th>
                            {/* <Th isNumeric>Last Update</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {date.map((item, key) => (
                            <Tr key={key}>
                                <Td textAlign="center">
                                    <Link
                                        color={highlightColor}
                                        className="link"
                                        href={item.link}
                                        isExternal
                                    >
                                        {item.board}
                                        <ExternalLinkIcon mx="2px" />
                                    </Link>
                                </Td>
                                {/* <Td isNumeric>{last_update_info[0].date}</Td> */}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UpdateBoard;
