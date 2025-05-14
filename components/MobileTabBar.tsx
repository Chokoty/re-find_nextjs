'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiFolder, FiUsers } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import { LiaHomeSolid } from 'react-icons/lia';

import { useDeleteModeStore } from '@/app/album/store/deleteModeStore';
import { useSelectModeStore } from '@/app/album/store/selectModeStore';
import LoginModal from '@/components/LoginModal';
import useModal from '@/hooks/useModal';
import { useMyInfo } from '@/service/client/useCommonService';

const routerMap = {
  home: {
    type: 'link',
    path: '/',
    name: '홈',
    icon: LiaHomeSolid,
    className: 'size-7',
  },
  search: {
    type: 'link',
    path: '/search',
    name: '검색',
    icon: IoSearchOutline,
    className: 'size-7',
  },
  artists: {
    type: 'link',
    path: '/artists',
    name: '작가',
    icon: FiUsers,
    className: 'size-6',
  },
  album: {
    type: 'button',
    path: '/myLibrary',
    name: '내 라이브러리',
    icon: FiFolder,
    className: 'size-6',
  },
};

export default function MobileTabBar() {
  const currentPathname = usePathname();
  const [isIOS, setIsIOS] = useState(false);
  const router = useRouter();
  const isSelectMode = useSelectModeStore((state) => state.isSelectMode);
  const isDeleteMode = useDeleteModeStore((state) => state.isDeleteMode);
  const { data: userInfo } = useMyInfo();
  const { show } = useModal(LoginModal);
  const handleClick = (path: string) => {
    if (userInfo) {
      router.push(path);
    } else {
      show({ isBackdropClick: true, size: 'full' });
    }
  };

  useEffect(() => {
    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
    setIsIOS(isDeviceIOS);
  }, []);

  return (
    <nav
      className={clsx(
        'fixed bottom-0 z-[200] flex w-full justify-center transition-transform duration-200 ease-in-out md:hidden',
        isSelectMode || isDeleteMode ? '-translate-y-[-60px]' : 'translate-y-0'
      )}
    >
      <div
        className={`flex w-full items-center justify-evenly bg-white shadow-navBottom backdrop-blur-md dark:border-whiteAlpha-300 dark:bg-dark-background ${isIOS ? 'h-[80px] pb-2' : 'h-[60px]'} dark:shadow-navBottomDark`}
      >
        {Object.keys(routerMap).map((key) => {
          const typedKey = key as keyof typeof routerMap;
          const {
            type,
            path: eachPath,
            name,
            icon: Icon,
            className: iconStyle,
          } = routerMap[typedKey];
          const isActive =
            eachPath === '/'
              ? currentPathname === '/'
              : currentPathname.startsWith(eachPath);

          const tabClassName = clsx(
            'flex size-16 flex-col items-center justify-center gap-0.5 active:bg-blackAlpha-100 dark:active:bg-whiteAlpha-300',
            {
              'text-gray-700 dark:text-white': isActive,
              'text-blackAlpha-500 dark:text-whiteAlpha-500': !isActive,
            }
          );

          const iconWrapperClass = 'flex size-7 items-center justify-center';

          const content = (
            <>
              <div className={iconWrapperClass}>
                <Icon className={iconStyle} />
              </div>
              <span className="w-20 text-center text-xs">{name}</span>
            </>
          );

          if (type === 'button') {
            return (
              <button
                key={name}
                className={tabClassName}
                onClick={() => handleClick(eachPath)}
                type="button"
              >
                {content}
              </button>
            );
          }
          return (
            <Link href={eachPath} key={name} className={tabClassName}>
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
