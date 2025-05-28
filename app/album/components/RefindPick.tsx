'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import EmblaCarouselSkeletonLoading from '@/app/album/components/Skeleton/EmblaCarouselSkeletonLoading';
import { useGalleryList } from '@/app/album/service/client/useGalleryService';

const EmblaCarousel = dynamic(
  () => import('@/app/album/components/Slider/EmblaCarousel'),
  {
    ssr: false,
    loading: () => <EmblaCarouselSkeletonLoading type="album" />,
  }
);

export default function RefindPick() {
  const { data: gallery, isLoading, isError } = useGalleryList();
  return (
    <div className="mt-7 flex w-full flex-col md:mt-10">
      {/* <div className="mb-2 flex w-full content-end justify-between gap-4 pl-2 pr-1 md:mb-4 md:pl-8 md:pr-2"> */}
      {/* <p className="mb-2 pl-2 text-left text-xl font-extrabold md:mb-4 md:pl-8 md:text-2xl">
        리파인드 추천 앨범
      </p> */}
      <div className="mb-2 flex w-full content-end justify-between gap-4 pl-2 pr-1 md:mb-4 md:pl-8 md:pr-2">
        <Link href="/refindPick" className="flex items-center hover:underline">
          <p className="text-left text-xl font-extrabold md:text-2xl">
            리파인드 추천 앨범
          </p>
        </Link>
        <Link
          href="/refindPick"
          className="flex items-center text-blackAlpha-700 hover:underline dark:text-whiteAlpha-700"
        >
          <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
            모두보기
          </p>
        </Link>
      </div>
      {isError && <div className="pl-2 md:pl-8">에러가 발생했습니다.</div>}
      {/* {isLoading && <div className="pl-2 md:pl-8">로딩 중...</div>} */}
      {isLoading && <EmblaCarouselSkeletonLoading type="album" />}
      {gallery && (
        <EmblaCarousel data={{ type: 'album', list: gallery.albums }} />
      )}
    </div>
  );
}
