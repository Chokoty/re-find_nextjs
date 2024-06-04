'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';
import { MdInfoOutline, MdOutlineContactSupport } from 'react-icons/md';
import { PiGiftBold } from 'react-icons/pi';

type ButtonProp = {
  href?: string;
  icon: JSX.Element;
  text: string;
};

const containerClassName =
  'shadow-base dark:shadow-none flex h-32 w-36 cursor-pointer flex-col items-center justify-between rounded-2xl bg-white dark:bg-dark-card p-4 transition hover:bg-gray-200 dark:hover:bg-whiteAlpha-300 active:bg-gray-300 dark:active:bg-whiteAlpha-400';
const IconWrapperClassName = 'p-2';
const buttonClassName = 'text-xl font-semibold';
const iconClassName = 'size-8';

const MoreLinkButton = ({ href = '', icon, text }: ButtonProp) => {
  return (
    <Link href={href} prefetch={false}>
      <div className={containerClassName}>
        <div className={IconWrapperClassName}>{icon}</div>
        <p className={buttonClassName}>{text}</p>
      </div>
    </Link>
  );
};

const ThemeToggleButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <button className={containerClassName} onClick={toggleTheme}>
      <div className={IconWrapperClassName}>
        {isDarkMode ? (
          <FiSun className={iconClassName} />
        ) : (
          <FiMoon className={iconClassName} />
        )}
      </div>
      <p className={buttonClassName}>화면 스타일</p>
    </button>
  );
};

export default function MoreButtons() {
  return (
    <div className="mt-4 flex w-full max-w-[340px] flex-row flex-wrap items-center justify-center gap-4">
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
      <MoreLinkButton
        href="/events"
        icon={<PiGiftBold className={iconClassName} />}
        text="이벤트"
      />
      <ThemeToggleButton />
    </div>
  );
}
