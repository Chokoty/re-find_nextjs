import React from "react";
import Link from "next/link";

import { Heading, useColorModeValue } from "@chakra-ui/react";

import { lightMode, darkMode } from "@/styles/theme";

const Title = () => {
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );

    return (
        <div className="title">
            <Link href="/" className="content">
                <Heading className="title-main">
                    <span style={{ color: highlightColor }}>RE:</span>
                    FIND
                </Heading>
            </Link>
        </div>
    );
};

export default Title;
