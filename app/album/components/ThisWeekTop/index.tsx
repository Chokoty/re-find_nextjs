'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import GalleryFanartSliderSkeleton from '@/app/gallery/components/Skeleton/GalleryFanartSliderSkeleton';
import ThisWeekBtnList from '@/app/gallery/components/ThisWeekTop/ThisWeekBtnList';
import { test } from '@/constants/test';

const GallerySlider = dynamic(
  () => import('@/app/gallery/components/Slider/GallerySlider'),
  {
    ssr: false,
    loading: () => <GalleryFanartSliderSkeleton />,
  }
);

export default function ThisWeekTop() {
  const [selectedItem, setSelectedItem] = useState('전체');

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 w-full px-8 md:mb-6">
        <p className="text-left text-2xl font-extrabold md:text-4xl">
          이 주의 왁물원 인기 팬아트!
        </p>
      </div>
      <ThisWeekBtnList
        range={{ start: 0, end: 7 }}
        selected={selectedItem}
        setSelected={setSelectedItem}
        isdPick={false}
      />
      <GallerySlider
        data={{
          type: 'fanart',
          list: test,
        }}
      />
    </div>
  );
}
