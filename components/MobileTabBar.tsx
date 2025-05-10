'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { IoMdImages } from 'react-icons/io';
import { MdHomeFilled } from 'react-icons/md';

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
    icon: MdHomeFilled,
    className: 'size-7',
  },
  search: {
    type: 'link',
    path: '/search',
    name: '검색',
    icon: FaSearch,
    className: 'size-6',
  },
  // gallery: {
  //   type: 'link',
  //   path: '/album',
  //   name: '갤러리',
  //   icon: IoMdImages,
  //   className: 'size-7',
  // },
  artists: {
    type: 'link',
    path: '/artists',
    name: '작가',
    icon: FaUserGroup,
    className: 'size-6',
  },
  album: {
    type: 'button',
    path: '/myLibrary',
    name: '내 라이브러리',
    icon: IoMdImages,
    className: 'size-7',
  },
  // me: {
  //   type: 'button',
  //   path: '/myLibrary',
  //   name: '나',
  //   icon: FaUserCircle,
  //   className: 'size-6',
  // },
  // gallery: {
  //   path: '/myLibrary',
  //   name: '내 라이브러리',
  //   icon: IoMdImages,
  //   className: 'size-7',
  // },
};

export default function MobileTabBar() {
  const currentPathname = usePathname();
  const [isIOS, setIsIOS] = useState(false);
  const router = useRouter();
  const isSelectMode = useSelectModeStore((state) => state.isSelectMode);
  const isDeleteMode = useDeleteModeStore((state) => state.isDeleteMode);
  const { isFetching, status, data } = useMyInfo();
  const { show } = useModal(LoginModal);
  const handleClick = (path: string) => {
    if (data) {
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
            'flex size-12 flex-col items-center justify-center rounded-full active:bg-blackAlpha-100 dark:active:bg-whiteAlpha-300',
            {
              'text-gray-700 dark:text-white': isActive,
              'text-blackAlpha-500 dark:text-whiteAlpha-500': !isActive,
            }
          );

          if (type === 'button') {
            return (
              <button
                key={name}
                className={tabClassName}
                onClick={() => {
                  handleClick(eachPath);
                  // router.push(`/${eachPath}`) > 유저가 로그인되어있을시
                }}
              >
                <Icon className={iconStyle} />
                <span className="text-xs">{name}</span>
              </button>
            );
          }
          return (
            <Link href={eachPath} key={name}>
              {/* <div className={tabClassName}> */}
              <div
                className={clsx(
                  'flex size-16 flex-col items-center justify-center gap-0.5 rounded-full active:bg-blackAlpha-100 dark:active:bg-whiteAlpha-300',
                  {
                    'text-gray-700 dark:text-white': isActive,
                    'text-blackAlpha-500 dark:text-whiteAlpha-500': !isActive,
                  }
                )}
              >
                <div className="flex size-7 items-center justify-center">
                  <Icon className={iconStyle} />
                </div>
                <span className="w-20 text-center text-xs">{name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
