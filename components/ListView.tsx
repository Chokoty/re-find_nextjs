import React from 'react';
import NextImage from 'next/image';
import { Flex, Text, Box, Link } from '@chakra-ui/react';

import { useResponsiveLink } from '../hook/useResponsiveLink';

const ListView = ({ artworks }) => {
  const article_link = useResponsiveLink('', 'article');
  console.log(artworks);

  return (
    <Flex
      flexDirection="column"
      w="100%"
      justifyContent="center"
      alignItems="center"
    >
      {artworks?.map((artwork) =>
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
            rel="noopener noreferrer"
          >
            <Box m="1rem" maxW="756px">
              <Box w="100%" borderRadius="1rem" position="relative">
                <NextImage
                  alt={artwork.title}
                  width={1000}
                  height={1000}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center top',
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
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                  zIndex={1}
                />
              </Box>
              {/* <Box p="0.5rem">
                <Text fontSize="xl" fontWeight="600">
                  {artwork.title.length > 15
                    ? `${artwork.title.slice(0, 15)}...`
                    : artwork.title}
                </Text>
                <Text fontSize="sm">{artwork.board}</Text>
              </Box> */}
            </Box>
          </Link>
        ) : null
      )}
    </Flex>
  );
};

export default ListView;
