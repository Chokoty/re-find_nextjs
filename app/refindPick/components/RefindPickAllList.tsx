'use client';

import GalleryTitle from '@/app/album/components/GalleryTitle';
import EmblaCarouselSkeletonLoading from '@/app/album/components/Skeleton/EmblaCarouselSkeletonLoading';
import { useGalleryList } from '@/app/album/service/client/useGalleryService';
import GalleryAlbumCard from '@/app/refindPick/components/GalleryAlbumCard';

export default function RefindPickAllList() {
  const { data: gallery, isLoading, isError } = useGalleryList();

  if (isError) return <div className="p-8">에러가 발생했습니다.</div>;
  if (isLoading) return <EmblaCarouselSkeletonLoading type="album" />;

  return (
    <div className="px-6 pb-8">
      <GalleryTitle pageName="리파인드 추천 앨범 전체보기" />
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {gallery?.albums.map((album) => (
          <GalleryAlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
}
