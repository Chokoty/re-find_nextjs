import { Box, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import SearchLayout from '@/components/layout/search-layout';
import TotalSearchResult from '@/components/search/TotalSearchResult';
import members from '@/data/members';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

const data = [
  {
    id: '14345266',
    title: '뉴진스 민지 왁두',
    author: '비킴 사랑한다',
    content: '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n​\n\n\n\n\n\n',
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
      '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n​\n​\n​\n+) 어깨 뽀샵 없는 원본 버전 ↓↓\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n​\n\n\n\n\n\n',
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

const Search = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  const router = useRouter();

  const [keyword, setKeyword] = useState('ㄱㅇㅇ');
  const [result, setResult] = useState(data);

  const [nickname, setNickname] = useState('');
  const [query, setQuery] = useState('');

  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const highlight = useColorModeValue(lightMode.highlight, darkMode.badge);

  const [sliderValue, setSliderValue] = useState([10, 30]);
  const [showTooltip, setShowTooltip] = useState([false, false]);

  const searchByKeyword = useCallback(async () => {
    try {
      const response = await axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/search_txt?query=${keyword}`
        )
        .then((res) => res.data);
      // setProfile(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
      // 404 페이지로 이동
      router.push('/404');
    }
  }, [keyword]);

  const handleSearch = () => {
    searchByKeyword();
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // const handleSearchNickname = () => {
  //   if (nickname) {
  //     router.push(`/artists/${nickname}`);
  //   }
  // };

  // const handleKeyPress = (event) => {
  //   if (event.key === 'Enter') {
  //     handleSearchNickname();
  //   }
  // };

  useEffect(() => {
    if (router.query.keyword) {
      const keywordFromQuery = router.query.keyword;
      if (typeof keywordFromQuery === 'string') {
        setKeyword(keywordFromQuery);
      }
      // You can also perform any actions needed with this keyword
    }
  }, [router.query]);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <Box mb="10px" p="1rem" textAlign="center" w="100%">
      <TotalSearchResult
        keyword={keyword}
        result={result}
        handleSearch={handleSearch}
      />
      {/* <Box
        m="0 auto"
        maxW="1024px"
        w="100%"
        background={bg2}
        p="1rem"
        mb="1rem"
        borderRadius="1rem"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
          mb="4rem"
        >
          <Text as="h1" size="2xl">
            검색
          </Text>
          <Input
            placeholder="작가 닉네임, 작품 제목, 키워드 "
            maxW="400px"
            size="md"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button colorScheme="blue" size="md" onClick={handleSearchNickname}>
            Search
          </Button>
          <SearchOptions />
        </Box>
      </Box> */}

      {/* <Box
        m="0 auto"
        mt="3rem"
        w="94%"
        mb="2rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SimpleGrid
          w={['100%', '90%']}
          minChildWidth={['150px', '200px']} // 모바일에서는 150px, 그 외에서는 200px
          spacing={['0.5rem', '0.75rem']}
          justifyContent="center"
          alignItems="center"
          placeItems="center"
          m="0 auto"
        >
          {data
            .slice()
            .reverse()
            .map((item, index) => (
              <NextLink
                key={index}
                href={`/artworks/${encodeURIComponent(item.key)}`}
              >
                <Box
                  key={index}
                  p="1rem"
                  m={['0', '0.5rem']}
                  mb=" 1rem"
                  w={['158px', '200px']}
                  h={['158px', '200px']}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  background={bg2}
                  borderRadius="1rem"
                  boxShadow="md"
                >
                  <Text fontSize="xl" fontWeight="bold" textAlign="left">
                    {item.title}
                  </Text>
                </Box>
              </NextLink>
            ))}
        </SimpleGrid>
      </Box> */}
    </Box>
  );
};

export default Search;
