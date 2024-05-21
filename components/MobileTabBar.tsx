'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { IoMdImages } from 'react-icons/io';
import { MdHomeFilled } from 'react-icons/md';

import LoginModal from '@/components/LoginModal';
import useModal from '@/hooks/useModal';

const routers = [
  {
    path: '/',
    name: '홈',
    icon: MdHomeFilled,
    className: 'size-7',
  },
  {
    path: '/search',
    name: '검색',
    icon: FaSearch,
    className: 'size-6',
  },
  {
    path: '/gallery',
    name: '갤러리',
    icon: IoMdImages,
    className: 'size-7',
  },
  {
    path: '/artists',
    name: '작가',
    icon: FaUserGroup,
    className: 'size-6',
  },
  {
    type: 'button',
    path: '/me',
    name: '나',
    icon: FaUserCircle,
    className: 'size-6',
  },
];

export default function MobileTabBar() {
  const currentPathname = usePathname();
  const router = useRouter();
  const { show } = useModal(LoginModal);
  const handleClick = () => {
    show({ isBackdropClick: true, size: 'full' });
  };

  return (
    <nav className="fixed bottom-0 z-[200] flex w-full justify-center md:hidden">
      <div className="flex h-[60px] w-full items-center justify-evenly bg-white shadow-navBottom dark:border-t-base dark:border-whiteAlpha-300 dark:bg-dark-footer dark:shadow">
        {routers.map(
          ({
            path: eachPath,
            name,
            icon: Icon,
            className: iconStyle,
            type,
          }) => {
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
                    handleClick();
                    // router.push(`/${eachPath}`)
                  }}
                >
                  <Icon className={iconStyle} />
                  <span className="text-xs">{name}</span>
                </button>
              );
            }

            return (
              <Link href={eachPath} key={name}>
                <div className={tabClassName}>
                  <Icon className={iconStyle} />
                  <span className="text-xs">{name}</span>
                </div>
              </Link>
            );
          }
        )}
      </div>
    </nav>
  );
}
