import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { PiGiftBold } from 'react-icons/pi';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Banner from '@/app/(home)/components/Slide/Banner';
import Event from '@/app/(home)/components/Slide/Event';

type LinkColor = 'green' | 'pink' | 'blue' | 'purple' | 'yellow';

interface EventData {
  title: string;
  linkColor: LinkColor;
  link: string;
  linkContent: JSX.Element;
  isOutLink?: boolean; // 선택적 속성
}

const swiperSlideStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

const events: EventData[] = [
  // {
  //   title: '이세계아이돌 1,000일 기념 🎉 역조공 프로젝트!',
  //   linkColor: 'green',
  //   link: 'https://kko.to/yV8hApkIGX',
  //   linkContent: <>멜론 이벤트 참여하기(~9/1)</>,
  //   isOutLink: true,
  // },
  // {
  //   title: '🎂 징버거님의 생일 기념 갤러리 추가',
  //   linkColor: 'yellow',
  //   link: '/gallery/jingburgerBirthday',
  //   linkContent: <>부가땅 생일 기념 갤러리 보러가기</>,
  // },
  // {
  //   title: '이세돌 1000일 기념 갤러리 추가',
  //   linkColor: 'pink',
  //   link: '/gallery/thousand',
  //   linkContent: <>이세돌 1000일 기념 갤러리 보러가기</>,
  // },
  // {
  //   title: '🎃 Trick or Treat! 해피 할로윈',
  //   linkColor: 'yellow',
  //   link: '/gallery/halloween',
  //   linkContent: <>할로윈 특집 팬아트 보러가기</>,
  // },
  {
    title: '❤️‍🔥 이세돌 데뷔 3주년 축하드립니다!!! ❤️‍🔥',
    linkColor: 'pink',
    link: '/gallery/isd3year',
    linkContent: <>이세돌 3주년 기념 팬아트 보러가기</>,
  },
  {
    title: '팬아트 태그 이상형 월드컵',
    linkColor: 'blue',
    link: '/events/fanartWorldCup',
    linkContent: (
      <>
        <PiGiftBold className="mr-2 size-6" />
        [고공전]세구님 팬아트 태그 월드컵
      </>
    ),
  },
];

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
        {events.map((event, index) => (
          <SwiperSlide key={index} style={swiperSlideStyle}>
            <Event
              title={event.title}
              linkColor={event.linkColor}
              link={event.link}
              linkContent={event.linkContent}
              isOutLink={event.isOutLink || false} // Optional, defaults to false if not present
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
