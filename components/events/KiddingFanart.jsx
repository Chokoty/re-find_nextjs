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

const KiddingFanart = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [fanart, setFanart] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [url, setUrl] = useState(null);
  const [urlId, setUrlId] = useState(null);
  const [isvisible, setIsvisible] = useState(true);

  const color2 = useColorModeValue(lightMode.color2, darkMode.color2);
  const direction = useBreakpointValue({ base: 'column', md: 'row' });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // 컴포넌트가 마운트될 때 화면 크기 체크
    handleResize();
    fetchRandomFanart();

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
      const res = await axios.get(`https://re-find.reruru.com/third_album`);
      // console.log(res.data);
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
    border: '1.5px solid #FE78BB',
    borderRadius: '0.2rem',
    padding: '1.5rem',
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
      bg="#FFFAE8"
      p="0.5rem"
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
          <Box>
            <Text
              fontSize="xl"
              fontWeight="bold"
              mb="1rem"
              align="center"
              color="#000"
            >
              3집 Kidding 특집 팬아트
            </Text>
            <Skeleton isLoaded={!isLoading}>
              {fanart && (
                <Link
                  href={url2 + fanart?.url.split('/').pop()}
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
                  <Text color="#1B1642">
                    제목: {fanart?.title.slice(0, 20)}
                  </Text>
                  <Text color="#1B1642">작가: {fanart?.nickname}</Text>
                </Link>
              )}
            </Skeleton>
          </Box>
        )}
        <Flex gap="2">
          <Button
            className="random-fanart__button"
            w="160px"
            // backgroundColor="#FFFAE8"
            // backgroundColor="#FE78BB"
            backgroundColor="#FE78BB"
            color="#FFF"
            size="md"
            mt="1.5rem"
            onClick={showRandomFanart}
          >
            <FaDice boxSize={12} />
            &nbsp; 키딩 팬아트 랜덤가챠
          </Button>
        </Flex>
      </div>
    </Box>
  );
};

export default KiddingFanart;
