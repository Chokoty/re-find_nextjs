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
  const backgroundImageUrl =
    '/static/images/gallery/크리스마스커버일러스트_1920x1080.jpg'; // 배경 이미지 URL

  return (
    <Box className="body" minH="240vh" background={bg} w="100%" m="0 auto">
      <GalleryHeader title={title} />
      <TopBackground backgroundImageUrl={backgroundImageUrl} isAlbum={false}>
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
