import { Box, SimpleGrid } from '@chakra-ui/react';

import SimpleCards from '@/components/ui/Card/SimpleCards';

type Props = {
  artworks: ArtworkList[];
  isDeletedVisible: boolean;
};

export default function SimpleView({ artworks, isDeletedVisible }: Props) {
  const content = () => {
    if (isDeletedVisible) {
      return artworks.map((artwork, index) => (
        <SimpleCards key={index} artwork={artwork} />
      ));
    }
    if (!isDeletedVisible) {
      return artworks.map((artwork, index) =>
        !artwork.deleted ? <SimpleCards key={index} artwork={artwork} /> : null
      );
    }
  };

  return (
    <Box
      w="100%"
      m="1rem auto 2rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        w="100%"
        minChildWidth={['170px', '236px']} // 모바일에서는 150px, 그 외에서는 252px
        spacing={['0.5rem', '0.75rem']}
        justifyContent="center"
        alignItems="center"
        placeItems="center"
      >
        {content()}
      </SimpleGrid>
    </Box>
  );
}
