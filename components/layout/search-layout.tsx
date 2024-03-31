import { Box, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import React from 'react';

import SearchHeader from '@/components/layout/SearchHeader';
import { darkMode, lightMode } from '@/styles/theme';

interface OtherLayoutProps {
  children: ReactNode;
  title: string;
}

export default function MoreLayout({ children, title }: OtherLayoutProps) {
  // const bgColor = useColorModeValue(lightMode.highlight, darkMode.highlight);
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  return (
    <Box className="body" background={bg} w="100%" m="0 auto">
      <SearchHeader title={title} />
      {/* <Divider
        className="divider"
        style={{
          margin: '1rem auto',
          maxWidth: '10rem',
          backgroundColor: bgColor,
          height: '5px',
        }}
      /> */}
      <Box w="100%" className="layout">
        {children}
      </Box>
    </Box>
  );
}
