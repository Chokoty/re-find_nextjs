import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { PiGiftBold } from 'react-icons/pi';

import { darkMode, lightMode } from '@/styles/theme';

export default function EventBtn() {
  const color3 = useColorModeValue(lightMode.color2, darkMode.color3);
  const bg2 = useColorModeValue(lightMode.bg3, darkMode.bg2);

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
        이벤트 페이지 개설!
      </Text>
      <Link
        href="/events"
        style={{
          display: 'flex',
          justifyContent: 'center',
          background: '#d6bcfa',
          color: '#1a202c',
          width: '60%',
          padding: '0.5rem',
          borderRadius: '1rem',
          fontWeight: 600,
          // _hover={{ background: '#ddd', color: 'black' }}
        }}
      >
        <PiGiftBold
          style={{
            width: '1.5rem',
            height: '1.5rem',
            marginRight: '0.5rem',
          }}
        />
        팬아트 가챠 하러가기
      </Link>
    </Box>
  );
}
