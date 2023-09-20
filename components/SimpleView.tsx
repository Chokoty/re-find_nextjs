import React, { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { SimpleGrid, Text, Box, Link } from '@chakra-ui/react';

import { useResponsiveLink } from '../hook/useResponsiveLink';
import SimpleCards from './SimpleCards';

const SimpleView = ({ artworks, isDeletedVisible, handleLoading }) => {
  const article_link = useResponsiveLink('', 'article');
  const [focusedArtworkId, setFocusedArtworkId] = useState(null);

  // useEffect(() => {
  //   console.log(artworks);
  //   handleLoading(false);
  // }, [artworks]);
  const handleToggleFocus = (id) => {
    if (id === focusedArtworkId) {
      setFocusedArtworkId(null); // Deselect the artwork if it's already focused
    } else {
      setFocusedArtworkId(id); // Set the focused artwork ID
    }
  };

  return (
    <SimpleGrid
      w="96%"
      minChildWidth={['180px', '236px']} // 모바일에서는 150px, 그 외에서는 252px
      spacing="0.5rem"
      justifyContent="center"
      alignItems="center"
      placeItems="center"
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
  );
};

export default SimpleView;
