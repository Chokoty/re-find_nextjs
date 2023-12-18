import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';

import RandomFanartBtn from '@/components/events/RandomFanartBtn';
import { darkMode, lightMode } from '@/styles/theme';

const eventsData = [
  {
    key: 'third_album',
    title: '🌼 KIDDING 특집 🌼',
    backgroundColor: '#72C424',
    color: '',
  },
  {
    key: 'isegye_festival',
    title: '❤️‍🔥 이세계 페스티벌 특집 ❤️‍🔥',
    backgroundColor: '#6A3CBC',
    color: '',
  },

  // {
  //   key: 'Halloween',
  //   title: '🎃 할로윈 특집 🎃',
  //   backgroundColor: 'black',
  //   color: '',
  // },
  {
    key: 'IsegyeDol2Y',
    title: '🎉 이세돌 2주년 특집 🎉',
    backgroundColor: '#FE9ECE',
    color: '',
  },
];

const EventFanarts = ({ initialFanart }) => {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  const [selectedEventKey, setSelectedEventKey] = useState('IsegyeDol2Y');

  const handleEventClick = (key) => {
    setSelectedEventKey(key);
  };

  return (
    <Box
      m="0 auto"
      mt="1rem"
      background={bg2}
      maxW="540px"
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      borderRadius="1rem"
      p="1rem 0"
    >
      <Box
        display="flex"
        flexDirection="row"
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
          특집 팬아트 랜덤 가챠
        </Text>
        <Text
          fontSize="lg"
          fontWeight="bold"
          textAlign="right"
          w="100%"
          p="0 2rem"
        >
          총 {eventsData.length} 개
        </Text>
      </Box>
      <Box
        border="1px solid #FE78BB"
        borderRadius="1rem"
        p="0.5rem 0"
        w="90%"
        mt="1rem"
        maxH="260px" // 최대 높이 설정
        overflowY="scroll" // 세로 스크롤 적용
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {eventsData
          .slice()
          .reverse()
          .map((item, index) => (
            <Button
              m="0.25rem"
              key={index}
              background={
                selectedEventKey === item.key ? item.backgroundColor : null
              }
              _hover={{
                background: item.backgroundColor,
              }}
              borderRadius="1rem"
              padding="1.5rem"
              w="95%"
              alignItems="center"
              justifyContent="center"
              onClick={() => handleEventClick(item.key)}
            >
              <Text
                fontSize="md"
                fontWeight="bold"
                color={item.color}
                textAlign="center"
              >
                {item.title}
              </Text>
            </Button>
          ))}
      </Box>

      <RandomFanartBtn
        initialFanart={initialFanart}
        selectedEventKey={selectedEventKey}
      />
    </Box>
  );
};

export default EventFanarts;
