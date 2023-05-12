import React from "react";
import OtherLayout from "./layout/other-layout";
import AuthorProfileCard from "./AuthorProfileCard";

import { Heading, Link } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { lightMode, darkMode } from "@/styles/theme";
import developers from "../data/developers";

const AboutPage = () => {
    const highlightColor = useColorModeValue(
        lightMode.highlight,
        darkMode.highlight
    );
    return (
        <OtherLayout title="About">
            <div className="about-content">
                <Heading
                    className="page-title"
                    as="h1"
                    size="md"
                    m="0 auto"
                    noOfLines={1}
                >
                    서비스 소개 왁물원 게시글
                </Heading>
                <ul>
                    <li>
                        <Link
                            color={highlightColor}
                            className="link"
                            href={
                                "https://cafe.naver.com/steamindiegame/9859159"
                            }
                            isExternal
                        >
                            [뉴사이트소개] RE : FIND (이세돌 팬아트 출처 찾기)
                            <ExternalLinkIcon mx="2px" />
                        </Link>
                    </li>
                </ul>
                <Heading
                    className="page-title"
                    as="h1"
                    size="md"
                    m="0 auto"
                    noOfLines={1}
                >
                    디벨로퍼
                </Heading>

                <div className="developers">
                    {developers.map((item, index) => (
                        <AuthorProfileCard
                            key={index}
                            writerURL={item.writerURL}
                            profURL={item.profURL}
                            nickname={item.nickname}
                            board={item.contribute}
                        />
                    ))}
                </div>
            </div>
        </OtherLayout>
    );
};

export default AboutPage;
