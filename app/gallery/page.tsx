'use client';

import { Box } from '@chakra-ui/react';

import TopBackground from '@/components/common/TopBackground';
import GalleryTitle from '@/components/gallery/GalleryTitle';
import MemberAlbumSection from '@/components/gallery/MemberAlbumSection';
import RefindPickSection from '@/components/gallery/RefindPickSection';
import ThisWeekTopSection from '@/components/gallery/ThisWeekTopSection';

export default function Gallery() {
  const topTitle = {
    title: '팬아트 갤러리',
    description: '왁물원에 올라온 모든 팬아트들을 한 곳에서!',
  };

  return (
    <Box w="100%">
      {/* <PageTitle topTitle={topTitle} /> */}
      <TopBackground>
        <GalleryTitle titleText={topTitle} isMember={false} />
      </TopBackground>
      <Box
        w="100%"
        // padding="0 1rem"
        position="relative"
        // top={['14rem', '24rem']}
        top={['-60px', '-90px', '-120px', '-180px', '-220px']} // -220px(-60px + -160px)
        zIndex="2"
      >
        <ThisWeekTopSection />
        <RefindPickSection />
        <MemberAlbumSection />
      </Box>
    </Box>
  );
}
