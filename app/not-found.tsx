'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ErrorImage } from '@/lib/images';

export default function NotFound() {
  return (
    <div className="flex size-full flex-col items-center justify-center p-4">
      <h1 className="text-xl font-bold">존재하지 않는 페이지입니다.</h1>
      <Link
        href="/"
        className="px-4 py-2 font-semibold text-green-highlight transition hover:underline"
      >
        홈으로 이동하기
      </Link>
      <Image
        src={ErrorImage}
        alt="404-박쥐단"
        width={400}
        height={400}
        priority
        unoptimized
      />
    </div>
  );
}
