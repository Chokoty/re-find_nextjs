'use client';

import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect } from 'react';
import { PiGiftBold } from 'react-icons/pi';

import RandomFanart from '@/components/common/RandomFanart';
import EventFanarts from '@/components/event/EventFanarts';
import SearchLayout from '@/components/layout/search-layout';
import { useDrawerStore } from '@/store/drawerStore';
import { darkMode, lightMode } from '@/styles/theme';

export default function Events() {
  const setIsOpen = useDrawerStore((state) => state.setIsOpen);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <SearchLayout title="이벤트">
      {/* <MySnowfall /> */}
      <Box
        // className="random-fanart"
        m="0 auto"
        mb="1rem"
        p="1rem 0"
        borderRadius="1rem"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        background={bg2}
        w="100%"
        maxW="540px"
        minH="120px"
      >
        <Box
          display="flex"
          gap="1rem"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            textAlign="left"
            w="100%"
            p="0 1rem"
          >
            왁티홀의 문 체험하기
          </Text>
          <Button
            // background="black"
            colorScheme="purple"
            // color="white"
            w="60%"
            // h="40px"
            p="0.5rem"
            borderRadius="1rem"
            // mb="2rem"
            _hover={{ background: '#ddd', color: 'black' }}
          >
            {' '}
            <PiGiftBold
              style={{
                width: '1.5rem',
                height: '1.5rem',
                marginRight: '0.5rem',
              }}
            />
            <NextLink href="/events/WaktyHallDoor">
              기회는 2번 여러분의 선택은?
            </NextLink>
          </Button>
        </Box>
      </Box>
      <RandomFanart />
      <EventFanarts initialFanart={null} showCnt={0} width={'100%'} />
    </SearchLayout>
  );
}
