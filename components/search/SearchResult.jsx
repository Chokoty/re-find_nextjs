import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Link,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

import AuthorProfileCard2 from '@/components/card/AuthorProfileCard2';
import Description from '@/components/common/Description';
import { useResponsiveLink } from '@/hook/useResponsiveLink';
import { useUploadTimeDiff } from '@/hook/useUploadTimeDiff';
import { darkMode, lightMode } from '@/styles/theme';

const data2 = {
  ids: [
    {
      id: '12570067',
      is_deleted: false,
      is_shukkou: false,
    },
  ],
  author: {
    author_nickname: '시한',
    author_url:
      'https://cafe.naver.com/ca-fe/cafes/27842958/members/P-REb7i9cxxaj4zLYMd92Q',
    author_prof_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyMTEyMjZfMjgw/MDAxNjQwNDYwMTEzNjY0.3z-udtYJX4WD-skhXMqGEEH8Lyv8ahgvGQ9dcDFRTWgg.1KlFPIwso90DtrGXL1Bp72B83KCJ3qLu-3bmsYYU2Xsg.PNG/23525263737.png',
  },
  upload_date: '2023.08.21. 14:56',
  title: '세구넴 키딩',
  board: '🎨 이세돌┃팬아트',
  total_counter: '45130',
  today_counter: '104',
};

const SearchResult = ({
  searchTime,
  data,
  ids,
  // isSearchingAuthor,
  // author,
  resetFiles,
}) => {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const bgColor = useColorModeValue(lightMode.bg2, darkMode.bg2);

  const color7 = useColorModeValue(lightMode.color, darkMode.color7);
  const uploadTimeDiff = useUploadTimeDiff(data?.upload_date);
  const article_link = useResponsiveLink('', 'article');

  return (
    <Box
      className="result"
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      {ids?.length === 0 ? (
        <div className="notFound">
          <Description />
        </div>
      ) : (
        <Box
          className="found"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          gap="1rem"
          m="0 auto"
          mb="2rem"
        >
          <Box
            w="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            gap="1rem"
            background={bgColor}
            borderRadius="1rem"
            p="1rem"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              gap="0.5rem"
            >
              <Text fontSize={['lg', 'xl']} textAlign="start">
                {/* {author?.board || ''} */}
                {data?.board || ''}
              </Text>
              <MdArrowForwardIos
                style={{
                  // marginLeft: '0.5rem',
                  fontSize: '0.8rem',
                }}
              />
            </Box>
            <Link
              w="100%"
              fontSize={['xl', '2xl']}
              fontWeight="bold"
              textAlign="start"
              color={highlightColor}
              className="link-to-wakzoo"
              href={article_link + ids[0].id}
              isExternal
            >
              <Text>
                {data?.title}
                <ExternalLinkIcon mx="2px" />
              </Text>
            </Link>
            <AuthorProfileCard2
              writerURL={data.author?.author_url}
              profURL={data.author?.author_prof_url}
              nickname={data.author?.author_nickname}
              uploadTimeDiff={uploadTimeDiff}
            />
            <Text mt="1rem" fontSize="xl">
              관련 게시글 링크
            </Text>
            {ids?.map((item, index) => (
              <Link
                key={index}
                fontSize="xl"
                mb="20px"
                textAlign="center"
                // color="#01bda1"
                color={highlightColor}
                className="link"
                href={article_link + item.id}
                isExternal
              >
                {item.is_deleted === true ? (
                  <Text fontSize="xl" mb="20px" textAlign="center">
                    삭제된 게시글입니다.
                  </Text>
                ) : (
                  <Text fontSize="xl" mb="20px" textAlign="center">
                    {article_link + item.id}
                    <ExternalLinkIcon mx="2px" />
                  </Text>
                )}
                {item.is_shukkou === true && (
                  <Text fontSize="xl" mb="20px" textAlign="center">
                    `(슛코당한 팬아트일 확률이 높습니다.)`
                  </Text>
                )}
              </Link>
            ))}
          </Box>
        </Box>
      )}
      <Text fontSize="xl" m="20px" textAlign="center">
        검색시간: {searchTime / 1000}s
      </Text>
      <Button onClick={resetFiles} size="lg" colorScheme="blue" w={200}>
        다른 이미지 검색
      </Button>
    </Box>
  );
};

export default SearchResult;
