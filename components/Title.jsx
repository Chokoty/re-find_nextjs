import React from "react";
import Link from "next/link";
import { lightMode, darkMode } from "@/styles/theme";
import { Heading, useColorModeValue } from "@chakra-ui/react";

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
