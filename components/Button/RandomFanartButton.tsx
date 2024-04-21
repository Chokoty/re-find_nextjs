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

import { useUrlInfo } from '@/app/events/service/client/useEventService';
import { RANDOM_FANARTS } from '@/constants/randomFanarts';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';

export default function RandomFanartButton({
  selectedEventKey,
}: {
  selectedEventKey: string;
}) {
  const selectedEvent = RANDOM_FANARTS.find(
    (event) => event.key === selectedEventKey
  );

  const { data, isLoading, isFetching, refetch } = useUrlInfo(
    selectedEvent?.url ?? ''
  );

  const direction = useBreakpointValue({
    base: 'column',
    md: 'row',
  }) as SystemProps['flexDirection'];

  const article_link = useResponsiveLink(
    data?.url.split('/').pop() ?? '',
    'article'
  );

  const modifiedUrl300 = useModifiedImageUrl({
    url: data?.img_url ?? '',
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

    if (!data) {
      return (
        <div style={guide}>
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

    const { title, nickname } = data;

    return (
      <Box>
        <Box
          position="relative"
          borderRadius="1rem"
          overflow="hidden"
          w="100%"
          pt="2rem"
        >
          <Link
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
              alt={`랜덤 팬아트 게시글 id: ${title}`}
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
          >
            <Text>
              {/* color="#1B1642" */}
              제목: {title.slice(0, 20)}
            </Text>
            <Text>작가: {nickname}</Text>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box p="0.5rem" w="100%" borderRadius="lg">
      <div style={previewContainer}>
        {content()}
        <Flex gap="2">
          <Button
            colorScheme="yellow"
            size="md"
            mt="1rem"
            p="0 3rem"
            borderRadius="4rem"
            onClick={showRandomFanart}
            disabled={isFetching} // 여러 번 클릭시 중복 요청 방지}
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
      </div>
    </Box>
  );
}
