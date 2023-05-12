import React from "react";
import Image from "next/image";

import { Text, Button, Highlight } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import { lightMode, darkMode } from "@/styles/theme";

const AuthorProfileCard = ({ writerURL, profURL, nickname, board }) => {
    const color = useColorModeValue(lightMode.color, darkMode.color);
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );
    return (
        <Button
            href={writerURL === "" ? "#" : writerURL}
            as="a"
            target="_blank"
            color={"#f5f5f5"}
            boxShadow="md"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="10px"
            width="200px"
            height="200px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap="10px"
            // _hover={{
            //     background: highlightColor,
            //     color: color,
            // }}
        >
            <Image
                src={profURL || ""}
                alt="작가님 프로필"
                width={100}
                height={100}
                mx="auto"
                my={4}
                borderRadius="full"
                style={{ borderRadius: "80%" }}
            />

            <Text
                fontSize="md"
                textAlign="center"
                mb="12px"
                color={highlightColor}
            >
                {nickname || "작가님 이름"}
            </Text>
            <Text fontSize="md" textAlign="center" color={color}>
                {board || ""}
            </Text>
        </Button>
    );
};

export default AuthorProfileCard;
