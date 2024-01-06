import {
  Box,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import { darkMode, lightMode } from '@/styles/theme';

const SearchResult = ({ keyword, result }) => {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const borderBottom = useColorModeValue(
    lightMode.borderBottom,
    darkMode.borderBottom
  );

  return (
    <Box
      m="0 auto"
      maxW="1024px"
      w="100%"
      background={bg2}
      p="1rem 0"
      mb="1rem"
      borderRadius="1rem"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
    >
      <Text
        pl="1rem"
        m="1rem 0"
        as="h3"
        fontSize="1.5rem"
        fontWeight="bold"
        textAlign="left"
        // w="500px"
      >
        &apos;{keyword}&apos; 에 대한 검색 결과입니다. 총 {result.length}
      </Text>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        gap="1rem"
        p="0 1rem"
      >
        <Select w="8rem" placeholder="알잘딱순">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Box>
      <Tabs>
        <TabList>
          <Tab>전체(700)</Tab>
          <Tab>작가(20)</Tab>
          <Tab>작품(680)</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p="0">
            <Box
              w="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {result.map((item) => (
                <Box key={item.id} w="100%" p="0 1.5rem">
                  <Box
                    w="100%"
                    h="100px"
                    p="1rem 0"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Text>{item.title}</Text>
                  </Box>
                  <Box
                    w="100%"
                    borderBottom={`1px solid ${borderBottom}`}
                  ></Box>
                </Box>
              ))}
            </Box>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SearchResult;
