import React from "react";
import { Text, Image, Button, Highlight } from "@chakra-ui/react";
import { lightMode, darkMode } from "@/styles/theme";
import { Heading, useColorModeValue } from "@chakra-ui/react";

const AuthorProfileCard = ({
    authorName,
    authorUrl,
    authorProfUrl,
    contribute,
}) => {
    const color = useColorModeValue(lightMode.color, darkMode.color);
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );
    return (
        <Button
            href={authorUrl === "" ? "#" : authorUrl}
            as="a"
            target="_blank"
            color={"#f5f5f5"}
            boxShadow="md"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={1}
            width="240px"
            height="240px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
        >
            <Image
                src={authorProfUrl || ""}
                alt="작가님 프로필"
                width={120}
                height={120}
                mx="auto"
                my={4}
                borderRadius="full"
            />
            <Text
                fontSize="md"
                textAlign="center"
                mb="12px"
                color={highlightColor}
            >
                {authorName || "작가님 이름"}
            </Text>
            <Text fontSize="md" textAlign="center" color={color}>
                {contribute || ""}
            </Text>
        </Button>
    );
};

export default AuthorProfileCard;
