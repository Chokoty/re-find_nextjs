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
            className="notice_banner"
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
            <Box
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                width="80%"
                textAlign="center"
            >
                <Badge
                    variant="outline"
                    colorScheme="pink"
                    fontSize="1em"
                    mr="5px"
                >
                    업데이트 공지
                </Badge>
                &nbsp;
                <Link href="/notice" className="notice_banner_link">
                    {lastUpdateLog.date +
                        " - " +
                        lastUpdateLog.content.slice(0, 50)}
                </Link>
            </Box>
        </Box>
    );
};

export default NoticeBanner;
