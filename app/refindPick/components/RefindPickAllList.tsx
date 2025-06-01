'use client';

import { useEffect, useState } from 'react';

import EmblaCarouselSkeletonLoading from '@/app/album/components/Skeleton/EmblaCarouselSkeletonLoading';
import { useGalleryList } from '@/app/album/service/client/useGalleryService';
import GalleryAlbumCard from '@/app/refindPick/components/GalleryAlbumCard';
import { useSideMenuStore } from '@/store/sideMenuStore';

export default function RefindPickAllList() {
  const { data: gallery, isLoading, isError } = useGalleryList();
  const { isOpen: isSideMenuOpen } = useSideMenuStore();
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 사이드 메뉴 열림 + 특정 구간일 때
  const isInTargetRange = windowWidth >= 768 && windowWidth <= 900;
  const isGrid2 = isSideMenuOpen && isInTargetRange;

  // 모바일 구간용 컬럼 수 설정
  let mobileCols = 'grid-cols-2';
  if (windowWidth >= 400) mobileCols = 'grid-cols-3';
  if (windowWidth >= 640) mobileCols = 'grid-cols-4';

  const gridColsClass =
    windowWidth < 768
      ? mobileCols
      : isGrid2
        ? 'md:grid-cols-2'
        : 'md:grid-cols-3';

  if (isError) return <div className="p-8">에러가 발생했습니다.</div>;
  if (isLoading) return <EmblaCarouselSkeletonLoading type="album" />;

  return (
    <div
      className={`mt-8 grid gap-4 px-6 pb-8 ${gridColsClass} lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`}
    >
      {gallery?.albums.map((album) => (
        <GalleryAlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
