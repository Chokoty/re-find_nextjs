import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Box, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Banner from '@/app/(home)/components/ui/Slide/Banner';
import Event from '@/app/(home)/components/ui/Slide/Event';
import { darkMode, lightMode } from '@/lib/theme';

const swiperSlideStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

export default function BannerSlider() {
  const bgColor = useColorModeValue(lightMode.bg, darkMode.bg);
  const width = useBreakpointValue({ base: '90%', md: '100%' });

  return (
    <Box maxW="700px" mb="1rem" w={width} background={bgColor}>
      <Box overflow="hidden" m="0 auto">
        <Swiper
          className="mySwiper"
          // navigation={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          loop={true}
          grabCursor={true}
          style={{
            paddingBottom: '2.5rem',
          }}
        >
          <SwiperSlide style={swiperSlideStyle}>
            <Banner />
          </SwiperSlide>
          <SwiperSlide style={swiperSlideStyle}>
            <Event />
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  );
}
