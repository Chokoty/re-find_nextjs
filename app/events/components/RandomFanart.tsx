import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Skeleton,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaDice } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';

import { useRandomFanart } from '@/app/events/service/client/useEventService';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';
import { darkMode, lightMode } from '@/lib/theme';
import type { CheckBoxType } from '@/types';

const setLocalStorage = (key: string, value: CheckBoxType) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    document.cookie = `${key}=${JSON.stringify(value)}; path=/`;
  }
};

const getLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value);
  } catch (e) {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(key))
      ?.split('=')[1];
    return cookie ? JSON.parse(cookie) : null;
  }
};

export default function RandomFanart() {
  const [checkboxValues, setCheckboxValues] = useState<CheckBoxType>({
    isd: true,
    wak: true,
    gomem: true,
  });
  // const [isBold, setIsBold] = useState(false);
  const { data, isLoading, isFetching, refetch } =
    useRandomFanart(checkboxValues);

  const article_link = useResponsiveLink(
    data?.url.split('/').pop() ?? '',
    'article'
  );

  const modifiedUrl300 = useModifiedImageUrl({
    url: data?.img_url ?? '',
    size: 300,
  });
  // const color2 = useColorModeValue(lightMode.color2, darkMode.color2);
  const bg2 = useColorModeValue(lightMode.bg2, darkMode.bg2);
  const popoverBg = useColorModeValue(lightMode.bg2, darkMode.bg3);

  useEffect(() => {
    // 로컬 스토리지에서 체크박스 값 불러오기
    const savedCheckboxValues = getLocalStorage('checkboxValues');
    if (savedCheckboxValues) {
      setCheckboxValues(savedCheckboxValues);
    }
  }, []);

  const showRandomFanart = async () => {
    // disabled에서 막혀야하지만 이렇게도 막을 수 있음
    if (isFetching) return;
    await refetch();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCheckboxValues = {
      ...checkboxValues,
      [e.target.name]: e.target.checked,
    };

    // 체크된 체크박스의 개수를 확인
    const checkedCount = Object.values(updatedCheckboxValues).filter(
      Boolean
    ).length;

    // 체크된 체크박스가 하나만 남았고, 사용자가 그 체크박스의 체크를 해제하려고 할 때
    if (checkedCount === 0 && !e.target.checked) {
      return; // 체크 해제를 방지하고 함수를 종료
    }

    setCheckboxValues(updatedCheckboxValues);

    // 로컬 스토리지에 체크박스 값 저장하기
    setLocalStorage('checkboxValues', updatedCheckboxValues);
  };

  // const previewContainer = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexWrap: 'wrap',
  //   marginTop: 16,
  //   marginBottom: 30,
  // };
  const img: React.CSSProperties = {
    display: 'flex',
    height: '100%',
    maxHeight: '400px',
    borderRadius: '1rem',
    objectFit: 'cover',
    width: '80%',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
    marginBottom: '0.5rem',
  };

  const linkDiv: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  };

  const guide: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    alignItems: 'center',
    height: '100px',
  };

  const content = () => {
    if (isLoading || isFetching) {
      return (
        <Skeleton
          mt="2rem"
          maxW="420px"
          minH="420px"
          w="90%"
          h="90%"
          borderRadius="1rem"
        />
      );
    }

    if (!data) {
      return (
        <div style={guide}>
          <Text fontSize="xl" fontWeight="bold" mb="1rem">
            아래 버튼을 누르면 랜덤 팬아트가 나와요!
          </Text>
          <FaArrowDown />
        </div>
      );
    }

    const { title, nickname } = data;

    return (
      <>
        <Box
          position="relative"
          borderRadius="1rem"
          overflow="hidden"
          w="100%"
          pt="2rem"
          // mb="1rem"
        >
          <Link
            href={article_link}
            // passHref
            isExternal
            style={linkDiv}
          >
            <NextImage
              unoptimized
              style={img}
              width={475}
              height={475}
              // src={fanart.img_url}
              src={modifiedUrl300}
              alt={`랜덤 팬아트 게시글 title: ${title}`}
              // onLoad={handleLoad}
            />
            <Box
              position="absolute"
              top={0}
              right={0}
              bottom={0}
              left={0}
              borderRadius="1rem"
              zIndex={1}
              _hover={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                cursor: 'pointer',
              }}
              pointerEvents="none" // 이 줄을 추가합니다.
            ></Box>{' '}
          </Link>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mb="1rem"
        >
          <Box
            as="a"
            href={`/artists/${nickname}`}
            // passHref
            style={linkDiv}
            // fontWeight={isBold ? 'bold' : 'normal'}
            fontWeight="bold"
          >
            {/* <Text>랜덤 팬아트 id: {fanart.id}</Text> */}
            <Text>제목: {title.slice(0, 20)}</Text>
            <Text>작가: {nickname}</Text>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <Box
      //
      m="0 auto"
      p="1rem 0"
      borderRadius="1rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      background={bg2}
      w="100%"
      maxW="540px"
      minH="120px"
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
          왁타버스 팬아트 랜덤 가챠
        </Text>
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button
              borderRadius="1rem"
              w="40px"
              colorScheme="green"
              variant="ghost"
              size="md"
              // mt="1.5rem"
              p="0"
              m="0 1rem"
              aria-label="랜덤가챠 게시판 포함/제외하기"
            >
              <IoSettingsSharp
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent w="300px" p="0.5rem" bg={popoverBg}>
            <PopoverArrow bg={popoverBg} />
            <PopoverCloseButton />
            <PopoverBody>
              <Heading as="h5" size="sm">
                랜덤가챠 게시판 포함/제외하기
              </Heading>
              <Stack spacing={3} direction="row" mt="0.5rem">
                <Checkbox
                  name="isd"
                  isChecked={checkboxValues.isd}
                  onChange={handleCheckboxChange}
                >
                  이세돌
                </Checkbox>
                <Checkbox
                  name="wak"
                  isChecked={checkboxValues.wak}
                  onChange={handleCheckboxChange}
                >
                  우왁굳
                </Checkbox>
                <Checkbox
                  name="gomem"
                  isChecked={checkboxValues.gomem}
                  onChange={handleCheckboxChange}
                >
                  고멤/고카
                </Checkbox>
              </Stack>
            </PopoverBody>
            <PopoverFooter>
              간혹 제외한 게시판에서의 팬아트가 뽑힐 수 있습니다 (짝! 그래서
              재밌는 거에요~)
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Box>
      {content()}
      <Flex gap="2">
        <Spacer />
        <Button
          // w="160px"
          colorScheme="yellow"
          size="md"
          mt="1.5rem"
          p="0 3rem"
          borderRadius="4rem"
          onClick={showRandomFanart}
          disabled={isFetching} // 여러 번 클릭시 중복 요청 방지
        >
          <FaDice
            style={{
              width: '20px',
              height: '20px',
            }}
          />
          &nbsp; 랜덤가챠 굴리기
        </Button>
      </Flex>
    </Box>
  );
}
