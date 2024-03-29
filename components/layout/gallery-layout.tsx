import { Box, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import GalleryHeader from '@/components/layout/GalleryHeader';
import { darkMode, lightMode } from '@/styles/theme';

type Props = {
  children: ReactNode;
  title: string;
};

export default function DetailedGalleryLayout({ children, title }: Props) {
  const bg = useColorModeValue(lightMode.bg, darkMode.bg);

  return (
    <Box className="body" minH="240vh" background={bg} w="100%" m="0 auto">
      <GalleryHeader title={title} />
      <Box w="100%" className="layout">
        {children}
      </Box>
    </Box>
  );
}
