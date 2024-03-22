import { Box, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import TopBackground from '@/components/common/TopBackground';
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
      <TopBackground isAlbum={false}>
        {/* <GalleryTitle titleText={topTitle} isMember={false} /> */}
        {/* <PageTitle topTitle={topTitle} /> */}
        <Box></Box>
      </TopBackground>
      <Box w="100%" className="layout">
        {children}
      </Box>
    </Box>
  );
}
