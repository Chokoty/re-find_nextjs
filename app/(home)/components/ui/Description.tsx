import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

import { darkMode, lightMode } from '@/styles/theme';

export default function Description() {
  // Theme
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  return (
    <Accordion
      mt="1rem"
      className="description"
      allowToggle
      style={{
        color: '#ef5a9a',
      }}
    >
      <AccordionItem>
        <h2>
          <AccordionButton
          // _expanded={{ bg: "#ef5a9a", color: "white" }}
          >
            <Box fontWeight="bold" flex="1" textAlign="center" color={'#F00'}>
              이미지 출처를 찾지 못했습니다.
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Box
            p="40px"
            color="white"
            m="auto"
            mt="4"
            rounded="md"
            shadow="md"
            border="2px"
            borderColor={highlightColor}
            style={{
              color,
            }}
          >
            <Text fontWeight="bold">
              다음과 같은 경우에 검색결과가 나오지 않을 수 있습니다!
            </Text>
            <UnorderedList
              spacing={2}
              // color="#005666"
              color={highlightColor}
            >
              <ListItem>
                <Text fontWeight="bold">
                  원본 팬아트에서 변형을 가한 경우 찾기 어렵습니다. <br />
                  (일부 잘라낸 이미지, 크기 변형, 배경 투명화 등)
                </Text>
              </ListItem>
              <ListItem fontSize="md">
                <Text fontWeight="bold">
                  왁물원에 새로 올라온 팬아트가 반영되기까지 시간이 좀 걸릴 수
                  있습니다.(길면 하루 정도)
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  현재 상단에 명시된 게시판에 올라온 것만 찾을 수 있습니다.
                  (아직 자유 게시판이나 웹툰 게시판에 올라온 것은 찾을 수
                  없습니다.)
                </Text>
              </ListItem>

              <ListItem>
                {' '}
                <Text fontWeight="bold">
                  게시글이 존재하는 이미지여도 못 찾는 모시깽이가 가끔 있습니다.
                </Text>
              </ListItem>
            </UnorderedList>

            <Text fontWeight="bold" alignItems="center">
              구글 이미지 검색을 활용하여 다른 곳에 업로드된 이미지를 찾은 뒤,
              그걸로 검색하면 간혹 찾을 수 있습니다. &nbsp;
              <Link
                fontWeight="bold"
                color={highlightColor}
                href="https://www.google.co.kr/imghp?hl=ko"
                isExternal
              >
                구글 이미지 검색하러가기
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
            <Text mt="20px" fontWeight="bold" alignItems="center">
              만약 위에 해당하지 않는 경우라면 스크린샷과 함께 버그 제보
              해주시면 서비스 개선하는데 큰 도움이 됩니다. &nbsp;
              <Link fontWeight="bold" color={highlightColor}>
                <NextLink href="/support" passHref legacyBehavior>
                  버그제보하기
                </NextLink>
              </Link>
            </Text>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
