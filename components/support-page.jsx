import React from "react";
import { Text, Box, Button, Image } from "@chakra-ui/react";
import OtherLayout from "./layout/other-layout";

import { lightMode, darkMode } from "@/styles/theme";
import { useColorModeValue } from "@chakra-ui/react";
import { BsChatDots } from "react-icons/bs";
const SupportPage = () => {
    const color = useColorModeValue(lightMode.color, darkMode.color);
    return (
        <OtherLayout title="Support">
            <Box
                display="flex"
                justifyContent="space-around"
                gap="20px"
                height="360px"
                mt="50px"
            >
                <Box>
                    <Button
                        href="#"
                        as="a"
                        target="_blank"
                        boxShadow="md"
                        borderWidth="1px"
                        borderRadius="lg"
                        width="240px"
                        height="240px"
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
                <Box>
                    <Button
                        href="#"
                        as="a"
                        target="_blank"
                        boxShadow="md"
                        borderWidth="1px"
                        borderRadius="lg"
                        width="240px"
                        height="240px"
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
            </Box>
        </OtherLayout>
    );
};

export default SupportPage;
