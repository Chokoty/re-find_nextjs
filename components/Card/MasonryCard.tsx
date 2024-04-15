import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

import CardImage from '@/components/CardImage/CardImage';
import { darkMode, lightMode } from '@/lib/theme';

type Props = {
  artwork: ArtworkList | GalleryArtworkList;
};

export default function MasonryCard({ artwork }: Props) {
  const highlight = useColorModeValue(lightMode.highlight, darkMode.highlight);
  const authorTextColor = useColorModeValue('rgb(23, 25, 35)', '#FFFFFFB3');

  const authorName = 'author' in artwork ? artwork.author : '';

  return (
    <Box display="inline-block">
      <CardImage data={artwork} />
      <Box
        maxW="236px"
        w="100%"
        h="auto"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="start"
        // mt="0.5rem"
      >
        <Text
          fontSize="md"
          textAlign="left"
          fontWeight={500}
          noOfLines={1}
          w="100%"
        >
          {artwork.title}
        </Text>
        <NextLink
          href={`/artists/${authorName}`}
          style={{
            width: '100%',
          }}
        >
          <Text
            w="100%"
            fontSize="sm"
            textAlign="left"
            color={authorTextColor}
            fontWeight={500}
            noOfLines={1}
            _hover={{
              color: highlight,
            }}
          >
            {`작가: ${authorName}`}
          </Text>
        </NextLink>
      </Box>
    </Box>
  );
}
