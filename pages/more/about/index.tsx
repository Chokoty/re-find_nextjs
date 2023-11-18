import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Heading, Link, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';

// import AuthorProfileCard from '@/components/AuthorProfileCard';
import ProfileCard from '@/components/cards/ProfileCard';
import OtherLayout from '@/components/layout/other-layout';
import developers from '@/data/developers';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

const About = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen]);

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
              className="link-to-wakzoo"
              href={'https://cafe.naver.com/steamindiegame/9859159'}
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
          크레딧
        </Heading>

        <div className="developers">
          {developers.map((item, index) => (
            <ProfileCard
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

export default About;
