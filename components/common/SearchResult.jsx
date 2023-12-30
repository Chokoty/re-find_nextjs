import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Button,
  Link,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import AuthorProfileCard from '@/components/card/AuthorProfileCard';
import Description from '@/components/common/Description';
import { useResponsiveLink } from '@/hook/useResponsiveLink';
import { useUploadTimeDiff } from '@/hook/useUploadTimeDiff';
import { darkMode, lightMode } from '@/styles/theme';

const SearchResult = ({
  searchTime,
  data,
  ids,
  isSearchingAuthor,
  author,
  resetFiles,
}) => {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const uploadTimeDiff = useUploadTimeDiff(data?.upload_date);
  const article_link = useResponsiveLink('', 'article');

  return (
    <div className="result">
      <Button onClick={resetFiles} size="lg" colorScheme="blue" w={200}>
        다른 이미지 검색
      </Button>
      <Text fontSize="xl" m="20px" textAlign="center">
        검색시간: {searchTime / 1000}s
      </Text>
      {ids?.length === 0 && !isSearchingAuthor ? (
        <div className="notFound">
          <Description />
        </div>
      ) : (
        <div className="found">
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

          <Skeleton isLoaded={!isSearchingAuthor} mt="20px" mb="20px">
            <Text fontSize="xl" mb="20px" textAlign="center">
              {/* {author?.board || ''} */}
              {data?.board || ''}
            </Text>
            <Link
              fontSize="xl"
              mb="20px"
              textAlign="center"
              // color="#01bda1"
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
          </Skeleton>
          <Skeleton isLoaded={!isSearchingAuthor}>
            <AuthorProfileCard
              writerURL={author?.author_url}
              profURL={author?.author_prof_url}
              nickname={author?.author_nickname}
              board={uploadTimeDiff}
            />
          </Skeleton>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
