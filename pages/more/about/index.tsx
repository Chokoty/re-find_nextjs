import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Flex, Heading, Link, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import ProfileCard2 from '@/components/cards/ProfileCard2';
import MoreLayout from '@/components/layout/more-layout';
import BackButton from '@/components/tools/BackButton';
import developers from '@/data/developers';
// import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

const About = () => {
  // const setIsOpen = useStore((state) => state.setIsOpen);

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  // useEffect(() => {
  //   setIsOpen(false);
  // }, [setIsOpen]);

  return (
    <MoreLayout title="About">
      <div className="about-content">
        <Heading
          className="page-title"
          as="h1"
          size="md"
          m="3rem auto"
          noOfLines={1}
        >
          서비스 소개 왁물원 게시글
        </Heading>
        <ul
          style={{
            listStyle: 'none',
          }}
        >
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
          m="3rem auto"
          mt="6rem"
          noOfLines={1}
        >
          크레딧
        </Heading>

        <Flex
          className="developers"
          display="flex"
          flexWrap="wrap"
          gap="20px"
          justifyContent="center"
          alignItems="center"
          margin="0 auto"
          p="0"
        >
          {developers.map((item, index) => (
            <ProfileCard2
              key={index}
              writerURL={item.writerURL}
              profURL={item.profURL}
              nickname={item.nickname}
              board={item.contribute}
            />
          ))}
        </Flex>
      </div>
    </MoreLayout>
  );
};

export default About;
