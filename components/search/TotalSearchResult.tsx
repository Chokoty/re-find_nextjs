import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { CgOptions } from 'react-icons/cg';

import SearchBar from '@/components/search/SearchBar';
import { darkMode, lightMode } from '@/styles/theme';
import MainOptions from './MainOptions';

type Prop = {
  result: {
    id: string;
    title: string;
    author: string;
    content: string;
    img_url: string;
    img_url_list: string[];
    view: number;
    like: number;
    comment: number;
  }[];
};

const data = [
  {
    id: '14345266',
    title: '뉴진스 민지 왁두',
    author: '비킴 사랑한다',
    content: '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAxMDVfMjk4/MDAxNzA0NDM0NjEyMzk4.n-ptViOYIuUmSkq1ebi10Twhfdg4LbfObDtjy6j46H4g.h7KMDKCwFzjqt85ca-S7hVP_VjGurCXZXRvwAScSSLYg.PNG/%EB%AC%B4%EC%A0%9C261_20240104175442.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAxMDVfMjk4/MDAxNzA0NDM0NjEyMzk4.n-ptViOYIuUmSkq1ebi10Twhfdg4LbfObDtjy6j46H4g.h7KMDKCwFzjqt85ca-S7hVP_VjGurCXZXRvwAScSSLYg.PNG/%EB%AC%B4%EC%A0%9C261_20240104175442.png?type=w800',
    ],
    view: 0,
    like: 0,
    comment: 0,
  },
  {
    id: '14345260',
    title: '미소년 왁두',
    author: '비킴 사랑한다',
    content:
      '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n의도한건 아닌데 아쿠아 닮은듯\n\n\n\n\n\n',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAxMDVfMjMg/MDAxNzA0NDM0NTUzOTI1.9G944UOwSIyXEbjlUrITn6O21FnNh0TMxNfjK1mUtTEg.A_g_RFY0X2XeS9_i2DqqLkkgdTVYgJZLq1pjS8oQHVkg.PNG/%EB%AC%B4%EC%A0%9C266_20240105084917.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAxMDVfMjMg/MDAxNzA0NDM0NTUzOTI1.9G944UOwSIyXEbjlUrITn6O21FnNh0TMxNfjK1mUtTEg.A_g_RFY0X2XeS9_i2DqqLkkgdTVYgJZLq1pjS8oQHVkg.PNG/%EB%AC%B4%EC%A0%9C266_20240105084917.png?type=w800',
    ],
    view: 177,
    like: 7,
    comment: 4,
  },
  {
    id: '14336115',
    title: '(재업) 왁해인두',
    author: '앤트로피',
    content: '\n\n\n\n\n\n\n\n\n미리 침바\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAxMDRfMTg2/MDAxNzA0MzU2NjU0MDMx.laQxGYe87DxByiMkigir0WT9NxBuAFTuH8MB3ui7TiQg.aBjkYcWVW0q5EojS8opq7vigaokfezUecWNPbXqDQlUg.PNG/1704356548.7685552.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAxMDRfMTg2/MDAxNzA0MzU2NjU0MDMx.laQxGYe87DxByiMkigir0WT9NxBuAFTuH8MB3ui7TiQg.aBjkYcWVW0q5EojS8opq7vigaokfezUecWNPbXqDQlUg.PNG/1704356548.7685552.png?type=w800',
    ],
    view: 148,
    like: 1,
    comment: 2,
  },
  {
    id: '14335893',
    title: '페리도두 맨투맨 모델이 된 우왁굳',
    author: '진코2',
    content:
      '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n+) 어깨 뽀샵 없는 원본 버전 ↓↓\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAxMDRfMjMy/MDAxNzA0MzU0NDE4MjIx.OMg1HkGKv6t-4z50RlNZIqyQ3HgnYM9-3KI5LsT-k5kg.NQSAsWcCwk8hLBcJnTr3VboADjM0L8t0_vginzN3sqgg.PNG/%ED%8E%98%EB%A6%AC%EB%8F%84%EB%93%9C_%EC%9E%85%EC%9D%80_%EC%99%81%EA%B5%B3.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAxMDRfMjMy/MDAxNzA0MzU0NDE4MjIx.OMg1HkGKv6t-4z50RlNZIqyQ3HgnYM9-3KI5LsT-k5kg.NQSAsWcCwk8hLBcJnTr3VboADjM0L8t0_vginzN3sqgg.PNG/%ED%8E%98%EB%A6%AC%EB%8F%84%EB%93%9C_%EC%9E%85%EC%9D%80_%EC%99%81%EA%B5%B3.png?type=w800',
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAxMDRfMTQ4/MDAxNzA0MzU0OTg0ODEy.0iBlyuzmo_ogcg3OCG8YnvdiOQUhI32dZH1cThyX9LUg.dMgiATRF163zA7UQiKK2mjMiwdRoKEUfqFRD82n54mIg.PNG/%EB%BD%80%EC%83%B5_x2.png?type=w800',
    ],
    view: 234,
    like: 9,
    comment: 12,
  },
  {
    id: '14331793',
    title: '햄두',
    author: '베벰배',
    content:
      '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n............\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
    img_url:
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAxMDRfMTg3/MDAxNzA0MzA2NTQzOTk3.aQM7hQjiXu2uOEYvur9oyO4gnuF5yI6365Ht4zvDvFcg.WT90Do6hZV5h3y6FPz5C6CYvKkjyMc-Mk5NA3-cHgIUg.PNG/image.png?type=w800',
    img_url_list: [
      'https://cafeptthumb-phinf.pstatic.net/MjAyNDAxMDRfMTg3/MDAxNzA0MzA2NTQzOTk3.aQM7hQjiXu2uOEYvur9oyO4gnuF5yI6365Ht4zvDvFcg.WT90Do6hZV5h3y6FPz5C6CYvKkjyMc-Mk5NA3-cHgIUg.PNG/image.png?type=w800',
    ],
    view: 164,
    like: 21,
    comment: 8,
  },
];

