import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { PiGiftBold } from 'react-icons/pi';
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
        {/* <SwiperSlide style={swiperSlideStyle}>
          <Event
            title="주르르님 생일 축하드립니다!"
            linkColor="pink"
            link="/gallery/jururuBirthday"
            linkContent={
              <>
                <GiPartyPopper className="mr-2 size-6" />
                주르르님 생일 팬아트 보러가기
              </>
            }
          />
        </SwiperSlide> */}
        <SwiperSlide style={swiperSlideStyle}>
          <Banner />
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyle}>
          <Event
            title="이벤트 페이지 개설"
            linkContent={
              <>
                <PiGiftBold className="mr-2 size-6" />
                팬아트 가챠 하러가기
              </>
            }
            linkColor="purple"
            link="/events"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
