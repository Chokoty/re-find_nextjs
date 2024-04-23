import Link from 'next/link';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { PiGiftBold } from 'react-icons/pi';

import Tooltip from '@/components/Tooltip';

export default function DesktopMenuTab() {
  return (
    <div className="flex items-center justify-end md:min-w-[174px]">
      <Link href="/events" className="hidden md:block">
        <Tooltip label="이벤트관">
          <div className="flex size-12 items-center justify-center rounded-full transition hover:bg-gray-200 dark:hover:bg-whiteAlpha-300">
            <PiGiftBold className="size-6" />
          </div>
        </Tooltip>
      </Link>
      <Link href="/more">
        <div className="flex size-12 items-center justify-center rounded-full transition hover:bg-gray-200 dark:hover:bg-whiteAlpha-300">
          <FiMenu className="size-7" />
        </div>
      </Link>
    </div>
  );
}
