'use client';

import Link from 'next/link';
import type { JSX } from 'react';
import { MdInfoOutline, MdOutlineContactSupport } from 'react-icons/md';
import { PiGiftBold } from 'react-icons/pi';

import AddToHomeScreenButton from '@/components/Button/AddToHomeScreenButton';
import ThemeToggleButton from '@/components/Button/ThemeToggleButton';

type ButtonProp = {
  href?: string;
  icon: JSX.Element;
  text: string;
};

const containerClassName =
  'shadow-base dark:shadow-none flex h-32 w-36 cursor-pointer flex-col items-center justify-between rounded-2xl bg-white dark:bg-dark-card-2 p-4 transition hover:bg-gray-200 dark:hover:bg-whiteAlpha-300 active:bg-gray-300 dark:active:bg-whiteAlpha-400';
const iconWrapperClassName = 'p-2';
const buttonClassName = 'text-xl font-semibold';
const iconClassName = 'size-8';

export default function MoreButtons() {
  return (
    <div className="mt-4 grid w-full grid-cols-2 gap-4">
      <MoreLinkButton
        href="/events"
        icon={<PiGiftBold className={iconClassName} />}
        text="이벤트"
      />
      <ThemeToggleButton
        containerClassName={containerClassName}
        iconWrapperClassName={iconWrapperClassName}
        iconClassName={iconClassName}
        buttonClassName={buttonClassName}
      />
      <MoreLinkButton
        href="/more/about"
        icon={<MdInfoOutline className={iconClassName} />}
        text="리파인드 소개"
      />
      <MoreLinkButton
        href="/more/support"
        icon={<MdOutlineContactSupport className={iconClassName} />}
        text="문의,지원"
      />
      <AddToHomeScreenButton
        containerClassName={containerClassName}
        iconWrapperClassName={iconWrapperClassName}
        iconClassName={iconClassName}
        buttonClassName={buttonClassName}
      />
    </div>
  );
}

const MoreLinkButton = ({ href = '', icon, text }: ButtonProp) => {
  return (
    <Link href={href} prefetch={false}>
      <div className={containerClassName}>
        <div className={iconWrapperClassName}>{icon}</div>
        <p className={buttonClassName}>{text}</p>
      </div>
    </Link>
  );
};
