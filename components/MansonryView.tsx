import React from 'react';
import NextImage from 'next/image';
import { Box, Image, Link } from '@chakra-ui/react';

import { useResponsiveLink } from '../hook/useResponsiveLink';

const MasonryView = ({ artworks }) => {
  const article_link = useResponsiveLink('', 'article');
  return (
    <Box
      padding={4}
      w="100%"
      maxW="900px"
      mx="auto"
      sx={{ columnCount: [1, 2, 3], columnGap: '8px' }}
      background="#f32a2a"
    >
      {artworks.map((artwork) =>
        !artwork.deleted ? (
          // <Image
          //   key={src?.id}
          //   w="100%"
          //   borderRadius="xl"
          //   mb={2}
          //   display="inline-block"
          //   src={src}
          //   alt="Alt"
          // />
          // <NextImage
          //   key={src?.id}
          //   alt={src?.title}
          //   width={300}
          //   height={300}
          //   src={src?.img_url}
          //   unoptimized
          // />
          <Box
            w="100%"
            borderRadius="xl"
            mb={2}
            display="inline-block"
            // src={src}
            // alt="Alt"
            key={artwork.id}
            // m="8px"
            // w="252px"
            // h="234px"
            // alignItems="center"
            // borderRadius="1rem"
            // overflow="hidden"
            // flexWrap="wrap"
          >
            <Link
              href={
                artwork.url === ''
                  ? '#'
                  : article_link + artwork.url.split('/').pop()
              }
              isExternal
            >
              <NextImage
                alt={artwork.title}
                width={300}
                height={300}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  // objectPosition: 'center -50px',
                  width: '100%',
                  height: '100%',
                }}
                src={artwork.img_url}
                unoptimized
              />
            </Link>
          </Box>
        ) : null
      )}
    </Box>
  );
};

export default MasonryView;
