import { SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiMoon } from 'react-icons/fi';
import { MdInfoOutline, MdOutlineContactSupport } from 'react-icons/md';
import { PiGiftBold } from 'react-icons/pi';

// import DarkModeToggle from '@/components/common/DarkModeToggle';
import { darkMode, lightMode } from '@/styles/theme';

const MoreButtons = () => {
  const bg = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const Icon = useColorModeValue(FiMoon, SunIcon);

  const { toggleColorMode } = useColorMode();

  const handleButtonClick = () => {
    toggleColorMode(); // 다크 모드 전환
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      w="21rem"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      gap="1rem"
      mt="1rem"
    >
      <NextLink href={'/more/about'} passHref>
        <Button
          variant="solid"
          w="9rem"
          h="8rem"
          p="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          gap="1rem"
          borderRadius="1rem"
          background={bg}
        >
          <Box p="0.5rem">
            <MdInfoOutline
              style={{
                width: '2rem',
                height: '2rem',
              }}
            />
          </Box>
          <Text fontSize="xl">리파인드 소개</Text>
        </Button>
      </NextLink>
      <NextLink href={'/more/support'} passHref>
        <Button
          variant="solid"
          w="9rem"
          h="8rem"
          p="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          gap="1rem"
          borderRadius="1rem"
          background={bg}
        >
          <Box p="0.5rem">
            <MdOutlineContactSupport
              style={{ width: '2rem', height: '2rem' }}
            />
          </Box>
          <Text fontSize="xl">문의,지원</Text>
        </Button>
      </NextLink>
      <NextLink href={'/events'} passHref>
        <Button
          variant="solid"
          w="9rem"
          h="8rem"
          p="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          gap="1rem"
          borderRadius="1rem"
          background={bg}
        >
          <Box p="0.5rem">
            <PiGiftBold style={{ width: '2rem', height: '2rem' }} />
          </Box>
          <Text fontSize="xl">이벤트</Text>
        </Button>
      </NextLink>
      <Button
        variant="solid"
        w="9rem"
        h="8rem"
        p="1rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        gap="1rem"
        borderRadius="1rem"
        background={bg}
        onClick={handleButtonClick}
      >
        {/* <DarkModeToggle className="icon" /> */}
        <Box p="0.5rem">
          <Icon
            style={{
              width: '2rem',
              height: '2rem',
            }}
          />
        </Box>
        <Text fontSize="xl">화면 스타일</Text>
      </Button>
    </Box>
  );
};

export default MoreButtons;
