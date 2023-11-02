import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import React, { useState } from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

import { useModifiedImageUrl } from '@/hook/useModifiedImageUrl';
import { useResponsiveLink } from '@/hook/useResponsiveLink';

const MasonryCard = ({ nickname, artwork, isFocused, onToggleFocus }) => {
  const [imageHeight, setImageHeight] = useState(null);
  const article_link = useResponsiveLink('', 'article');
  const widthValue = useBreakpointValue({ base: '180px', sm: '236px' });
  const modifiedUrl300 = useModifiedImageUrl(artwork.img_url, 300);

  const handleImageLoad = (e) => {
    setImageHeight(e.target.height);
  };

  // console.log(artwork);

  return (
    <Box
      w={widthValue}
      maxHeight="500px"
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
              artwork.img_url === ''
                ? 'http://via.placeholder.com/236x236'
                : modifiedUrl300
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
        />
        {isFocused && (
          <Link
            className="link-to-wakzoo-from-profile"
            href={
              artwork.url === ''
                ? '#'
                : article_link + artwork.url.split('/').pop()
            }
            isExternal
          >
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
              {imageHeight >= 212 && (
                <>
                  <Flex
                    flexDir="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text
                      fontSize={['sm', 'xl']}
                      fontWeight="400"
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
                      fontWeight="400"
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
                    <Text fontSize={['sm', 'xl']} fontWeight="400">
                      조회수{' '}
                      {artwork.view === 0
                        ? '0'
                        : artwork.view
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                    <Text fontSize={['sm', 'xl']} fontWeight="400">
                      좋아요{' '}
                      {artwork.like === 0
                        ? '0'
                        : artwork.like
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                    <Text fontSize={['sm', 'xl']} fontWeight="400">
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
              {imageHeight < 212 && (
                <>
                  {imageHeight > 140 && (
                    <Text
                      fontSize={['xs', 'sm']}
                      fontWeight="400"
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
                    <Text fontSize={['xs', 'sm']} fontWeight="400">
                      조{' '}
                      {artwork.view === 0
                        ? '0'
                        : artwork.view
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      &nbsp;
                    </Text>
                    <Text fontSize={['xs', 'sm']} fontWeight="400">
                      좋{' '}
                      {artwork.like === 0
                        ? '0'
                        : artwork.like
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      &nbsp;
                    </Text>
                    <Text fontSize={['xs', 'sm']} fontWeight="400">
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
              >
                <Button
                  as={Link}
                  className="link_to_wakzoo"
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
                  h={['2.5rem', '3rem']}
                >
                  <Text fontSize={['xs', 'md']}>왁물원</Text> &nbsp;
                  <HiOutlineExternalLink />
                </Button>
              </Flex>
            </Flex>
          </Link>
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
