'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';

import BannerSkeleton from '@/app/(home)/components/BannerSkeleton';
import TopTitle from '@/app/(home)/components/TopTitle';
import Upload from '@/app/(home)/components/Upload';
import SearchModalOpener from '@/app/search/components/Modal/SearchModalOpener';

export default function SearchMobile() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); // 스크롤 컨테이너 참조

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };
  const BannerSlider = dynamic(
    () => import('@/app/(home)/components/BannerSlider'),
    {
      ssr: false,
      loading: () => <BannerSkeleton />,
    }
  );

  return (
    <div
      ref={scrollContainerRef} // 스크롤 이벤트 연결
      className="mt-2 flex w-full flex-col items-center justify-start gap-2  px-3 pb-[60px] md:hidden"
    >
      <SearchModalOpener />
      <BannerSlider />
      <TopTitle />
      <Upload scrollToTop={scrollToTop} />
    </div>
  );
}
