'use client';

import dynamic from 'next/dynamic';
import type { StaticImageData } from 'next/image';
import { PiGiftBold, PiRankingFill } from 'react-icons/pi';

import EmblaCarouselSkeletonLoading from '@/app/album/components/Skeleton/EmblaCarouselSkeletonLoading';
import { MainBanner } from '@/lib/images';

type LinkColor = 'green' | 'pink' | 'blue' | 'purple' | 'yellow';

interface EventData {
  title: string;
  linkColor: LinkColor;
  link: string;
  linkContent: JSX.Element;
  isOutLink?: boolean; // 선택적 속성
}

const EmblaCarousel = dynamic(
  () => import('@/app/album/components/Slider/EmblaCarousel'),
  {
    ssr: false,
    loading: () => <EmblaCarouselSkeletonLoading type="banner" />,
  }
);

const events: (
  | EventData
  | { type: 'image'; imageData: StaticImageData; link: string; alt?: string }
)[] = [
  {
    type: 'image',
    imageData: MainBanner,
    link: '/more/about', // 배너 클릭 시 이동할 링크
    alt: '메인 배너',
  },
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
  //   link: '/album/jingburgerBirthday',
  //   linkContent: <>부가땅 생일 기념 갤러리 보러가기</>,
  // },
  // {
  //   title: '이세돌 1000일 기념 갤러리 추가',
  //   linkColor: 'pink',
  //   link: '/album/thousand',
  //   linkContent: <>이세돌 1000일 기념 갤러리 보러가기</>,
  // },
  // {
  //   title: '🎃 Trick or Treat! 해피 할로윈',
  //   linkColor: 'yellow',
  //   link: '/album/halloween',
  //   linkContent: <>할로윈 특집 팬아트 보러가기</>,
  // },
  // {
  //   title: '2024 리파인드 리캡',
  //   linkColor: 'green',
  //   link: '/recap2024',
  //   linkContent: <>2024 리파인드 돌아보기</>,
  // },
  {
    title: '❤️‍🔥 이세돌 데뷔 3주년 축하드립니다!!! ❤️‍🔥',
    linkColor: 'pink',
    link: '/album/isd3year',
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
  {
    title: '재미로 보는 고멤 인기투표 예측',
    linkColor: 'green',
    link: '/events/gomemVotePredict',
    linkContent: (
      <>
        <PiRankingFill className="mr-2 size-6" />
        왁물원 고멤 언급 순위 레이스 보기
      </>
    ),
  },
];

export default function BannerSlider() {
  return (
    <div className="mt-7 flex w-full flex-col md:mt-10 md:w-11/12">
      <EmblaCarousel
        data={{
          type: 'banner',
          list: events,
        }}
      />
    </div>
  );
}
