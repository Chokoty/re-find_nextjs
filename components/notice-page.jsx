import React from "react";
import OtherLayout from "./layout/other-layout";
import {
    Box,
    Heading,
    Text,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "@chakra-ui/react";

// 알고계셨나요?
const TMI = [
    {
        id: 1,
        content: " ㅇㅇ일에 게시글 5만을 돌파하였습니다!",
    },
    {
        id: 2,
        content: " ㅇㅇ일에 게시글 6만을 돌파하였습니다!",
    },
];

const updateLog = [
    {
        id: 1,
        date: "2023.03.16",
        content:
            "이제 금손 일러레의 방에 업로드 된 이미지도 검색할 수 있습니다. 비정기적으로 업데이트 됩니다.",
    },
    {
        id: 2,
        date: "2023.03.20",
        content:
            "AI로 그린 팬아트 검색에 대한 수요가 있는 것 같아서 왁타버스 불법 AI 팬아트도 추가했습니다. 비정기적으로 업데이트 됩니다.",
    },
    {
        id: 3,
        date: "2023.03.24",
        content: "최적화 작업을 진행해서 속도가 약간 더 빨라졌습니다.",
    },
    {
        id: 4,
        date: "2023.04.02",
        content:
            "잘못된 검색 결과가 나오는 경우를 줄였습니다. (3월 24일 이전의 속도로 다시 약간 느려짐)",
    },
    {
        id: 5,
        date: "2023.04.21",
        content:
            "지난번 업데이트 이후로 누락되고 있던 ai 팬아트를 다시 포함시켰습니다.",
    },
    {
        id: 6,
        date: "2023.05.04",
        content: "RE:FIND를 리뉴얼 하였습니다. 많은 이용 부탁드립니다! 킹아!",
    },
];

const NoticePage = () => {
    return (
        <OtherLayout title="Notice">
            <div className="notice-content">
                <Heading size="lg"> 업데이트 내용</Heading>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="80%"
                    margin="0 auto"
                >
                    {updateLog
                        .slice()
                        .reverse()
                        .map((item, index) => (
                            <Card
                                key={index}
                                width="80%"
                                size="sm"
                                m="2"
                                boxShadow="xl"
                            >
                                <CardHeader p="0px">
                                    <Heading
                                        size="xs"
                                        textAlign="left"
                                        p="10px"
                                    >
                                        {item.date}
                                    </Heading>
                                </CardHeader>
                                <CardBody p="10px" textAlign="left">
                                    <Text>{item.content}</Text>
                                </CardBody>
                            </Card>
                        ))}
                </Box>
            </div>
        </OtherLayout>
    );
};

export default NoticePage;
