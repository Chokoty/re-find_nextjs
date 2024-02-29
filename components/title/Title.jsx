import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import { darkMode, lightMode } from '@/styles/theme';

export default function Title({ onTitleClick }) {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  // const color = useColorModeValue(lightMode.color, darkMode.color);

  const handleTitleClick = () => {
    window.location.href = '/';
  };

  return (
    <Box className="title" onClick={onTitleClick}>
      <Link href="/" className="content">
        <Heading className="title-main" fontFamily={'ONE-Mobile-POP'}>
          <span style={{ color: highlightColor }}>RE:</span>
          FIND
        </Heading>
      </Link>
    </Box>
  );
}
