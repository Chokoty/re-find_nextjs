import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

import RandomFanartButton from '@/components/Button/RandomFanartButton';
import { RANDOM_FANARTS } from '@/constants/randomFanarts';
import { darkMode, lightMode } from '@/lib/theme';

type Props = {
  initialFanart: null;
  showCnt: number;
  width: string;
};

export default function EventFanarts({ initialFanart, showCnt, width }: Props) {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  const [selectedEventKey, setSelectedEventKey] = useState(
    RANDOM_FANARTS[RANDOM_FANARTS.length - 1].key
  );

  const handleEventClick = (key: string) => {
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
      boxShadow="0 8px 20px 0 rgba(0,0,0,.08)"
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
          pl="1.5rem"
        >
          특집 팬아트 가챠
        </Text>
        <Text
          fontSize="lg"
          fontWeight="bold"
          textAlign="right"
          w="60%"
          // p="0 2rem"
          pr="2rem"
        >
          총 {RANDOM_FANARTS.length} 개
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
          msOverflowStyle: 'none' /* IE and Edge */,
          scrollbarWidth: 'none' /* Firefox */,
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {showCnt === 0 && (
          <Box w="90%" p="0 0.5rem">
            {RANDOM_FANARTS.slice()
              .reverse()
              .map((item, index) => (
                <Button
                  m="0.25rem"
                  key={index}
                  background={
                    selectedEventKey === item.key
                      ? item.backgroundColor
                      : undefined
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
            {RANDOM_FANARTS.slice(-showCnt) // This will take the last `showCnt` elements from the array
              .reverse()
              .map((item, index) => (
                <Button
                  m="0.25rem"
                  key={index}
                  background={
                    selectedEventKey === item.key
                      ? item.backgroundColor
                      : undefined
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

      <RandomFanartButton
        initialFanart={initialFanart}
        selectedEventKey={selectedEventKey}
      />
    </Box>
  );
}
