import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Divider,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PuffLoader } from 'react-spinners';
import { useShallow } from 'zustand/react/shallow';

import NotSearch from '@/public/static/images/original_18.png';
import { useSearchResults } from '@/service/client/search/useSearchService';
import { useSearchFilterStore } from '@/store/searchFilerStore';
import { darkMode, lightMode } from '@/styles/theme';

import SearchCard from './SearchCard';

export default function SearchResult() {
  const borderBottom = useColorModeValue(
    lightMode.borderBottom,
    darkMode.borderBottom
  );

  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '800px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const {
    board,
    category,
    dateType,
    rankType,
    hasSensitiveCase,
    hasTitle,
    hasContent,
    hasAuthor,
    viewCountLimit,
    likeCountLimit,
    commentCountLimit,
  } = useSearchFilterStore(
    useShallow((state) => ({
      board: state.board,
      category: state.category,
      dateType: state.dateType,
      rankType: state.rankType,
      hasSensitiveCase: state.hasSensitiveCase,
      hasTitle: state.hasTitle,
      hasContent: state.hasContent,
      hasAuthor: state.hasAuthor,
      viewCountLimit: state.viewCountLimit,
      likeCountLimit: state.likeCountLimit,
      commentCountLimit: state.commentCountLimit,
    }))
  );

  const {
    fetchNextPage,
    total,
    searchResults,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useSearchResults({
    q,
    board,
    category,
    dateType,
    rankType,
    sensitive: hasSensitiveCase,
    title: hasTitle,
    content: hasContent,
    author: hasAuthor,
    viewCountLimit,
    likeCountLimit,
    commentCountLimit,
  });

  // console.log('searchResult', {
  //   board,
  //   category,
  //   dateType,
  //   rankType,
  //   hasSensitiveCase,
  //   hasTitle,
  //   hasContent,
  //   hasAuthor,
  //   viewCountLimit,
  //   likeCountLimit,
  //   commentCountLimit,
  // });

  // 무한 스크롤
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return (
      <Box
        w="100%"
        mt="1.5rem"
        mb="1.5rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="500px"
        borderBottomRadius="1rem"
      >
        <PuffLoader color="#01BFA2" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert
        status="error"
        w="100%"
        borderRadius="1rem"
        justifyContent="center"
      >
        <AlertIcon />
        <AlertTitle>서버 에러</AlertTitle>
        <AlertDescription>
          현재 서버와의 연결이 불안정합니다! 이용에 불편을 드려 죄송합니다. 빠른
          시일 내에 해결하겠습니다.
        </AlertDescription>
      </Alert>
    );
  }

  if (!searchResults || searchResults.length === 0 || (total ?? 0) === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minH="350px"
      >
        <Image
          src={NotSearch}
          alt="찾을 수 없음을 표시"
          width={202}
          height={172}
          unoptimized
        />
        <Text
          pl="1rem"
          m="1rem 0"
          as="h3"
          fontSize="1rem"
          textAlign="left"
          // w="500px"
        >
          검색 결과가 없습니다. 다른 키워드로 검색해 보세요
        </Text>
      </Box>
    );
  }

  return (
    <Box
      w="100%"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <HStack w="100%" p="1rem" alignItems="baseline" flexWrap="wrap">
        <Heading as="h4" size="md">
          {`'${q}'`}
        </Heading>
        <Heading as="h4" size="md">
          에 대한 검색결과 입니다.
        </Heading>
        <HStack gap="0.3rem">
          <Text color="gray.400">총</Text>
          <Text color="#01BFA2">{total ?? 0}</Text>
          <Text color="gray.400">개의 팬아트가 검색되었습니다.</Text>
        </HStack>
      </HStack>
      <Tabs>
        <TabList>
          <Tab p="0.5rem 1.5rem" color="#01BFA2">
            전체({total ?? 0})
          </Tab>
          {/* <Tab>작가(20)</Tab>
              <Tab>작품(680)</Tab> */}
        </TabList>

        <TabPanels>
          <TabPanel p="0">
            <Box
              w="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p="1.5rem"
            >
              {searchResults.map((item) => (
                // <Box key={item.id} w="100%" p="0 1.5rem">
                //   <Box
                //     w="100%"
                //     h="100px"
                //     p="1rem 0"
                //     display="flex"
                //     flexDirection="column"
                //     justifyContent="flex-start"
                //     alignItems="center"
                //     gap="1rem"
                //   >
                //     <Text>{item.title}</Text>
                //   </Box>
                //   <Box w="100%" borderBottom={`1px solid ${borderBottom}`}>
                //     {item.content}
                //   </Box>
                // </Box>
                <>
                  <SearchCard item={item} searchText={q} key={item.id} />
                  <Divider />
                </>
              ))}
            </Box>
            {isFetchingNextPage ? (
              <Box
                w="100%"
                mt="1.5rem"
                mb="1.5rem"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <PuffLoader color="#01BFA2" />
              </Box>
            ) : (
              // Observer를 위한 div
              <Box ref={ref} w="100%" h="5rem" />
            )}
          </TabPanel>
          {/* <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
