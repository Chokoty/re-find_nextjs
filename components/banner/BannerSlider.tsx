import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Box, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Banner2 from '@/components/banner/Banner2';
import EventBtn from '@/components/event/EventBtn';
import EventDay from '@/components/event/EventDay';
// import MelonVoteModal from '@/components/events/MelonVoteModal';
import { darkMode, lightMode } from '@/styles/theme';

const swiperSlideStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

const BannerSlider = () => {
  // const color = useColorModeValue(lightMode.color2, darkMode.bg);
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
            paddingBottom: '2.5rem',
          }}
        >
          <SwiperSlide style={swiperSlideStyle}>
            <Banner2 />
          </SwiperSlide>
          {/* <SwiperSlide style={swiperSlideStyle}>
            <MelonVoteModal />
          </SwiperSlide> */}
          <SwiperSlide style={swiperSlideStyle}>
            <EventBtn />
          </SwiperSlide>
          <SwiperSlide style={swiperSlideStyle}>
            <EventDay />
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  );
};

export default BannerSlider;
