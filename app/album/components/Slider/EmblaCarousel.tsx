'use client';

import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import MoreButton from '@/app/album/components/Button/MoreButton';
import ArtistCard from '@/app/album/components/Card/ArtistCard';
import BannerCard from '@/app/album/components/Card/BannerCard';
import GalleryAlbumCard from '@/app/album/components/Card/GalleryAlbumCard';
import GalleryBoardCard from '@/app/album/components/Card/GalleryBoardCard';
import GalleryCustomCard from '@/app/album/components/Card/GalleryCustomCard';
import GalleryFanartCard from '@/app/album/components/Card/GalleryFanartCard';
import GalleryLikedAlbumCard from '@/app/album/components/Card/GalleryLikedAlbumCard';
import MemberCard from '@/app/album/components/Card/MemberCard';
import AddButton from '@/app/myLibrary/components/AddButton';
import { useCreateCustomAlbum } from '@/app/myLibrary/service/client/useMyService';
import { useResponsive } from '@/hooks/useResponsive';
import queryOptions from '@/service/client/queries';

type SliderType =
  | 'fanart'
  | 'album'
  | 'board'
  | 'liked'
  | 'custom'
  | 'member'
  | 'artist'
  | 'banner';

type Props = {
  data: {
    type: SliderType;
    list: any[];
  };
};

export default function EmblaGallerySlider({ data }: Props) {
  const isMobile = useResponsive();
  // Autoplay 플러그인을 banner 타입에만 적용
  const plugins =
    data.type === 'banner' ? [Autoplay({ playOnInit: true, delay: 3000 })] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: data.type === 'banner',
      align: 'start',
      dragFree: isMobile,
      // skipSnaps: true,
      watchDrag: isMobile,
      containScroll: 'trimSnaps',
    },
    plugins
    // []
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // 반응형 값 계산
  const slidesToMove = data.type === 'banner' ? 1 : isMobile ? 1 : 3;
  const slideWidth = isMobile ? 144 : 180;

  // Embla 옵션 동적 업데이트
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit({
      dragFree: isMobile,
      watchDrag: isMobile,
    });
  }, [isMobile, emblaApi]);

  // Embla 네비게이션 상태 업데이트
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);
  // 앨범 추가 관련
  const router = useRouter();
  const handleOnSuccess = (albumId: string) => {
    refreshAlbumArtworks();
    toast.success('새로운 앨범이 추가되었습니다.');
    router.push(`/album/${albumId}`);
  };
  const { queryKey } = queryOptions.myInfo();
  const queryClient = useQueryClient();
  const refreshAlbumArtworks = () => {
    queryClient.invalidateQueries({ queryKey });
  };
  const { mutate: createCustomAlbum } = useCreateCustomAlbum(
    [],
    handleOnSuccess
  );
  const handleAddCustomAlbum = () => {
    createCustomAlbum();
  };

  // 슬라이드 렌더링
  const renderSlides = () => {
    const slideClass = 'min-w-0 flex-none';
    switch (data.type) {
      case 'fanart':
        return (
          <>
            {data.list.map((item, index) => (
              <div
                key={item.id}
                className={slideClass}
                style={{ width: slideWidth }}
              >
                <GalleryFanartCard
                  artwork={item}
                  num={index < 3 ? index + 1 : -1}
                />
              </div>
            ))}
            <div className={slideClass} style={{ width: slideWidth }}>
              <MoreButton type="link" url="/album/weekRanking" />
            </div>
          </>
        );
      case 'board':
        return data.list.map((d: any) => (
          <div key={d.id} className={slideClass} style={{ width: slideWidth }}>
            <GalleryBoardCard album={d} />
          </div>
        ));
      case 'album':
        return data.list.map((d: any) => (
          <div key={d.id} className={slideClass} style={{ width: slideWidth }}>
            <GalleryAlbumCard album={d} />
          </div>
        ));
      case 'liked':
        return data.list.map((d: any) => (
          <div key={d.id} className={slideClass} style={{ width: slideWidth }}>
            <GalleryLikedAlbumCard album={d} />
          </div>
        ));
      case 'member':
        return data.list.map((d: any) => (
          <div key={d.id} className={slideClass} style={{ width: slideWidth }}>
            <MemberCard member={d} />
          </div>
        ));
      case 'artist':
        return data.list.map((d: any) => (
          <div
            key={d.nick}
            className={slideClass}
            style={{ width: slideWidth }}
          >
            <ArtistCard artist={d} />
          </div>
        ));
      case 'banner':
        return data.list.map((d: any, idx) => {
          if (idx === 0 && d.type === 'image') {
            // 첫 번째는 이미지 배너
            return (
              <Link
                href={d.link}
                key="banner-image"
                className="m-auto flex items-center justify-center"
                style={{ flex: '0 0 100%', minWidth: 0, paddingLeft: '1rem' }}
              >
                <Image
                  className="m-auto rounded-2xl"
                  width={750}
                  height={134}
                  priority
                  quality={100}
                  src={d.imageData}
                  alt={d.alt || '배너'}
                />
              </Link>
            );
          }
          return (
            <div
              key={d.title || idx}
              style={{ flex: '0 0 100%', minWidth: 0, paddingLeft: '1rem' }}
            >
              <BannerCard event={d} />
            </div>
          );
        });
      case 'custom':
        return (
          <>
            <div className={slideClass} style={{ width: slideWidth }}>
              <AddButton handleClick={handleAddCustomAlbum} />
            </div>
            {data.list.map((d: any) => (
              <div
                key={d.id}
                className={slideClass}
                style={{ width: slideWidth }}
              >
                <GalleryCustomCard info={d} />
              </div>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  // 네비게이션 핸들러
  const handleScroll = (direction: 'prev' | 'next') => {
    if (!emblaApi) return;
    const currentIndex = emblaApi.selectedScrollSnap();
    const snapList = emblaApi.scrollSnapList();

    const newIndex =
      direction === 'prev'
        ? Math.max(currentIndex - slidesToMove, 0)
        : Math.min(currentIndex + slidesToMove, snapList.length - 1);

    emblaApi.scrollTo(newIndex);
  };

  return (
    <div className="group relative">
      <div
        className={clsx('w-full overflow-hidden', {
          'pl-2 md:pl-8': data.type !== 'banner',
        })}
        ref={emblaRef}
      >
        <div
          className={clsx('flex touch-pan-y touch-pinch-zoom', {
            'gap-2.5': data.type === 'liked',
            '-ml-3': data.type !== 'liked',
          })}
        >
          {renderSlides()}
        </div>
      </div>
      {/* 네비게이션 버튼 */}
      {canScrollPrev && (
        <button
          className={`text-white/60 absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full border-none bg-white p-2.5 opacity-0 shadow-md transition hover:bg-light-button-hover group-hover:opacity-100 dark:bg-dark-card-2 dark:hover:bg-dark-card-3 md:block`}
          type="button"
          onClick={() => handleScroll('prev')}
          aria-label="이전 슬라이드"
        >
          <GrFormPrevious size="22px" />
        </button>
      )}
      {canScrollNext && (
        <button
          className={`text-white/60 absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full border-none bg-white p-2.5 opacity-0 shadow-md transition hover:bg-light-button-hover group-hover:opacity-100 dark:bg-dark-card-2 dark:hover:bg-dark-card-3 md:block`}
          onClick={() => handleScroll('next')}
          aria-label="다음 슬라이드"
        >
          <GrFormNext size="22px" />
        </button>
      )}
    </div>
  );
}
