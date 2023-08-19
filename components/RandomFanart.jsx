import React, { use, useEffect, useState } from 'react';
import NextImage from 'next/image';
import axios from 'axios';
import {
  Text,
  Link,
  Button,
  Skeleton,
  Stack,
  Checkbox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
  Spacer,
  Heading,
  Box,
  useColorModeValue,
  useBreakpointValue,
  Card,
} from '@chakra-ui/react';
import { FaArrowDown, FaDice } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { lightMode, darkMode } from '@/styles/theme';

const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    document.cookie = `${key}=${JSON.stringify(value)}; path=/`;
  }
};

const getLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(key))
      ?.split('=')[1];
    return cookie ? JSON.parse(cookie) : null;
  }
};

const RandomFanart = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [fanart, setFanart] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [url, setUrl] = useState(null);
  const [urlId, setUrlId] = useState(null);
  const [isvisible, setIsvisible] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({
    isd: true,
    wak: true,
    gomem: true,
  });

  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);
  const direction = useBreakpointValue({ base: 'column', md: 'row' });

  useEffect(() => {
    // 로컬 스토리지에서 체크박스 값 불러오기
    const savedCheckboxValues = getLocalStorage('checkboxValues');
    if (savedCheckboxValues) {
      setCheckboxValues(savedCheckboxValues);
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // 컴포넌트가 마운트될 때 화면 크기 체크
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLoad = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  };

  const showRandomFanart = () => {
    if (!isvisible) setIsvisible(true);
    fetchRandomFanart();
  };

  const fetchRandomFanart = async () => {
    try {
      setIsLoading(true);
      let queryParams = Object.keys(checkboxValues)
        .filter((key) => checkboxValues[key])
        .join('&');
      const res = await axios.get(
        `https://re-find.reruru.com/rand?${queryParams}`
        // `http://search.reruru.com:8443/rand?${queryParams}`
      );
      setFanart(res.data);
      setUrl(urlId);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log('Server Error: ', error.response.status);
      } else if (error.code == 'ERR_NETWORK') {
        console.log('Network Error: ', error.code);
      } else {
        console.log(error);
      }
    }
    // 0.5초 대기
    // await new Promise((r) => setTimeout(r, 500));
    // setIsLoading(false);
  };

  const handleCheckboxChange = (e) => {
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
  const url2 = isMobile
    ? 'https://m.cafe.naver.com/ca-fe/web/cafes/27842958/articles/'
    : 'https://cafe.naver.com/steamindiegame/';

  const previewContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 30,
  };
  const img = {
    display: 'flex',
    height: '100%',
    maxHeight: '400px',
    borderRadius: '1rem',
    objectFit: 'cover',
    width: '100%',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
    marginBottom: '0.5rem',
  };

  const linkDiv = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  };

  const guide = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    alignItems: 'center',
    height: '100px',
  };

  return (
    <Box
      bg={color2}
      p="2rem"
      w="90%"
      maxW="540px"
      // borderWidth="1px"
      borderRadius="lg"
    >
      <div style={previewContainer} className="random-fanart">
        {!isvisible && (
          <div className="random-fanart__guide" style={guide}>
            <Flex
              direction={direction}
              alignItems="center"
              justifyContent="center"
              wrap="wrap"
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                mb={direction === 'row' ? '1rem' : '0'}
                mr={direction === 'row' ? '0.3rem' : '0'}
              >
                아래 버튼을 누르면
              </Text>
              <Text
                fontSize="xl"
                fontWeight="bold"
                mb="1rem"
                mr={direction === 'row' ? '1rem' : '0'}
              >
                랜덤 팬아트가 나와요!
              </Text>
            </Flex>
            <FaArrowDown boxSize={12} />
          </div>
        )}
        {isvisible && (
          <Skeleton isLoaded={!isLoading}>
            {fanart && (
              <Link
                href={url2 + fanart?.id}
                passHref
                isExternal
                style={linkDiv}
              >
                <NextImage
                  unoptimized
                  style={img}
                  width={475}
                  height={475}
                  src={fanart?.img_url}
                  alt={'랜덤 팬아트 게시글 id: ' + fanart?.id}
                  onLoad={handleLoad}
                />
                <Text>랜덤 팬아트 id: {fanart?.id}</Text>
                <Text>작가: {fanart?.nickname}</Text>
              </Link>
            )}
          </Skeleton>
        )}
        <Flex gap="2">
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button
                w="40px"
                colorScheme="green"
                variant="outline"
                size="md"
                mt="1.5rem"
                p="0"
              >
                <IoSettingsSharp boxSize={30} />
              </Button>
            </PopoverTrigger>
            <PopoverContent w="320px" p="0.5rem">
              <PopoverArrow />
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
          <Spacer />
          <Button
            className="random-fanart__button"
            w="160px"
            colorScheme="yellow"
            size="md"
            mt="1.5rem"
            onClick={showRandomFanart}
          >
            <FaDice boxSize={12} />
            &nbsp; 팬아트 랜덤가챠
          </Button>
        </Flex>
      </div>
    </Box>
  );
};

export default RandomFanart;
