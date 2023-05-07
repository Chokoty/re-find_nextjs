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

import TMI from "../data/tmi";
import updateLog from "../data/updateLog";

const NoticePage = () => {
    return (
        <OtherLayout title="Notice">
            <div className="notice-content">
                <Heading size="lg"> 업데이트 내용</Heading>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
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
