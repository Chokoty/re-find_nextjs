import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

import { darkMode, lightMode } from '@/lib/theme';

export default function Title() {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  // const color = useColorModeValue(lightMode.color, darkMode.color);

  const handleTitleClick = () => {
    window.location.href = '/';
  };

  return (
    <Box className="title" onClick={handleTitleClick}>
      <Link href="/" className="content">
        <Heading className="title-main" fontFamily={'ONE-Mobile-POP'}>
          <span style={{ color: highlightColor }}>RE:</span>
          FIND
        </Heading>
      </Link>
    </Box>
  );
}
