import React, { useState } from 'react';
import NextImage from 'next/image';
import {
  Flex,
  Button,
  Box,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useResponsiveLink } from '../hook/useResponsiveLink';
import { useModifiedImageUrl } from '@/hook/useModifiedImageUrl';

import { HiOutlineExternalLink } from 'react-icons/hi';
const MasonryCard = ({ nickname, artwork, isFocused, onToggleFocus }) => {
  const article_link = useResponsiveLink('', 'article');
  const widthValue = useBreakpointValue({ base: '180px', sm: '236px' });
  const [imageHeight, setImageHeight] = useState(null);
  const modifiedUrl300 = useModifiedImageUrl(artwork.img_url, 300);

  // const [isFocused, setIsFocused] = useState(false);

  // const toggleFocus = () => {
  //   setIsFocused(!isFocused);
  // };
  const handleImageLoad = (e) => {
    setImageHeight(e.target.height);
  };

  return (
    <Box
      w={widthValue}
      pb="16px"
      display="inline-block"
      position="relative"
      key={artwork.id}
      m="0 1rem"
    >
      <Box position="relative">
        <Box
          width={widthValue}
          overflow="hidden"
          borderRadius="1rem"
          position="relative"
        >
          <NextImage
            alt={artwork.title}
            width={236}
            height={236}
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              width: '100%',
              height: '100%',
              borderRadius: '1rem',
              filter: artwork.deleted ? 'blur(6px)' : 'none', // 블러 처리
            }}
            src={
              // artwork.deleted
              //   ? `/api/blurImage?url=${artwork.img_url.replace(
              //       /\?type=w\d+$/,
              //       '?type=w300'
              //     )}`
              //   : artwork.img_url.replace(/\?type=w\d+$/, '?type=w300') // 썸네일 크기 300으로 가져오기 - 네이버 자체 썸네일 api
              artwork.img_url === ''
                ? 'http://via.placeholder.com/236x236'
                : // : artwork.deleted
                  // ? `/api/blurImage?url=${artwork.img_url}`
                  modifiedUrl300
              // artwork.img_url.replace(/\?type=w\d+$/, '?type=w300') // 썸네일 크기 300으로 가져오기 - 네이버 자체 썸네일 api
            }
            unoptimized
            onLoad={handleImageLoad}
          />
        </Box>
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          borderRadius="1rem"
          zIndex={1}
          background={isFocused ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.0)'}
          onClick={() => onToggleFocus(artwork.id)}
          onMouseEnter={() => onToggleFocus(artwork.id)}

          // _hover={{
          //   backgroundColor: 'rgba(0, 0, 0, 0.3)', // 검은색의 30% 투명도
          //   cursor: 'pointer',
          // }}
        />
        {isFocused && (
          <Flex
            flexDir="column"
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            borderRadius="1rem"
            zIndex={2}
            background="rgba(0, 0, 0, 0.3)"
            justifyContent="space-between"
            alignItems="center"
            color="white"
            fontSize="2rem"
            fontWeight="bold"
            cursor="pointer"
            p={['0.5rem ', '1rem 0']}
            onMouseLeave={() => onToggleFocus(null)}
          >
            <Text
              fontSize={['sm', 'xl']}
              fontWeight="600"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="100%"
            >
              {artwork.board}
            </Text>

            {imageHeight >= 200 && (
              <>
                <Flex
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    fontSize={['sm', 'xl']}
                    fontWeight="300"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="100%"
                    textAlign="center"
                  >
                    {nickname}
                  </Text>
                  <Text
                    fontSize={['sm', 'xl']}
                    fontWeight="300"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="100%"
                    textAlign="center"
                  >
                    {artwork.date.split(' ')[0].slice(0, -1)}
                  </Text>
                </Flex>
                <Flex
                  flexDir="row"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  w="90%"
                >
                  <Text fontSize={['sm', 'xl']} fontWeight="300">
                    조회수{' '}
                    {artwork.view === 0
                      ? '0'
                      : artwork.view
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                  <Text fontSize={['sm', 'xl']} fontWeight="300">
                    좋아요{' '}
                    {artwork.like === 0
                      ? '0'
                      : artwork.like
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                  <Text fontSize={['sm', 'xl']} fontWeight="300">
                    댓글수{' '}
                    {artwork.comment === 0
                      ? '0'
                      : artwork.comment
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </Flex>{' '}
              </>
            )}
            {imageHeight < 200 && (
              <>
                {imageHeight > 140 && (
                  <Text
                    fontSize={['xs', 'sm']}
                    fontWeight="300"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="100%"
                    textAlign="center"
                  >
                    {artwork.date.split(' ')[0].slice(0, -1)}
                  </Text>
                )}
                <Flex
                  flexDir="row"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  w="90%"
                >
                  <Text fontSize={['xs', 'sm']} fontWeight="300">
                    조
                    {artwork.view === 0
                      ? '0'
                      : artwork.view
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    &nbsp;
                  </Text>
                  <Text fontSize={['xs', 'sm']} fontWeight="300">
                    좋{' '}
                    {artwork.like === 0
                      ? '0'
                      : artwork.like
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    &nbsp;
                  </Text>
                  <Text fontSize={['xs', 'sm']} fontWeight="300">
                    댓{' '}
                    {artwork.comment === 0
                      ? '0'
                      : artwork.comment
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    &nbsp;
                  </Text>
                </Flex>
              </>
            )}
            <Flex
              w="100%"
              flexDir="row"
              justifyContent="center"
              alignItems="center"
              // p="0 1rem"
              // justifyContent="flex-end"
              // alignItems="flex-end"
            >
              <Button
                as={Link}
                href={
                  artwork.url === ''
                    ? '#'
                    : article_link + artwork.url.split('/').pop()
                }
                isExternal
                _hover={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'green.400',
                }}
                target="_blank"
                rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
                colorScheme="green"
                borderRadius="2rem"
                w="60%"
                // w={['100px', '150px']}
                h={['1.5rem', '3rem']}
              >
                <Text fontSize={['xs', 'md']}>왁물원</Text> &nbsp;
                <HiOutlineExternalLink />
              </Button>
            </Flex>
          </Flex>
        )}
      </Box>
      <Box>
        <Text fontWeight={500} p="0.5rem 0">
          {artwork.title}
        </Text>
      </Box>
    </Box>
  );
};

export default MasonryCard;
