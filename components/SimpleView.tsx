import React, { useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { SimpleGrid, Text, Box, Link } from '@chakra-ui/react';

import { useResponsiveLink } from '../hook/useResponsiveLink';

const SimpleView = ({ artworks }) => {
  const article_link = useResponsiveLink('', 'article');
  console.log(artworks);

  return (
    <SimpleGrid
      w="96%"
      minChildWidth="252px"
      m="0 2rem"
      spacing="0.5rem"
      justifyContent="center"
      alignItems="center"
      placeItems="center"
      p="1rem"
    >
      {artworks?.map(
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
                w="252px"
                h="236px"
                alignItems="center"
                overflow="hidden"
                flexWrap="wrap"
              >
                <Box
                  h="157px"
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
                    src={artwork.img_url}
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
                  <Text fontSize="xl" fontWeight="600">
                    {artwork.title.length > 15
                      ? `${artwork.title.slice(0, 15)}...`
                      : artwork.title}
                  </Text>
                  <Text fontSize="sm">{artwork.board}</Text>
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
