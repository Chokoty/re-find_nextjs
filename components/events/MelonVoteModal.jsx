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
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// import { useDisclosure } from '@chakra-ui/react';
// import { ExternalLinkIcon } from '@chakra-ui/icons';
import { LuAlertCircle, LuListMusic, LuVote } from 'react-icons/lu';

import { darkMode, lightMode } from '@/styles/theme';
// import { useEventStore } from '../../store/store';

const MelonVoteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [color, setColor] = useState('#052e16'); // 초기 색상 설정

  // Theme
  // const color = useColorModeValue(lightMode.color, darkMode.color);
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  const modalWidth = useBreakpointValue({ base: '92%', sm: '392px' });

  const handleCloseModal = () => {
    setIsOpen(false);
    setCookie('isOpen', 'false', 365); // 쿠키 설정
    localStorage.setItem('isOpen', 'false'); // localStorage 설정
  };

  const handleCloseModal2 = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    setCookie('isOpen', 'true', 365); // 쿠키 설정
    localStorage.setItem('isOpen', 'true'); // localStorage 설정
  };

  // 하루동안 안보이게 하기
  // 쿠키 설정 함수
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    // expires.setTime(expires.getTime() + minutes * 60 * 1000); // 유효 기간을 분 단위로 설정
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  // 쿠키 가져오기 함수
  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : '';
  };

  useEffect(() => {
    // const isModalAlreadyOpened = getCookie('isModalAlreadyOpened');
    const modalState =
      localStorage.getItem('isOpen') || getCookie('isOpen') || 'true'; // 기본값 'true' 추가
    // console.log('modalState', modalState);
    if (modalState !== 'false') {
      // handleOpenModal();
      handleCloseModal();
      // setCookie('isModalAlreadyOpened', 'true', 1); // 쿠키 설정, 유효 기간 1일
    }
    // console.log('isModalAlreadyOpened', isModalAlreadyOpened);
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
      // bg="#FFFAE8"
      p="0.5rem"
      w="90%"
      maxW="540px"
      mb="1rem"
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Link href="https://www.melon.com/melonaward/weekAward.htm" isExternal>
        <Button colorScheme="green" w="260px">
          <LuVote size="1.2rem" />
          <Text ml="0.5rem">멜론 주간인기상 투표하기</Text>
        </Button>
      </Link>

      {/* <Button colorScheme="green" onClick={handleOpenModal} w="260px">
        <LuVote size="1.2rem" />
        <Text ml="0.5rem">멜론 주간인기상 투표하기</Text>
      </Button> */}
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={handleCloseModal2}
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
            zIndex="-1"
            borderRadius="0.25rem 0.25rem 0 0"
          >
            <Image
              unoptimized
              src="/youtube-thumb.webp"
              alt="키딩 유튜브 썸네일"
              width="100%"
              height={200}
              position="absolute"
              top="0"
              left="0"
              borderRadius="0.25rem"
              transform="scale(1.5)"
              objectFit="cover"
              transformOrigin="top"
              zIndex={1}
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              background="linear-gradient(to bottom, transparent, black)"
              borderRadius="0.25rem 0.25rem 0 0"
              zIndex={2}
            />
          </Box>
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
                href="https://cafe.naver.com/steamindiegame/12577647"
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
                  // color={color}
                  // transition="color 0.5s ease-in"
                  display="flex"
                  alignItems="center"
                >
                  <LuAlertCircle size="1.2rem" />
                  <Text ml="0.5rem">
                    이세계아이돌 멜론 주간인기상에
                    <br />
                    투표해주세요 ! (왁굳님 공지 돚거)
                  </Text>
                </Box>
              </Link>
              <Link
                color="white"
                href="https://into.melon.com/2023_weekaward"
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
                  <Text ml="0.5rem">멜론 주간인기상 투표하기</Text>
                </Box>
              </Link>
              <Link
                color="white"
                href="https://isegye.live/"
                isExternal
                p="10px 14px"
                display="block"
                w="100%"
                border="1px"
                borderRadius="0.25rem"
                borderColor="#16A34A"
                bg="#18181B"
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
                  <LuListMusic size="1.2rem" />
                  <Text ml="0.5rem">멜론 스밍하러가기</Text>
                </Box>
              </Link>
              <br />
              <Text color="#FFFFFF">
                (스밍 결제 안해도 매일 투표 가능. )
                <br />
                (스밍 결제시 하루 3회 가능)
              </Text>
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
                다시 보지 않기
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MelonVoteModal;