export default function SearchResult({ result }: Prop) {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const borderBottom = useColorModeValue(
    lightMode.borderBottom,
    darkMode.borderBottom
  );

  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? 'ㄱㅇㅇ';

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
      <SearchBar
        isSearchPage={true}
        // setResult={setResult}
        // handleSearch2={handleSearch}
      />
      {keyword === '' && (
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
      )}
      {keyword !== '' && (
        <Box>
          <Accordion allowMultiple>
            <AccordionItem
              border="none"
              _focus={{ boxShadow: 'none' }}
              _hover={{ boxShadow: 'none' }}
            >
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      display="flex"
                      flexDir={['column', 'row', 'row']}
                      justifyContent="space-between"
                      alignItems={['flex-end', 'center', 'center']}
                      p="0 1rem"
                    >
                      <Text
                        m="1rem 0"
                        as="h3"
                        fontSize="1.5rem"
                        fontWeight="bold"
                        textAlign="left"
                        // w="500px"
                      >
                        {keyword}에 대한 검색 결과입니다. 총{result.length}개
                      </Text>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        gap="0.5rem"
                        p="1rem 0"
                        _hover={{
                          backgroundColor: bg2,
                          borderColor: '#01BFA2',
                          color: '#01BFA2',
                        }}
                      >
                        {isExpanded ? (
                          <>
                            <Text>필터 접기</Text>
                            <AccordionIcon />
                          </>
                        ) : (
                          <>
                            <Text>필터 더보기</Text>
                            <CgOptions fontSize="1rem" />
                          </>
                        )}
                      </Box>
                    </AccordionButton>
                  </h2>
                  <MainOptions />
                </>
              )}
            </AccordionItem>
          </Accordion>

          <Tabs>
            <TabList>
              <Tab>전체({data.length})</Tab>
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
                >
                  {data.map((item) => (
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
      )}
    </Box>
  );
}
