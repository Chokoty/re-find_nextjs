import React from "react";
import { Text, Image, Button } from "@chakra-ui/react";

const AuthorProfileCard = ({ authorName, authorUrl, authorProfUrl }) => {
    return (
        <Button
            href={authorUrl === "" ? "#" : authorUrl}
            color={"#f5f5f5"}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={1}
            style={{
                width: "240px",
                height: "240px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
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
            <Text fontSize="md" textAlign="center" my={2}>
                {authorName || "작가님 이름"}
            </Text>
        </Button>
    );
};

export default AuthorProfileCard;
