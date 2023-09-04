import React, { useEffect } from 'react';
import {
  Text,
  Skeleton,
  Link,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { lightMode, darkMode } from '@/styles/theme';

import AuthorProfileCard from '../components/AuthorProfileCard';
import Description from '../components/Description';
import { useUploadTimeDiff } from '../hook/useUploadTimeDiff';
import { useResponsiveLink } from '../hook/useResponsiveLink';

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
      {data === null ? (
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
              href={article_link + item}
              isExternal
            >
              게시글id: {item}
              <ExternalLinkIcon mx="2px" />
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
              className="link"
              href={article_link + data?.id?.[0]}
              isExternal
            >
              {/* {author?.title} */}
              {data?.title}
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Skeleton>
          <Skeleton isLoaded={!isSearchingAuthor}>
            <AuthorProfileCard
              profURL={author?.author_prof_url}
              nickname={author?.author_nickname}
              board={uploadTimeDiff}
              writerURL={author?.author_url}
              // writerURL={'/artists/' + author?.author_nickname}
            />
          </Skeleton>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
