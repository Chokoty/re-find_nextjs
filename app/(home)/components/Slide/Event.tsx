import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  linkContent: React.ReactNode;
  linkColor: 'pink' | 'purple' | 'blue' | 'green' | 'yellow';
  link: string;
  isOutLink?: boolean;
};

const colors = {
  pink: 'bg-pink-200 hover:bg-pink-300 active:bg-pink-400',
  purple: 'bg-purple-200 hover:bg-purple-300 active:bg-purple-400',
  blue: 'bg-blue-200 hover:bg-blue-300 active:bg-blue-400',
  green: 'bg-green-200 hover:bg-green-300 active:bg-green-400',
  yellow: 'bg-yellow-200 hover:bg-yellow-300 active:bg-yellow-400',
};

export default function Event({
  title,
  linkContent,
  linkColor,
  link,
  isOutLink,
}: Props) {
  const linkClassName = colors[linkColor];

  return (
    <div className="flex size-full max-h-[114px] flex-col items-center justify-center rounded-2xl bg-white py-3 shadow-cardBox dark:bg-dark-card-2 2xs:py-6 md:py-11">
      <p className="mb-2 text-base font-bold 2xs:text-xl md:mb-4">{title}</p>
      {isOutLink ? (
        <Link
          href={link}
          target="_blank"
          className={`${linkClassName} flex  w-4/5 items-center justify-center rounded-xl py-1.5 font-semibold text-gray-800 transition 2xs:p-2 `}
        >
          {linkContent}
        </Link>
      ) : (
        <Link
          href={link}
          className={`${linkClassName} flex  w-3/5 items-center justify-center rounded-xl py-1.5 font-semibold text-gray-800 transition 2xs:p-2`}
        >
          {linkContent}
        </Link>
      )}
    </div>
  );
}
