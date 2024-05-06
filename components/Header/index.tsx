'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SearchModalOpener from '@/app/search/components/Modal/SearchModalOpener';
import BackButton from '@/components/Button/BackButton';
import DesktopHeaderTab from '@/components/Header/DesktopHeaderTab';
import DesktopMenuTab from '@/components/Header/DesktopMenuTab';
import { useScroll } from '@/hooks/useScroll';
import { Logo } from '@/lib/images';

const Modals = dynamic(() => import('@/components/Modal/Modals'), {
  ssr: false,
});

export default function Header() {
  const pathname = usePathname();
  const isGalleryPage = pathname.includes('/gallery');
  const isScrolling = useScroll(60);
  const isNotScrollingGalleryPage = isGalleryPage && !isScrolling;

  return (
    <header
      className={clsx('fixed top-0 z-[200] h-[60px] w-full transition', {
        'bg-white dark:bg-dark-card': !isNotScrollingGalleryPage,
        'bg-blackAlpha-500 backdrop-blur': isNotScrollingGalleryPage,
      })}
    >
      <nav
        className={clsx(
          'flex size-full items-center justify-between px-4 shadow-navTop transition',
          {
            'dark:shadow-navTopDark': isScrolling,
            'dark:shadow-none': !isScrolling,
          }
        )}
      >
        <HeaderContent />
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
  '/events': '이벤트관',
  '/events/randomGacha': '이벤트관',
} as const;

type EtcPathMapKeyType = keyof typeof etcPathMap;

const HeaderContent = () => {
  const pathname = usePathname();
  const isMorePath = pathname.startsWith('/more');
  const isEvents = pathname.startsWith('/events');
  const isSearchPage = pathname.startsWith('/search');

  // 이벤트 혹은 더보기 페이지일 경우 헤더를 다르게 표시
  if (isMorePath || isEvents) {
    return (
      <>
        <BackButton />
        <h1 className="flex items-center justify-center text-xl font-bold">
          {etcPathMap[pathname as EtcPathMapKeyType] ?? '기타'}
        </h1>
        <div className="size-12" />
      </>
    );
  }

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
      {!isSearchPage && <SearchModalOpener />}
      <DesktopMenuTab />
    </>
  );
};
