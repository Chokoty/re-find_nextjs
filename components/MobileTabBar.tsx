'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { IoMdImages } from 'react-icons/io';
import { MdHomeFilled } from 'react-icons/md';

const routerMap = {
  home: {
    path: '/',
    name: '홈',
    icon: MdHomeFilled,
    className: 'size-7',
  },
  search: {
    path: '/search',
    name: '검색',
    icon: FaSearch,
    className: 'size-6',
  },
  gallery: {
    path: '/gallery',
    name: '갤러리',
    icon: IoMdImages,
    className: 'size-7',
  },
  artists: {
    path: '/artists',
    name: '작가',
    icon: FaUserGroup,
    className: 'size-6',
  },
};

export default function MobileTabBar() {
  const currentPathname = usePathname();
  return (
    <nav className="fixed bottom-0 z-[200] flex w-full justify-center md:hidden">
      <div className="flex h-[60px] w-full items-center justify-evenly bg-white shadow-navBottom dark:border-t-base dark:border-whiteAlpha-300 dark:bg-dark-footer dark:shadow">
        {Object.keys(routerMap).map((key) => {
          const typedKey = key as keyof typeof routerMap;
          const {
            path: eachPath,
            name,
            icon: Icon,
            className: iconStyle,
          } = routerMap[typedKey];
          const isActive =
            eachPath === '/'
              ? currentPathname === '/'
              : currentPathname.startsWith(eachPath);
          return (
            <Link href={eachPath} key={name}>
              <div
                className={clsx(
                  'flex size-12 flex-col items-center justify-center rounded-full active:bg-blackAlpha-100 dark:active:bg-whiteAlpha-300',
                  {
                    'text-gray-700 dark:text-white': isActive,
                    'text-blackAlpha-500 dark:text-whiteAlpha-500': !isActive,
                  }
                )}
              >
                <div className="flex size-7 items-center justify-center">
                  <Icon className={iconStyle} />
                </div>
                <span className="text-xs">{name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
