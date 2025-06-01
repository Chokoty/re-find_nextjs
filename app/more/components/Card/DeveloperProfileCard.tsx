'use client';

import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

import { CONTRIBUTE_COLORS, DEFAULT_CREDIT_COLOR } from '@/app/more/lib/const';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';
import { NotFoundProfileURL } from '@/lib/const';

interface Props {
  writerURL: string;
  profURL: string | StaticImageData;
  nickname: string;
  board: string[];
  group: 'member' | 'credit';
}

export default function DeveloperProfileCard({
  writerURL,
  profURL,
  nickname,
  board,
  group,
}: Props) {
  const member_link = useResponsiveLink(
    writerURL.split('/').pop() || 'default',
    'member'
  );

  return (
    <Link href={writerURL === '' ? '#' : member_link} target="_blank">
      <div className="link-to-wakzoo_about flex min-h-[120px] w-full min-w-10 max-w-[346px] items-center justify-start gap-4 rounded-2xl border-base bg-white px-4 py-2 transition hover:bg-light-button-hover active:bg-gray-400 dark:border-none dark:bg-dark-card-2 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400">
        <div className="relative min-h-20 min-w-20 md:min-h-24 md:min-w-24">
          <Image
            className="rounded-full bg-gray-100 object-cover"
            src={profURL || NotFoundProfileURL}
            alt={nickname}
            fill={true}
            priority
            unoptimized
          />
        </div>
        <div className="flex h-full flex-col items-start justify-center">
          <p className="mb-2 font-semibold text-green-highlight dark:text-pink-highlight">
            {nickname || '프로필은 왁물원에서'}
          </p>
          <div className="flex flex-wrap gap-2 px-1">
            {board.map((item, index) => (
              <span
                key={index}
                className={`rounded-2xl px-3 py-1 text-sm font-semibold ${
                  group === 'credit'
                    ? DEFAULT_CREDIT_COLOR
                    : CONTRIBUTE_COLORS[item] ||
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white'
                }`}
              >
                {item || '---'}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
