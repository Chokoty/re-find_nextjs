import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import {
  Autoplay,
  EffectCreative,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Banner2 from '@/components/banner/Banner2';
<<<<<<< HEAD
// import HalloweenBtn from '@/components/events/HalloweenBtn';
=======
import HalloweenBtn from '@/components/events/HalloweenBtn';
>>>>>>> develop
// import MelonVoteModal from '@/components/events/MelonVoteModal';
import { darkMode, lightMode } from '@/styles/theme';

const swiperSlideStyle = {
  // width: '508px',
  height: '130px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const BannerSlider = () => {
  const color = useColorModeValue(lightMode.color2, darkMode.bg);

  return (
    <Box
      // pt="1.5rem"
      pb="1rem"
      w="100%"
      background={color}
    >
      <Box maxW="540px" overflow="hidden" m="0 auto">
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
          // effect={'creative'}
          // creativeEffect={{
          //   prev: {
          //     shadow: true,
          //     translate: [0, 0, -400],
          //   },
          //   next: {
          //     translate: ['100%', 0, 0],
          //   },
          // }}
          style={{
            paddingBottom: '1.6rem',
          }}
        >
          <SwiperSlide style={swiperSlideStyle}>
            <Banner2 />
          </SwiperSlide>
          {/* <SwiperSlide style={swiperSlideStyle}>
            <MelonVoteModal />
          </SwiperSlide> */}
          {/* <SwiperSlide style={swiperSlideStyle}>
            <HalloweenBtn />
          </SwiperSlide> */}
        </Swiper>
      </Box>
    </Box>
  );
};

export default BannerSlider;
