import type { SystemProps } from '@chakra-ui/react';
import {
  Box,
  Button,
  Flex,
  Link,
  Skeleton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import React from 'react';
import { FaArrowDown, FaDice } from 'react-icons/fa';

import { useModifiedImageUrl } from '@/hook/useModifiedImageUrl';
import { useKidingArtworks } from '@/service/client/events/useEventService';

import { useResponsiveLink } from '../../hook/useResponsiveLink';

export default function KiddingFanart() {
  const { data: fanart, isLoading, isFetching, refetch } = useKidingArtworks();
  // const color2 = useColorModeValue(lightMode.color2, darkMode.color2);
  const direction = useBreakpointValue({
    base: 'column',
    md: 'row',
  }) as SystemProps['flexDirection'];

  const article_link = useResponsiveLink(
    fanart?.url.split('/').pop() ?? '',
    'article'
  );

  const modifiedUrl300 = useModifiedImageUrl({
    url: fanart?.img_url ?? '',
    size: 300,
  });

  const showRandomFanart = async () => {
    // disabled에서 막혀야하지만 이렇게도 막을 수 있음
    if (isFetching) return;
    await refetch();
  };

  const previewContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    // border: '1.5px solid #FE78BB',
    // borderRadius: '0.2rem',
    // padding: '1.5rem',
  };
  const img: React.CSSProperties = {
    display: 'flex',
    height: '100%',
    maxHeight: '400px',
    borderRadius: '1rem',
    objectFit: 'cover',
    width: '100%',
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

    if (!fanart) {
      return (
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
          <FaArrowDown />
        </div>
      );
    }

    return (
      <Box>
        {/* <Text
              fontSize="xl"
              fontWeight="bold"
              mb="1rem"
              align="center"
              color="#000"
            >
              3집 Kidding 특집 팬아트
            </Text> */}
        <>
          <Box
            position="relative"
            borderRadius="1rem"
            overflow="hidden"
            w="100%"
            pt="3rem"
          >
            <Link
              className="link-to-wakzoo"
              href={article_link}
              // passHref
              isExternal
              style={{
                ...linkDiv,
                position: 'relative',
              }}
            >
              <NextImage
                unoptimized
                style={img}
                width={475}
                height={475}
                src={modifiedUrl300}
                // src={fanart?.img_url}
                alt={`랜덤 팬아트 게시글 title: ${fanart.title}`}
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
              href={`/artists/${fanart.nickname}`}
              // passHref
              style={linkDiv}
            >
              <Text
                color="#1B1642"
                // fontWeight={isBold ? 'bold' : 'normal'}
              >
                제목: {fanart.title.slice(0, 20)}
              </Text>
              <Text
                color="#1B1642"
                // fontWeight={isBold ? 'bold' : 'normal'}
              >
                작가: {fanart.nickname}
              </Text>
            </Box>
          </Box>
        </>
      </Box>
    );
  };

  return (
    <Box
      // bg="#FFFAE8"
      p="0.5rem"
      w="100%"
      // minW="300px"
      // maxW="540px"
      borderRadius="lg"
    >
      <div style={previewContainer} className="random-fanart">
        {content()}
        <Flex gap="2">
          <Button
            className="random-fanart-kidding"
            // w="200px"
            backgroundColor="#FE78BB"
            _hover={{ bg: '#e94396' }}
            color="#FFF"
            size="md"
            mt="1.5rem"
            onClick={showRandomFanart}
            disabled={isFetching} // 여러 번 클릭시 중복 요청 방지
          >
            <FaDice
              style={{
                width: '20px',
                height: '20px',
              }}
            />
            &nbsp; 키딩 팬아트 랜덤가챠
          </Button>
        </Flex>
      </div>
    </Box>
  );
}
