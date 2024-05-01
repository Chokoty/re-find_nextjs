'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useResponsiveLink } from '@/hooks/useResponsiveLink';

interface Props {
  writerURL: string;
  profURL: string;
  nickname: string;
  board: string[];
}

export default function DeveloperProfileCard({
  writerURL,
  profURL,
  nickname,
  board,
}: Props) {
  const member_link = useResponsiveLink(
    writerURL.split('/').pop() || 'default',
    'member'
  );

  return (
    <Link href={writerURL === '' ? '#' : member_link} target="_blank">
      <div className="flex min-h-[120px] w-full min-w-10 max-w-[346px] items-center justify-start gap-4 rounded-2xl bg-gray-200 px-4 py-2 shadow-base transition hover:bg-gray-300 dark:bg-dark-card dark:hover:bg-whiteAlpha-300">
        <div className="relative min-h-20 min-w-20 md:min-h-24 md:min-w-24">
          <Image
            className="rounded-full bg-gray-100 object-cover"
            src={
              profURL ||
              'https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_363.png'
            }
            alt={nickname}
            fill={true}
            priority
            unoptimized
          />
        </div>
        <div className="flex h-full flex-col items-start justify-center">
          <p className="mb-2 text-green-highlight dark:text-pink-highlight">
            {nickname || '프로필은 왁물원에서'}
          </p>
          <div className="flex flex-wrap gap-2 px-1">
            {board.map((item, index) => (
              <span
                key={index}
                className="rounded-full bg-teal-500 px-2 py-1 text-sm text-white dark:bg-red-100 dark:text-gray-900"
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
