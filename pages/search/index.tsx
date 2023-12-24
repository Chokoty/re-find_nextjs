import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import SearchLayout from '@/components/layout/search-layout';
import members from '@/data/members';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

const Search = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [query, setQuery] = useState('');

  const bg = useColorModeValue(lightMode.bg, darkMode.bg);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const bg3 = useColorModeValue(lightMode.bg3, darkMode.bg3);
  const color = useColorModeValue(lightMode.color, darkMode.color);
  const highlight = useColorModeValue(lightMode.highlight, darkMode.badge);

  // useEffect(() => {
  //   alert('준비중입니다!');
  // }, []);

  const handleSearch = () => {
    if (query) {
      // router.push(`/artists/${query}`);
    }
    // alert('준비중입니다!');
  };
  const handleKeyPress2 = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchNickname = () => {
    if (nickname) {
      router.push(`/artists/${nickname}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchNickname();
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <Box mt="10px" mb="10px" p="1rem" textAlign="center" w="100%">
      <Box
        m="0 auto"
        maxW="1024px"
        w="100%"
        background={bg2}
        p="1rem"
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
          'ㅇㅇ' 에 대한 검색 결과입니다. 총 400
        </Text>
        <Accordion allowMultiple w="100%">
          <AccordionItem
            border="none"
            _focus={{ boxShadow: 'none' }}
            _hover={{ boxShadow: 'none' }}
          >
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <Box as="span" flex="1" textAlign="left">
                  멤버 별
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap="0.5rem"
              >
                {members.map((member) => (
                  <Button key={member.id} variant="outline" borderRadius="2rem">
                    {member.name}
                  </Button>
                ))}
              </Box>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem
            border="none"
            _focus={{ boxShadow: 'none' }}
            _hover={{ boxShadow: 'none' }}
          >
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <Box as="span" flex="1" textAlign="left">
                  <Text>전체 기간</Text>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem
            border="none"
            _focus={{ boxShadow: 'none' }}
            _hover={{ boxShadow: 'none' }}
          >
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <Box as="span" flex="1" textAlign="left">
                  <Text>고급필터</Text>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box
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
          <Input
            placeholder="왁물원 닉네임"
            maxW="400px"
            size="md"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button colorScheme="blue" size="md" onClick={handleSearchNickname}>
            Search
          </Button>
        </Box>
      </Box>
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
    // <SearchLayout title="검색">
    //
    // </SearchLayout>
  );
};

export default Search;
