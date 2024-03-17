import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { PiGiftBold } from 'react-icons/pi';

import styles from '@/styles/EventDay.module.scss';
import { darkMode, lightMode } from '@/styles/theme';

export default function EventDay() {
  const color3 = useColorModeValue(lightMode.color2, darkMode.color3);
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
        // color={color3}
        fontSize={['1.2rem', '1.5rem', '1.7rem']}
        fontWeight="bold"
        mb="1rem"
      >
        릴파님 생일 축하드려요!!!
      </Text>
      <NextLink href="/gallery/lilpaBirthday" className={styles.linkBtn}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="#9ae6b4"
          color="black"
          w="100%"
          // h="40px"
          // mb="2rem"
          p="0.5rem"
          borderRadius="1rem"
          _hover={{ background: '#ddd', color: 'black' }}
        >
          <PiGiftBold
            style={{
              width: '1.5rem',
              height: '1.5rem',
              marginRight: '0.5rem',
            }}
          />
          릴파님 생일기념 팬아트 보러가기
        </Box>
      </NextLink>
    </Box>
  );
}
