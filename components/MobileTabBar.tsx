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
    icon: <MdHomeFilled className="size-7" />,
  },
  search: {
    path: '/search?q=',
    name: '검색',
    icon: <FaSearch className="size-6" />,
  },
  gallery: {
    path: '/gallery',
    name: '갤러리',
    icon: <IoMdImages className="size-7" />,
  },
  artists: {
    path: '/artists',
    name: '작가',
    icon: <FaUserGroup className="size-6" />,
  },
};

type RouterType = keyof typeof routerMap;

export default function MobileTabBar() {
  const pathname = usePathname();
  const isCurrentPathname = (tabPathname: string) => {
    if (tabPathname === '/') return pathname === '/';
    return pathname.startsWith(tabPathname);
  };
  return (
    <div className="sticky bottom-1 z-[200] flex justify-center 2xs:bottom-3 md:hidden">
      <div className="dark:bg-dark-footer flex h-[57px] w-full max-w-[300px] items-center justify-between rounded-full bg-white px-7 shadow-lg">
        {Object.keys(routerMap).map((router) => (
          <Link href={routerMap[router as RouterType].path} key={router}>
            <div
              className={clsx('flex flex-col items-center justify-center', {
                'text-gray-700 dark:text-white': isCurrentPathname(
                  routerMap[router as RouterType].path
                ),
                'text-blackAlpha-500 dark:text-whiteAlpha-500':
                  !isCurrentPathname(routerMap[router as RouterType].path),
              })}
            >
              {routerMap[router as RouterType].icon}
              <span className="text-xs">
                {routerMap[router as RouterType].name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
