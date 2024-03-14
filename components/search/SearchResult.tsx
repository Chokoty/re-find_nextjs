import {
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
import { useShallow } from 'zustand/react/shallow';

import NotSearch from '@/public/static/images/original_18.png';
import { useSearchFilterStore } from '@/store/searchFilerStore';
import { darkMode, lightMode } from '@/styles/theme';

import { result } from './constant/search';
import SearchCard from './SearchCard';

export default function SearchResult() {
  const total = 10;
  const borderBottom = useColorModeValue(
    lightMode.borderBottom,
    darkMode.borderBottom
  );

  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

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

  console.log('searchResult', {
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
  });

  return q === '' ? (
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
        width={222}
        height={192}
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
  ) : (
    <Box
      w="100%"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      {total > 0 && (
        <HStack w="100%" p="1rem" alignItems="baseline" flexWrap="wrap">
          <Heading as="h4" size="md">
            {`'${q}'`}
          </Heading>
          <Heading as="h4" size="md">
            에 대한 검색결과 입니다.
          </Heading>
          <HStack gap="0.3rem">
            <Text color="gray.400">총</Text>
            <Text color="#01BFA2">{total}</Text>
            <Text color="gray.400">개의 팬아트가 검색되었습니다.</Text>
          </HStack>
        </HStack>
      )}
      <Tabs>
        <TabList>
          <Tab p="0.5rem 1.5rem" color="#01BFA2">
            전체({result.length})
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
              {result.map((item) => (
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
                  <SearchCard item={item} key={item.id} />
                  <Divider />
                </>
              ))}
            </Box>
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
