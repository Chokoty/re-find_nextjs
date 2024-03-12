import {
  Box,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

import { darkMode, lightMode } from '@/styles/theme';
import { result } from './constant/search';
import SearchCard from './SearchCard';

export default function SearchResult() {
  const borderBottom = useColorModeValue(
    lightMode.borderBottom,
    darkMode.borderBottom
  );

  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  return q === '' ? (
    <Box>
      <Text
        pl="1rem"
        m="1rem 0"
        as="h3"
        fontSize="1.5rem"
        fontWeight="bold"
        textAlign="left"
        // w="500px"
      >
        검색 결과가 없습니다. 다른 키워드로 검색해 보세요~
      </Text>
    </Box>
  ) : (
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
                <SearchCard item={item} />
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
  );
}
