import React from "react";
import OtherLayout from "./layout/other-layout";
import { Heading, Link } from "@chakra-ui/react";

const AboutPage = () => {
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
                    왁물원 서비스 소개 게시글
                </Heading>
                <ul>
                    <li>
                        <Link
                            color="#01bda1"
                            className="link"
                            href={
                                "https://cafe.naver.com/steamindiegame/9859159"
                            }
                            isExternal
                        >
                            [뉴사이트소개] RE : FIND (이세돌 팬아트 출처 찾기)
                        </Link>
                    </li>
                    {/* <li>
                        <Link
                            color="#01bda1"
                            className="link"
                            href={
                                "https://cafe.naver.com/steamindiegame/9312063"
                            }
                            isExternal
                        >
                            [자유] 이세돌 팬아트 검색기(원본 찾기) 베타버전
                        </Link>
                    </li> */}
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
                <ul>
                    <li>레루루(검색엔진)</li>
                    <li>초코넛밀크티(프론트엔드)</li>
                </ul>
            </div>
        </OtherLayout>
    );
};

export default AboutPage;
