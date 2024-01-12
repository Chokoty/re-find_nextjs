import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';

import RandomFanartBtn from '@/components/event/RandomFanartBtn';
import { eventsData } from '@/data/events';
import { darkMode, lightMode } from '@/styles/theme';

const EventFanarts = ({ initialFanart, showCnt, width }) => {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  const [selectedEventKey, setSelectedEventKey] = useState(
    eventsData[eventsData.length - 1].key
  );

  const handleEventClick = (key) => {
    setSelectedEventKey(key);
  };

  return (
    <Box
      m="0 auto"
      mt="1rem"
      background={bg2}
      maxW="540px"
      w={width}
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
          특집 팬아트 가챠
        </Text>
        <Text
          fontSize="lg"
          fontWeight="bold"
          textAlign="right"
          w="50%"
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
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {showCnt === 0 && (
          <Box w="90%" p="0 0.5rem">
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
        )}
        {showCnt !== 0 && (
          <Box w="100%" p="0 0.5rem">
            {eventsData
              .slice(-showCnt) // This will take the last `showCnt` elements from the array
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
            <Link href="/events">
              <Button
                m="0.25rem"
                // background={
                //   selectedEventKey === item.key ? item.backgroundColor : null
                // }
                // _hover={{
                //   background: item.backgroundColor,
                // }}
                borderRadius="1rem"
                padding="1.5rem"
                w="95%"
                alignItems="center"
                justifyContent="center"
                // onClick={() => handleEventClick(item.key)}
              >
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  // color={item.color}
                  textAlign="center"
                >
                  랜덤가챠 더보기
                </Text>
              </Button>
            </Link>
          </Box>
        )}
      </Box>

      <RandomFanartBtn
        initialFanart={initialFanart}
        selectedEventKey={selectedEventKey}
      />
    </Box>
  );
};

export default EventFanarts;
