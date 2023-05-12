import React from "react";
import { Text, Box, Button, Image } from "@chakra-ui/react";

import { useColorModeValue } from "@chakra-ui/react";
import { BsChatDots } from "react-icons/bs";

import { lightMode, darkMode } from "@/styles/theme";
import OtherLayout from "./layout/other-layout";
// import AuthorProfileCard from "./AuthorProfileCard";

// const data = [
//     {
//         imgUrl: "bugFind.png",
//         imgAlt: "버그 아이콘",
//         title: "버그 제보",
//         url: "https://docs.google.com/forms/d/e/1FAIpQLScK_i8O9QnhfZswreRX7VYROWzG3Kte6bVxjf28VSK0Fcu23g/viewform",
//     },
//     {
//         imgUrl: "",
//         imgAlt: "",
//         title: "기타 문의",
//         url: "https://docs.google.com/forms/d/e/1FAIpQLSf0WGZnnlZahRLoinXe1n0GmPCdryKXEFlPznqyLrsjBKpnZw/viewform",
//     },
// ];
const SupportPage = () => {
    const color = useColorModeValue(lightMode.color, darkMode.color);
    return (
        <OtherLayout title="Support">
            <div className="toLink">
                <Box className="area">
                    <Button
                        href="https://docs.google.com/forms/d/e/1FAIpQLScK_i8O9QnhfZswreRX7VYROWzG3Kte6bVxjf28VSK0Fcu23g/viewform"
                        as="a"
                        target="_blank"
                        boxShadow="md"
                        borderWidth="1px"
                        borderRadius="lg"
                        width="200px"
                        height="200px"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                    >
                        <Image
                            src="bugFind.png"
                            alt="버그 아이콘"
                            width={120}
                            height={120}
                            mx="auto"
                            my={4}
                            filter={color === "#1B1642" ? "" : "invert(1)"}
                        />
                    </Button>
                    <Text fontSize="2xl" mt="10px">
                        버그 제보
                    </Text>
                </Box>
                <Box className="area">
                    <Button
                        href="https://docs.google.com/forms/d/e/1FAIpQLSf0WGZnnlZahRLoinXe1n0GmPCdryKXEFlPznqyLrsjBKpnZw/viewform"
                        as="a"
                        target="_blank"
                        boxShadow="md"
                        borderWidth="1px"
                        borderRadius="lg"
                        width="200px"
                        height="200px"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                    >
                        <BsChatDots size="120px" />
                    </Button>
                    <Text fontSize="2xl" mt="10px">
                        기타 문의
                    </Text>
                </Box>
            </div>
        </OtherLayout>
    );
};

export default SupportPage;
