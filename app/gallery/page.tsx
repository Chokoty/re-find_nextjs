import { Box } from '@chakra-ui/react';

import GalleryTitle from '@/app/gallery/components/GalleryTitle';
import MemberAlbum from '@/app/gallery/components/MemberAlbum';
import RefindPick from '@/app/gallery/components/RefindPick';
import TopBackground from '@/app/gallery/components/TopBackground';
// import ThisWeekTop from '@/app/gallery/components/ui/ThisWeekTop';

export default function Gallery() {
  return (
    <Box w="100%">
      <TopBackground>
        <GalleryTitle pageType="galleryHome" />
      </TopBackground>
      <Box
        as="section"
        w="100%"
        position="relative"
        // top={['-60px', '-90px', '-120px', '-180px', '-220px']} // -220px(-60px + -160px)
        top={['0', '-9rem', '-18rem']}
        zIndex="2"
      >
        {/* <ThisWeekTop /> */}
        <RefindPick />
        <MemberAlbum />
      </Box>
    </Box>
  );
}
