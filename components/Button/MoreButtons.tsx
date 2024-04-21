import Link from 'next/link';
import { FiMoon, FiSun } from 'react-icons/fi';
import { MdInfoOutline, MdOutlineContactSupport } from 'react-icons/md';
import { PiGiftBold } from 'react-icons/pi';

import { useTheme } from '@/hooks/useTheme';

type ButtonProp = {
  href?: string;
  icon: JSX.Element;
  text: string;
  onClick?: () => void;
  type?: 'button' | 'link';
};

const MoreButton = ({
  href = '',
  icon,
  text,
  onClick,
  type = 'link',
}: ButtonProp) => {
  const containerClassName =
    'shadow-base flex h-32 w-36 cursor-pointer flex-col items-center justify-between rounded-2xl bg-card p-4 transition hover:bg-gray-200 dark:hover:bg-whiteAlpha-300';
  const IconWrapperClassName = 'p-2';
  const buttonClassName = 'text-xl font-semibold';
  if (type === 'button') {
    return (
      <button className={containerClassName} onClick={onClick}>
        <div className={IconWrapperClassName}>{icon}</div>
        <p className={buttonClassName}>{text}</p>
      </button>
    );
  }
  return (
    <Link href={href}>
      <div className={containerClassName}>
        <div className={IconWrapperClassName}>{icon}</div>
        <p className={buttonClassName}>{text}</p>
      </div>
    </Link>
  );
};

export default function MoreButtons() {
  const { toggleTheme } = useTheme();

  return (
    <div className="mt-4 flex w-full max-w-[340px] flex-row flex-wrap items-center justify-center gap-4">
      <MoreButton
        href="/more/about"
        icon={<MdInfoOutline className="size-8" />}
        text="리파인드 소개"
      />
      <MoreButton
        href="/more/support"
        icon={<MdOutlineContactSupport className="size-8" />}
        text="문의,지원"
      />
      <MoreButton
        href="/events"
        icon={<PiGiftBold className="size-8" />}
        text="이벤트"
      />
      <MoreButton
        type="button"
        icon={
          <>
            <FiMoon className="size-8 dark:hidden" />
            <FiSun className="hidden size-8 dark:block" />
          </>
        }
        text="화면 스타일"
        onClick={toggleTheme}
      />
    </div>
  );
}
