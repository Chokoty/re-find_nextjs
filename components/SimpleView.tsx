import React, { useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { SimpleGrid, Text, Box, Link } from '@chakra-ui/react';

import { useResponsiveLink } from '../hook/useResponsiveLink';

const SimpleView = ({ artworks, isDeletedVisible, handleLoading }) => {
  const article_link = useResponsiveLink('', 'article');
  console.log(artworks);

  return (
    <SimpleGrid
      w="96%"
      minChildWidth={['150px', '252px']} // 모바일에서는 150px, 그 외에서는 252px
      spacing="0.5rem"
      justifyContent="center"
      alignItems="center"
      placeItems="center"
    >
      {isDeletedVisible &&
        artworks?.map((artwork) => (
          <Link
            key={artwork.id}
            href={
              artwork.url === ''
                ? '#'
                : article_link + artwork.url.split('/').pop()
            }
            isExternal
            _hover={{ textDecoration: 'none' }}
            target="_blank"
            rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
          >
            <Box
              key={artwork.id}
              m="8px"
              w={['150px', '252px']} // 모바일에서는 150px, 그 외에서는 252px
              h={['150px', '236px']}
              alignItems="center"
              overflow="hidden"
              flexWrap="wrap"
            >
              <Box
                h={['100px', '157px']}
                borderRadius="1rem"
                //  border="2px solid #000"
                position="relative"
              >
                <NextImage
                  alt={artwork.title}
                  width={300}
                  height={300}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    // objectPosition: 'center -2rem',
                    width: '100%',
                    height: '100%',
                    borderRadius: '1rem',
                  }}
                  src={
                    artwork.img_url === ''
                      ? 'http://via.placeholder.com/252x157'
                      : artwork.deleted
                      ? `/api/blurImage?url=${artwork.img_url}`
                      : artwork.img_url
                  }
                  unoptimized
                />
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  bottom={0}
                  left={0}
                  borderRadius="1rem"
                  _hover={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)', // 검은색의 30% 투명도
                  }}
                  zIndex={1}
                />
              </Box>
              <Box p="0.5rem">
                <Text
                  fontSize={['sm', 'xl']}
                  fontWeight="600"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxWidth="100%"
                >
                  {artwork.title}
                </Text>
                <Text fontSize={['xs', 'sm']}>{artwork.board}</Text>
              </Box>
            </Box>
          </Link>
        ))}
      {!isDeletedVisible &&
        artworks?.map(
          (artwork) =>
            !artwork.deleted ? (
              <Link
                key={artwork.id}
                href={
                  artwork.url === ''
                    ? '#'
                    : article_link + artwork.url.split('/').pop()
                }
                isExternal
                _hover={{ textDecoration: 'none' }}
                target="_blank"
                rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
              >
                <Box
                  key={artwork.id}
                  m="8px"
                  w={['150px', '252px']} // 모바일에서는 150px, 그 외에서는 252px
                  h={['150px', '236px']}
                  alignItems="center"
                  overflow="hidden"
                  flexWrap="wrap"
                >
                  <Box
                    h={['100px', '157px']}
                    borderRadius="1rem"
                    //  border="2px solid #000"
                    position="relative"
                  >
                    <NextImage
                      alt={artwork.title}
                      width={300}
                      height={300}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        // objectPosition: 'center -2rem',
                        width: '100%',
                        height: '100%',
                        borderRadius: '1rem',
                      }}
                      src={
                        artwork.img_url === ''
                          ? 'http://via.placeholder.com/252x157'
                          : artwork.img_url
                      }
                      unoptimized
                    />
                    <Box
                      position="absolute"
                      top={0}
                      right={0}
                      bottom={0}
                      left={0}
                      borderRadius="1rem"
                      _hover={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // 검은색의 30% 투명도
                      }}
                      zIndex={1}
                    />
                  </Box>
                  <Box p="0.5rem">
                    <Text
                      fontSize={['sm', 'xl']}
                      fontWeight="600"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      maxWidth="100%"
                    >
                      {artwork.title}
                    </Text>
                    <Text fontSize={['xs', 'sm']}>{artwork.board}</Text>
                    {/* <Text fontSize="sm">
                    {artwork.date.split(' ')[0].slice(0, -1)}
                  </Text> */}
                  </Box>
                </Box>
              </Link>
            ) : null // Render null if deleted is true
        )}
    </SimpleGrid>
  );
};

export default SimpleView;
