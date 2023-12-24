import {
  Box,
  Button,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useEffect } from 'react';

// import HashLoader from 'react-spinners/HashLoader';
import EventFanarts from '@/components/events/EventFanarts';
import SearchLayout from '@/components/layout/search-layout';
import RandomFanart from '@/components/tools/RandomFanart';
import data from '@/data/gallary';
import members from '@/data/members';
import { useStore } from '@/store/store';
import { darkMode, lightMode } from '@/styles/theme';

const Artworks = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  useEffect(() => {
    setIsOpen(false);
    // alert('오픈 예정입니다.');
  }, []);

  return (
    <Box mt="10px" mb="10px" p="1rem" textAlign="center" w="100%">
      <Text as="h2" fontSize="3xl" fontWeight="bold">
        팬아트 갤러리
      </Text>
      <Text fontSize="md">
        왁물원에 올라온 팬아트들을 모아놓은 갤러리입니다.
      </Text>
      <Box
        m="2rem auto"
        w="94%"
        mb="2rem"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        maxW="540px"
        overflowX="scroll" // 세로 스크롤 적용
        gap="0.5rem"
      >
        {members.map((member, index) => (
          <NextLink
            key={index}
            href={`/artworks/${encodeURIComponent(member.value)}`}
          >
            <Button key={index} p="1rem" borderRadius="1rem">
              <Text fontSize="xl" fontWeight="bold" textAlign="left">
                {member.name}
              </Text>
            </Button>
          </NextLink>
        ))}
      </Box>
      <Box
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
      </Box>
    </Box>
  );
};

export default Artworks;
