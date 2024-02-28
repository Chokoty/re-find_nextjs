'use client';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import ProfileCard2 from '@/components/card/ProfileCard2';
import MoreLayout from '@/components/layout/more-layout';
import developers from '@/data/developers';
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
      <Box
        w="100%"
        p="1rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Heading
          // className="page-title"
          as="h1"
          size="lg"
          m="1rem auto"
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
        <Box
          w="100%"
          p="1rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Text as="h1" fontSize="2xl" m="3rem 0 1rem 0">
            팀 멤버
          </Text>
          <Flex
            w="90%"
            className="developers"
            display="flex"
            flexWrap="wrap"
            gap="20px"
            justifyContent="center"
            alignItems="center"
            margin="0 auto"
            p="0"
          >
            {developers.map(
              (item, index) =>
                item.group === 'member' && (
                  <ProfileCard2
                    key={index}
                    writerURL={item.writerURL}
                    profURL={item.profURL}
                    nickname={item.nickname}
                    board={item.contribute}
                  />
                )
            )}
          </Flex>
        </Box>
        <Box
          w="100%"
          p="1rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Text mt="3rem" as="h1" fontSize="2xl">
            크레딧
          </Text>
          <Flex
            w="90%"
            className="developers"
            display="flex"
            flexWrap="wrap"
            gap="20px"
            justifyContent="center"
            alignItems="center"
            margin="0 auto"
            p="0"
          >
            {developers.map(
              (item, index) =>
                item.group === 'credit' && (
                  <ProfileCard2
                    key={index}
                    writerURL={item.writerURL}
                    profURL={item.profURL}
                    nickname={item.nickname}
                    board={item.contribute}
                  />
                )
            )}
          </Flex>
        </Box>
      </Box>
    </MoreLayout>
  );
};

export default About;
