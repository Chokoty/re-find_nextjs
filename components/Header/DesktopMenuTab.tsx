import Link from 'next/link';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { PiGiftBold } from 'react-icons/pi';

import Tooltip from '@/components/Tooltip';

const routerMap = {
  event: {
    path: '/events',
    name: '이벤트관',
    icon: PiGiftBold,
    className: 'size-6',
  },
  more: {
    path: '/more',
    name: '더보기',
    icon: FiMenu,
    className: 'size-7',
  },
};

export default function DesktopMenuTab() {
  return (
    <div className="flex items-center justify-end md:min-w-[174px]">
      {Object.keys(routerMap).map((key) => {
        const typedKey = key as keyof typeof routerMap;
        const {
          path: eachPath,
          name,
          icon: Icon,
          className: iconStyle,
        } = routerMap[typedKey];

        return (
          <Link
            href={eachPath}
            key={name}
            className={name === '이벤트관' ? 'hidden md:block' : ''}
          >
            <Tooltip label={name}>
              <div className="flex size-12 items-center justify-center rounded-full transition hover:bg-blackAlpha-200 active:bg-blackAlpha-300 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300">
                <Icon className={iconStyle} />
              </div>
            </Tooltip>
          </Link>
        );
      })}
    </div>
  );
}
