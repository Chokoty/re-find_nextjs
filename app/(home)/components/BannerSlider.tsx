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
        <SwiperSlide style={swiperSlideStyle}>
          <Banner />
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyle}>
          <Event
            title="이세계아이돌 1,000일 기념 🎉 역조공 프로젝트!"
            linkColor="green"
            link="https://kko.to/yV8hApkIGX"
            linkContent={
              <>
                {/* <GiPartyPopper className="mr-2 size-6" /> */}
                멜론 뮤직웨이브 채팅 이벤트 참여 하러가기(~9/1)
              </>
            }
            isOutLink={true}
          />
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyle}>
          <Event
            title="이세돌 1000일 기념 갤러리 추가"
            linkColor="pink"
            link="/gallery/thousand"
            linkContent={
              <>
                {/* <GiPartyPopper className="mr-2 size-6" /> */}
                이세돌 1000일 기념 갤러리 보러가기
              </>
            }
          />
        </SwiperSlide>
        <SwiperSlide style={swiperSlideStyle}>
          <Event
            title="팬아트 태그 이상형 월드컵"
            linkContent={
              <>
                <PiGiftBold className="mr-2 size-6" />
                [고공전]세구님 팬아트 태그 월드컵
              </>
            }
            linkColor="blue"
            link="/events/fanartWorldCup"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
