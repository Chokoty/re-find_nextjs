'use client';

import dynamic from 'next/dynamic';

import EmblaCarouselSkeletonLoading from '@/app/album/components/Skeleton/EmblaCarouselSkeletonLoading';
import { UPDATED_GALLERY_LIST } from '@/app/album/lib/const';

const EmblaCarousel = dynamic(
  () => import('@/app/album/components/Slider/EmblaCarousel'),
  {
    ssr: false,
    loading: () => <EmblaCarouselSkeletonLoading type="board" />,
  }
);
export default function BoardList() {
  return (
    <div className="mt-7 flex w-full flex-col md:mt-10">
      <p className="mb-2 pl-2 text-left text-xl font-extrabold md:mb-4 md:pl-8 md:text-2xl">
        왁물원 게시판 앨범
      </p>
      <EmblaCarousel
        data={{
          type: 'board',
          list: UPDATED_GALLERY_LIST,
        }}
      />
    </div>
  );
}
