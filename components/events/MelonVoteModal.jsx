import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { LuAlertCircle, LuVote } from 'react-icons/lu';

import { useCookie } from '@/hook/useCookie';
import { darkMode, lightMode } from '@/styles/theme';

const MelonVoteModal = () => {
  const { setCookie, getCookie, deleteCookie } = useCookie();

  const [isOpen, setIsOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [color, setColor] = useState('#052e16'); // 초기 색상 설정

  // Theme
  const color3 = useColorModeValue(lightMode.color2, darkMode.color3);

  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const modalWidth = useBreakpointValue({ base: '92%', sm: '392px' });

  const handleCloseModal = () => {
    setIsOpen(false);
    setCookie('dontShowAday', 'true', 1); // 하루 동안 모달을 보지 않음,  365 쿠키 설정
    localStorage.setItem('dontShowAday', 'true'); // localStorage 설정
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    setCookie('dontShowAday', 'false', 1); // 쿠키 설정
    localStorage.setItem('dontShowAday', 'false'); // localStorage 설정
    deleteCookie('isOpen'); // 이전 쿠키 삭제
    localStorage.removeItem('isOpen'); // 이전 localStorage 삭제
  };

  useEffect(() => {
    const dontShowAdayCookie = getCookie('dontShowAday');
    const dontShowAdayLocalStorage = localStorage.getItem('dontShowAday');

    console.log('!!!', getCookie('dontShowAday'));
    if (dontShowAdayCookie !== 'true' || dontShowAdayLocalStorage !== 'true') {
      handleOpenModal();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColor((prevColor) =>
        prevColor === '#052e16' ? '#16A34A' : '#052e16'
      ); // 색상 변경
    }, 1500); // 1초마다 실행

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 제거
  }, []);

  const modalStyles = {
    bg: 'gray.800', // 배경색 지정
    color: 'white', // 텍스트 색상 지정
    borderRadius: '8px', // 모서리 둥글게
  };

  return (
    <Box
      w="90%"
      h="100%"
      maxW="540px"
      maxH="110px"
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      background={color3}
      boxShadow="md"
    >
      <Heading as="h2" size="md" mb="1rem">
        투표기간 - 11/17(목)~12/01(금) 23:59{' '}
      </Heading>
      <Link href="https://www.melon.com/mma/vote2.htm" isExternal>
        <Button colorScheme="green">
          <LuVote size="1.2rem" />
          <Text ml="0.5rem">멜론 MMA2023 밀리언스 TOP10 투표하기</Text>
        </Button>
      </Link>

      {/* <Button colorScheme="green" onClick={handleOpenModal}>
        <LuVote size="1.2rem" />
        <Text ml="0.5rem">멜론 하기 </Text>
      </Button> */}

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={handleCloseModal}
        motionPreset="slideInBottom"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent maxW={modalWidth} backgroundColor="black">
          <Box
            position="absolute"
            overflow="hidden"
            w="100%"
            h="200px"
            zindex="0"
            borderRadius="0.25rem 0.25rem 0 0"
          ></Box>
          <Box
            position="relative"
            p="16px 24px"
            textAlign="left"
            fontSize="1.2rem"
            fontWeight="bold"
            overflow="hidden"
          >
            <Heading
              fontSize="2xl"
              color="#FFFFFF"
              backgroundColor="#FE78BB"
              display="inline-block"
            >
              Kidding (키딩)
            </Heading>
            <Text
              fontSize="sm"
              color="#DAD4D8"
              // backgroundColor="#FE78BB"
              // display="inline-block"
            >
              이세계아이돌 3번째 싱글
            </Text>
          </Box>
          <ModalBody>
            <Flex flexDirection="column" mb="0.3rem" mt="2rem">
              <Text fontWeight="bold"></Text>
              <Link
                color="white"
                href="https://cafe.naver.com/steamindiegame/13776472"
                isExternal
                p="10px 14px"
                display="block"
                w="100%"
                border="1px"
                borderRadius="0.25rem"
                borderColor="#16A34A"
                bg="#052e16"
                mb="0.5rem"
                textDecoration="none"
                _hover={{ textDecoration: 'none' }}
              >
                <Box
                  as="span"
                  borderRadius="0.25rem"
                  color="#ffffff"
                  display="flex"
                  alignItems="center"
                >
                  <LuAlertCircle size="1.2rem" />
                  <Text ml="0.5rem">
                    [공지] 멜론 MMA 2023 밀리언스 TOP10 에 키딩이 들어갔어요.
                  </Text>
                </Box>
              </Link>
              <Link
                color="white"
                href="https://www.melon.com/mma/vote2.htm"
                isExternal
                p="10px 14px"
                display="block"
                w="100%"
                border="1px"
                borderRadius="0.25rem"
                borderColor="#16A34A"
                // bg="#18181B"
                textDecoration="none"
                mb="0.5rem"
                _hover={{ textDecoration: 'none' }}
                bg={color}
                transition="background-color 0.5s ease-in"
              >
                <Box
                  as="span"
                  borderRadius="0.25rem"
                  color="#ffffff"
                  display="flex"
                  alignItems="center"
                >
                  <LuVote size="1.2rem" />
                  <Text ml="0.5rem">멜론 MMA2023 밀리언스 TOP10 투표하기</Text>
                </Box>
              </Link>
              <br />

              <br />
              <Button
                mr={3}
                onClick={handleCloseModal}
                w="100%"
                variant="outline"
                border="1px"
                borderColor="#777777"
                borderRadius="0.25rem"
                color="#ffffff"
                _hover={{ bg: 'black' }}
                mb="2rem"
              >
                하루 동안 보지 않기
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MelonVoteModal;
