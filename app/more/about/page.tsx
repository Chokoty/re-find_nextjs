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

import DeveloperProfileCard from '@/app/more/components/ui/Card/DeveloperProfileCard';
import MoreLayout from '@/app/more/components/ui/Layout/MoreLayout';
import { DEVELOPERS } from '@/app/more/lib/const';
import { useResponsive } from '@/hooks/useResponsive';
import { darkMode, lightMode } from '@/styles/theme';

export default function About() {
  const isMobile = useResponsive();

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  const isMemberCountOdd =
    DEVELOPERS.filter((item) => item.group === 'member').length % 2 !== 0;
  const isCreditCountOdd =
    DEVELOPERS.filter((item) => item.group === 'credit').length % 2 !== 0;

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
            {DEVELOPERS.map(
              (item, index) =>
                item.group === 'member' && (
                  <DeveloperProfileCard
                    key={index}
                    writerURL={item.writerURL}
                    profURL={item.profURL}
                    nickname={item.nickname}
                    board={item.contribute}
                  />
                )
            )}
            {!isMobile && isMemberCountOdd && <Box w="346px" h="120px"></Box>}
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
            {DEVELOPERS.map(
              (item, index) =>
                item.group === 'credit' && (
                  <DeveloperProfileCard
                    key={index}
                    writerURL={item.writerURL}
                    profURL={item.profURL}
                    nickname={item.nickname}
                    board={item.contribute}
                  />
                )
            )}
            {!isMobile && isCreditCountOdd && <Box w="346px" h="120px"></Box>}
          </Flex>
        </Box>
      </Box>
    </MoreLayout>
  );
}
