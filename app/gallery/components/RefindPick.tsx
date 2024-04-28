import { Box, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import GalleryAlbumSliderSkeleton from '@/app/gallery/components/Skeleton/GalleryAlbumSliderSkeleton';

const GallerySlider = dynamic(
  () => import('@/app/gallery/components/Slider/GallerySlider'),
  {
    ssr: false,
    loading: () => <GalleryAlbumSliderSkeleton />,
  }
);

export default function RefindPick() {
  return (
    <Box
      w="100%"
      display="flex"
      flexDir="column"
      gap="30px"
      // mt="120px"
      pl={['1rem', '2rem', '2rem']}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        textAlign="center"
        w="100%"
        // h="80px"
        // p={['0 1rem', '0 2rem', '0 2rem']}
      >
        <Text textAlign="left" fontWeight="800" fontSize={['xl', '2xl']}>
          리파인드 추천 앨범
        </Text>
      </Box>
      <GallerySlider
        type="album"
        customSwiperOptions={{
          style: {
            padding: '0',
          },
          spaceBetween: 8,
          breakpoints: {
            480: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            1055: {
              slidesPerView: 3.5,
              spaceBetween: 16,
            },
            // 1024: {
            //   slidesPerView: 3.5,
            // },
          },
        }}
      />
    </Box>
  );
}
