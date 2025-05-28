'use client';

import dynamic from 'next/dynamic';

import EmblaCarouselSkeletonLoading from '@/app/album/components/Skeleton/EmblaCarouselSkeletonLoading';
import { MEMBERS } from '@/app/album/lib/const';

const EmblaCarousel = dynamic(
  () => import('@/app/album/components/Slider/EmblaCarousel'),
  {
    ssr: false,
    loading: () => <EmblaCarouselSkeletonLoading type="member" />,
  }
);

export default function MemberAlbum() {
  return (
    <div className="mt-7 flex w-full flex-col md:mt-10">
      <p className="mb-2 pl-2 text-left text-xl font-extrabold md:mb-4 md:pl-8 md:text-2xl">
        멤버별로 모아보기
      </p>
      <EmblaCarousel
        data={{
          type: 'member',
          list: MEMBERS,
        }}
      />
    </div>
  );
}
