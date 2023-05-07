import React from "react";
import updateLog from "../data/updateLog";
import { Badge, Text, Box, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

import { lightMode, darkMode } from "@/styles/theme";
// import Ticker from "nice-react-ticker";

const NoticeBanner = () => {
    const color = useColorModeValue(lightMode.color, darkMode.color);
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );
    const lastUpdateLog = updateLog[updateLog.length - 1];

    return (
        <Box
            display="grid"
            placeItems="center"
            alignItems="center"
            height="50px"
            gridAutoFlow="column"
            gridGap="10px"
            background={highlightColor}
            color={color}
            width="100%"
            borderColor={highlightColor}
        >
            <Text
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                width="80%"
                textAlign="center"
            >
                <Badge variant="outline" colorScheme="pink" fontSize="1em">
                    업데이트 공지
                </Badge>
                &nbsp;{" "}
                <Link href="/notice" legacyBehavior>
                    <a
                        style={{
                            color,
                            textDecoration: "none",
                            paddingLeft: "0.25rem",
                            paddingRight: "0.25rem",
                        }}
                    >
                        {lastUpdateLog.date} &nbsp;{" "}
                        {lastUpdateLog.content.slice(0, 50)}
                    </a>
                </Link>
            </Text>
        </Box>
    );
};

export default NoticeBanner;
