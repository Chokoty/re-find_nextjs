import { Box, SimpleGrid } from '@chakra-ui/react';

import SimpleCards from '@/components/card/SimpleCards';

type Props = {
  artworks: ArtworkList[];
  isDeletedVisible: boolean;
};

export default function SimpleView({ artworks, isDeletedVisible }: Props) {
  // const [focusedArtworkId, setFocusedArtworkId] = useState(null);
  // const handleToggleFocus = (id: any) => {
  //   if (id === focusedArtworkId) {
  //     setFocusedArtworkId(null); // Deselect the artwork if it's already focused
  //   } else {
  //     setFocusedArtworkId(id); // Set the focused artwork ID
  //   }
  // };

  const content = () => {
    if (isDeletedVisible) {
      return artworks.map((artwork, index) => (
        <SimpleCards
          key={index}
          artwork={artwork}
          // isFocused={artwork.id === focusedArtworkId}
          // onToggleFocus={handleToggleFocus}
        />
      ));
    }
    if (!isDeletedVisible) {
      return artworks.map(
        (artwork, index) =>
          !artwork.deleted ? (
            <SimpleCards
              key={index}
              artwork={artwork}
              // isFocused={artwork.id === focusedArtworkId}
              // onToggleFocus={handleToggleFocus}
            />
          ) : null // Render null if deleted is true
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
