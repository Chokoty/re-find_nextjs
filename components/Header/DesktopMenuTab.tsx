import Link from 'next/link';
import React from 'react';
import type { IconType } from 'react-icons';
import { FiMenu } from 'react-icons/fi';
import { PiGiftBold } from 'react-icons/pi';

import Tooltip from '@/components/Tooltip';

type RouterItem = {
  path: string;
  name: string;
  icon?: IconType; // 선택적 속성
  className: string;
};

const routerMap: Record<string, RouterItem> = {
  recap2024: {
    path: '/recap2024',
    name: '2024 리캡',
    className: 'size-6',
  },
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
    <div className="flex items-center justify-end md:min-w-[174px] ">
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
            className={
              name === '이벤트관' || name === '2024 리캡'
                ? 'hidden md:block'
                : ''
            }
          >
            <Tooltip label={name}>
              <div
                className={`flex size-12 items-center justify-center rounded-full transition hover:bg-blackAlpha-200 active:bg-blackAlpha-300 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300 ${
                  Icon ? '' : 'px-4' // 텍스트가 길 경우 여백 추가
                }`}
                style={Icon ? {} : { minWidth: `${name.length * 16}px` }} // 텍스트 길이에 따라 최소 가로 크기 설정
              >
                {Icon ? (
                  <Icon className={iconStyle} />
                ) : (
                  <span className="text-base font-medium text-green-highlight">
                    {name}
                  </span>
                )}
              </div>
            </Tooltip>
          </Link>
        );
      })}
    </div>
  );
}
