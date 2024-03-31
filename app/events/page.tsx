'use client';

import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { BsCalendarEventFill, BsDoorOpenFill } from 'react-icons/bs';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

import SearchLayout from '@/components/layout/search-layout';
import { useDrawerStore } from '@/store/drawerStore';
import { darkMode, lightMode } from '@/styles/theme';

const events = [
  {
    title: '팬아트 랜덤가챠 굴리기',
    // buttonColorScheme: 'yellow',
    buttonColorScheme: '#faf089',
    hoverBackground: '#ddd',
    hoverColor: 'black',
    icon: (
      <GiPerspectiveDiceSixFacesRandom
        style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }}
      />
    ),
    link: '/events/RandomGacha',
    linkText: '무슨 팬아트가 나올까요?',
  },
  {
    title: '기간한정 슛코☆팬아트 갤러리 공개',
    // buttonColorScheme: 'green',
    buttonColorScheme: '#9ae6b4',
    hoverBackground: '#ddd',
    hoverColor: 'black',
    icon: (
      <BsCalendarEventFill
        style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }}
      />
    ),
    link: '/gallery/AprilFool',
    linkText: '이건 못참지',
  },
  {
    title: '왁티홀의 문 체험하기 (신규!)',
    // buttonColorScheme: 'red',
    buttonColorScheme: '#feb2b2',
    hoverBackground: '#ddd',
    hoverColor: 'black',
    icon: (
      <BsDoorOpenFill
        style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }}
      />
    ),
    link: '/events/WaktyHallDoor',
    linkText: '선택을 바꾸시겠습니까?',
  },
];

export default function Events() {
  const setIsOpen = useDrawerStore((state) => state.setIsOpen);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <SearchLayout title="이벤트관">
      {/* <MySnowfall /> */}
      {events.map((event, index) => (
        <Box
          key={index}
          m="0 auto"
          mb="1rem"
          p="1rem 0"
          borderRadius="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          background={bg2} // bg2 should be defined in your theme or component
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
              {event.title}
            </Text>
            <Link
              href={event.link}
              style={{
                display: 'flex',
                justifyContent: 'center',
                background: event.buttonColorScheme,
                color: '#1a202c',
                width: '60%',
                padding: '0.5rem',
                borderRadius: '1rem',
                fontWeight: 600,
                // _hover={{ background: '#ddd', color: 'black' }}
              }}
            >
              {event.icon}
              {event.linkText}
            </Link>
          </Box>
        </Box>
      ))}
    </SearchLayout>
  );
}
