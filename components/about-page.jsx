import React from "react";
import OtherLayout from "./layout/other-layout";
import AuthorProfileCard from "./AuthorProfileCard";

import { Heading, Link } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import { lightMode, darkMode } from "@/styles/theme";

const developers = [
    {
        authorName: "레루루",
        authorUrl:
            "https://cafe.naver.com/ca-fe/cafes/27842958/members/N8dX1e0GCf7CmHWtLoksOA",
        authorProfUrl: "reruru.png",
        contribute: "검색엔진 개발",
    },
    {
        authorName: "초코넛밀크티",
        authorUrl:
            "https://cafe.naver.com/ca-fe/cafes/27842958/members/fZ8VSlTngMBcoxspZWPPDw",
        authorProfUrl:
            "https://blogpfthumb-phinf.pstatic.net/20180310_25/choko0816_15206501648577IUJq_JPEG/IMG_0785.JPG?type=f260_260",
        contribute: "디자인 개발",
    },
];

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
                            authorName={item.authorName}
                            authorUrl={item.authorUrl}
                            authorProfUrl={item.authorProfUrl}
                            contribute={item.contribute}
                        />
                    ))}
                </div>
            </div>
        </OtherLayout>
    );
};

export default AboutPage;
