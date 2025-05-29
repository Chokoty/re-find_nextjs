'use client';

import { useEffect, useState } from 'react';

import EmblaCarouselSkeletonLoading from '@/app/album/components/Skeleton/EmblaCarouselSkeletonLoading';
import { useGalleryList } from '@/app/album/service/client/useGalleryService';
import GalleryAlbumCard from '@/app/refindPick/components/GalleryAlbumCard';
import { useSideMenuStore } from '@/store/sideMenuStore';

export default function RefindPickAllList() {
  const { data: gallery, isLoading, isError } = useGalleryList();
  const { isOpen: isSideMenuOpen } = useSideMenuStore();
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  // 브라우저 너비 추적
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // 초기값 설정
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isInTargetRange =
    windowWidth !== null && windowWidth >= 768 && windowWidth <= 900;
  const isGrid2 = isSideMenuOpen && isInTargetRange;

  if (isError) return <div className="p-8">에러가 발생했습니다.</div>;
  if (isLoading) return <EmblaCarouselSkeletonLoading type="album" />;

  return (
    <div
      className={`mt-4 grid grid-cols-2 gap-4 px-6 pb-8 ${
        isGrid2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
      } lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`}
    >
      {gallery?.albums.map((album) => (
        <GalleryAlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
