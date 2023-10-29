import { Box, SimpleGrid } from '@chakra-ui/react';
import React, { useState } from 'react';

import SimpleCards from '@/components/cards/SimpleCards';

const SimpleView = ({ artworks, isDeletedVisible }) => {
  const [focusedArtworkId, setFocusedArtworkId] = useState(null);

  const handleToggleFocus = (id: any) => {
    if (id === focusedArtworkId) {
      setFocusedArtworkId(null); // Deselect the artwork if it's already focused
    } else {
      setFocusedArtworkId(id); // Set the focused artwork ID
    }
  };

  return (
    <Box
      w="94%"
      m="0 auto"
      mt="1rem"
      mb="2rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        w={['100%', '90%']}
        minChildWidth={['170px', '236px']} // 모바일에서는 150px, 그 외에서는 252px
        spacing={['0.5rem', '0.75rem']}
        justifyContent="center"
        alignItems="center"
        placeItems="center"
        m="0 auto"
      >
        {isDeletedVisible &&
          artworks?.map((artwork, index) => (
            <SimpleCards
              key={index}
              artwork={artwork}
              isFocused={artwork.id === focusedArtworkId}
              onToggleFocus={handleToggleFocus}
            />
          ))}
        {!isDeletedVisible &&
          artworks?.map(
            (artwork, index) =>
              !artwork.deleted ? (
                <SimpleCards
                  key={index}
                  artwork={artwork}
                  isFocused={artwork.id === focusedArtworkId}
                  onToggleFocus={handleToggleFocus}
                />
              ) : null // Render null if deleted is true
          )}
      </SimpleGrid>
    </Box>
  );
};

export default SimpleView;
