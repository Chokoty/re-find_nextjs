import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Banner from '@/app/(home)/components/Slide/Banner';
import Event from '@/app/(home)/components/Slide/Event';

const swiperSlideStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

export default function BannerSlider() {
  return (
    <div className="mb-1 w-full">
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
    </div>
  );
}
