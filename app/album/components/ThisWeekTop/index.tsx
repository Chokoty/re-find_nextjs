'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import EmblaCarouselSkeletonLoading from '@/app/album/components/Skeleton/EmblaCarouselSkeletonLoading';
import ThisWeekBtnList from '@/app/album/components/ThisWeekTop/ThisWeekBtnList';
import { test } from '@/constants/test';

const EmblaCarousel = dynamic(
  () => import('@/app/album/components/Slider/EmblaCarousel'),
  {
    ssr: false,
    loading: () => <EmblaCarouselSkeletonLoading type="fanart" />,
  }
);

export default function ThisWeekTop() {
  const [selectedItem, setSelectedItem] = useState('전체');

  return (
    <div className="mt-7 flex w-full flex-col md:mt-10">
      <p className="mb-2 pl-2 text-left text-xl font-extrabold md:mb-4 md:pl-8 md:text-2xl">
        이 주의 왁물원 인기 팬아트!
      </p>
      <ThisWeekBtnList
        range={{ start: 0, end: 7 }}
        selected={selectedItem}
        setSelected={setSelectedItem}
        isdPick={false}
      />
      <EmblaCarousel
        data={{
          type: 'fanart',
          list: test,
        }}
      />
    </div>
  );
}
