import { Box } from '@chakra-ui/react';

import TopBackground from '@/components/common/TopBackground';
import GalleryTitle from '@/components/gallery/GalleryTitle';
import MemberAlbumSection from '@/components/gallery/MemberAlbumSection';
import RefindPickSection from '@/components/gallery/RefindPickSection';
import ThisWeekTopSection from '@/components/gallery/ThisWeekTopSection';

export default function Gallery() {
  return (
    <Box w="100%">
      {/* <PageTitle topTitle={topTitle} /> */}
      <TopBackground>
        <GalleryTitle pageType="galleryHome" />
      </TopBackground>
      <Box
        as="section"
        w="100%"
        // padding="0 1rem"
        position="relative"
        // top={['14rem', '24rem']}
        top={['-60px', '-90px', '-120px', '-180px', '-220px']} // -220px(-60px + -160px)
        zIndex="2"
      >
        {/* <ThisWeekTopSection /> */}
        <RefindPickSection />
        <MemberAlbumSection />
      </Box>
    </Box>
  );
}
