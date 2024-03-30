import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { BsDoorOpenFill } from 'react-icons/bs';

import { darkMode, lightMode } from '@/styles/theme';

export default function EventBtn2() {
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);

  return (
    <Box
      w="100%"
      h="100%"
      p={['0.8rem 0', '1.5rem 0', '2.7rem 0']}
      maxW="700px"
      maxH="130px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      background={bg2}
      borderRadius="1rem"
      // boxShadow="md"
    >
      <Text
        fontSize={['1.2rem', '1.5rem', '1.7rem']}
        fontWeight="bold"
        mb="1rem"
      >
        왁티홀의 문 체험하기
      </Text>
      <Button
        colorScheme="red"
        w="60%"
        p="0.5rem"
        borderRadius="1rem"
        _hover={{ background: '#ddd', color: 'black' }}
      >
        <BsDoorOpenFill
          style={{
            width: '1.5rem',
            height: '1.5rem',
            marginRight: '0.5rem',
          }}
        />
        <NextLink href="/events/WaktyHallDoor">선택을 바꾸시겠습니까?</NextLink>
      </Button>
    </Box>
  );
}
