'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { MdHomeFilled } from 'react-icons/md';

import SearchModalOpener from '@/app/search/components/Modal/SearchModalOpener';
import BackButton from '@/components/Button/BackButton';
import WorldcupSkipButton from '@/components/Button/WorldcupSkipButton';
import DesktopHeaderTab from '@/components/Header/DesktopHeaderTab';
import DesktopMenuTab from '@/components/Header/DesktopMenuTab';
import { useResponsive } from '@/hooks/useResponsive';
import { useScroll } from '@/hooks/useScroll';
import { Logo, 똥강아지1 } from '@/lib/images';

const Modals = dynamic(() => import('@/components/Modal/Modals'), {
  ssr: false,
});

export default function Header() {
  const pathname = usePathname();
  const isGalleryPage = pathname.includes('/gallery');
  const isScrolling = useScroll(60);
  const isNotScrollingGalleryPage = isGalleryPage && !isScrolling;
  const isMobile = useResponsive();

  return (
    <header
      className={clsx('fixed top-0 z-[200] h-[64px] w-full transition', {
        'bg-white dark:bg-dark-background': !isNotScrollingGalleryPage,
        'bg-blackAlpha-500 backdrop-blur': isNotScrollingGalleryPage,
      })}
    >
      <nav
        className={clsx(
          'flex size-full items-center justify-between px-4 shadow-navTop transition',
          {
            'dark:shadow-navTopDark2': isScrolling,
            'dark:shadow-none': !isScrolling,
          }
        )}
      >
        <HeaderContent isMobile={isMobile} />
      </nav>
      <Modals />
    </header>
  );
}

const etcPathMap = {
  '/more/notice': '공지사항',
  '/more/support': '문의',
  '/more/about': '소개',
  '/more': '좀 더!',
  '/events': '이벤트',
  '/events/randomGacha': '이벤트',
  '/events/fanartWorldCup': '고공전',
  '/events/fanartWorldCup/credit': '크레딧',
  '/events/gomemVotePredict': '2024 고멤 인기투표 예측',
} as const;

type EtcPathMapKeyType = keyof typeof etcPathMap;

const HeaderContent = ({ isMobile }: { isMobile: boolean }) => {
  const pathname = usePathname();
  const pathNameParts = pathname.split('/');
  const name = pathNameParts[pathNameParts.length - 1];

  // const isMorePath = pathname.startsWith('/more');
  // const isEvents = pathname.startsWith('/events');

  // 이벤트 혹은 더보기 페이지일 경우 헤더를 다르게 표시
  // if (isMorePath || isEvents) {
  // if (isMorePath) {
  //   return (
  //     <>
  //       <BackButton />
  //       <h1 className="flex items-center justify-center text-xl font-bold">
  //         {etcPathMap[pathname as EtcPathMapKeyType] ?? '기타'}
  //       </h1>
  //       {name === 'fanartWorldCup' ? (
  //         <WorldcupSkipButton />
  //       ) : (
  //         <div className="size-12" />
  //       )}
  //     </>
  //   );
  // }

  // 모바일 헤더 표시
  if (isMobile) {
    return (
      <div className="flex items-center justify-center gap-2 md:hidden">
        <div className="flex size-[48px] items-center justify-center rounded-full shadow-sm hover:bg-white dark:shadow-none hover:dark:bg-dark-card">
          <Image
            width={100}
            height={100}
            className="size-[32px] rounded-full object-cover"
            src={똥강아지1}
            alt={''}
            unoptimized
          />
        </div>
        <h2>모바일 헤더입니다</h2>
      </div>
    );
  }
  // 데스크톱 헤더 표시
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="mr-2 size-11 rounded-full p-2 transition hover:bg-blackAlpha-100 active:bg-blackAlpha-200 dark:hover:bg-whiteAlpha-100 dark:active:bg-whiteAlpha-300 md:mr-4">
          <Link href="/">
            <Image
              alt="리파인드 로고"
              width={32}
              height={32}
              src={Logo}
              priority
            />
          </Link>
        </div>
        <DesktopHeaderTab />
      </div>
      <Suspense>
        <SearchModalOpener />
      </Suspense>
      <DesktopMenuTab />
    </>
  );
};
