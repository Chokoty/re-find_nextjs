import {
  Box,
  Button,
  Flex,
  Link,
  Skeleton,
  Text,
  useBreakpointValue,
  // useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import NextImage from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaDice } from 'react-icons/fa';

import { useModifiedImageUrl } from '@/hook/useModifiedImageUrl';
import { useResponsiveLink } from '@/hook/useResponsiveLink';
// import { IoSettingsSharp } from 'react-icons/io5';
// import { darkMode, lightMode } from '@/styles/theme';

const IsegyeFestivalFanart = ({ initialFanart }) => {
  const [fanart, setFanart] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isvisible, setIsvisible] = useState(true);
  // const [isFocused, setIsFocused] = useState(false);
  const [isBold, setIsBold] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsBold((prevIsBold) => !prevIsBold);
    }, 1000); // Toggle bold every 1 second

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);
  // const color2 = useColorModeValue(lightMode.color2, darkMode.color2);
  const direction = useBreakpointValue({ base: 'column', md: 'row' });
  const modifiedUrl300 = useModifiedImageUrl(fanart?.img_url, 300);

  const article_link = useResponsiveLink(
    fanart?.url.split('/').pop(),
    'article'
  );
  // const toggleFocus = () => {
  //   setIsFocused(!isFocused);
  // };

  useEffect(() => {
    if (initialFanart == null) fetchRandomFanart();
    setFanart(initialFanart);
  }, []);

  const fetchRandomFanart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`https://re-find.reruru.com/isegye_festival`);
      // console.log(res.data);
      setFanart(res.data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log('Server Error: ', error.response.status);
      } else if (error.code === 'ERR_NETWORK') {
        console.log('Network Error: ', error.code);
      } else {
        console.log(error);
      }
    }
  };

  const handleLoad = async () => {
    // await new Promise((r) => setTimeout(r, 1000));
    await new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve();
      }, 1000);
    });
    setIsLoading(false);
  };

  const showRandomFanart = () => {
    if (!isvisible) setIsvisible(true);
    fetchRandomFanart();
  };

  const previewContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    // border: '1.5px solid #FE78BB',
    // borderRadius: '0.2rem',
    // padding: '1.5rem',
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
      // p="0.5rem"
      w="100%"
      //  maxW="540px"

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
            {/* <Text
              fontSize="xl"
              fontWeight="bold"
              mb="1rem"
              align="center"
              color="#000"
            >
              이세계 페스티벌 특집 팬아트
            </Text> */}
            <Skeleton isLoaded={!isLoading}>
              {fanart && (
                <>
                  <Box
                    position="relative"
                    borderRadius="1rem"
                    overflow="hidden"
                    w="100%"
                    pt="3rem"
                    // mb="1rem"
                  >
                    {/* <Link
                      className="link-to-wakzoo"
                      href={article_link}
                      passHref
                      isExternal
                      style={{
                        linkDiv,
                        position: 'relative',
                      }}
                    > */}
                    <NextImage
                      unoptimized
                      style={img}
                      width={475}
                      height={475}
                      src={modifiedUrl300}
                      // src={fanart?.img_url}
                      alt={`랜덤 팬아트 게시글 id: ${fanart?.id}`}
                      onLoad={handleLoad}
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
                    {/* </Link> */}
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
                      href={`/artists/${fanart?.nickname}`}
                      passHref
                      style={linkDiv}
                    >
                      <Text
                        color="#1B1642"
                        // as="b"
                        fontWeight={isBold ? 'bold' : 'normal'}
                      >
                        제목: {fanart?.title.slice(0, 20)}
                      </Text>
                      <Text
                        color="#1B1642"
                        // as="b"
                        fontWeight={isBold ? 'bold' : 'normal'}
                      >
                        작가: {fanart?.nickname}
                      </Text>
                    </Box>
                  </Box>
                </>
              )}
            </Skeleton>
          </Box>
        )}
        <Flex gap="2">
          <Button
            className="random-fanart-kidding"
            // w="200px"
            backgroundColor="#14532D"
            // backgroundColor="#FE78BB"
            _hover={{
              bg: '#9BCC95',
              // bg: '#e94396'
            }}
            color="#FFF"
            size="md"
            mt="1.5rem"
            onClick={showRandomFanart}
          >
            <FaDice boxSize={12} />
            &nbsp; 이세계 페스티벌 팬아트 랜덤가챠
          </Button>
        </Flex>
      </div>
    </Box>
  );
};

export default IsegyeFestivalFanart;
