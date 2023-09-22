import React, { useState } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import SimpleCards from './SimpleCards';

const SimpleView = ({ artworks, isDeletedVisible, handleLoading }) => {
  const [focusedArtworkId, setFocusedArtworkId] = useState(null);

  const handleToggleFocus = (id) => {
    if (id === focusedArtworkId) {
      setFocusedArtworkId(null); // Deselect the artwork if it's already focused
    } else {
      setFocusedArtworkId(id); // Set the focused artwork ID
    }
  };

  return (
    <Box
      w="96%"
      m="0 auto"
      mt="1rem"
      mb="2rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        w="100%"
        minChildWidth={['180px', '236px']} // 모바일에서는 150px, 그 외에서는 252px
        spacing="1rem"
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
