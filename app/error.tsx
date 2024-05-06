'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import Button from '@/components/Button';
import { ErrorImage } from '@/lib/images';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex size-full flex-col items-center justify-center p-4 text-center">
      <h1 className="text-xl font-bold">이용에 불편을 드려 죄송합니다.</h1>
      <p className="mb-2.5 mt-2">
        현재 해당 페이지 복구 작업을 진행하고 있습니다.
      </p>
      <Image
        src={ErrorImage}
        alt="404-박쥐단"
        width={400}
        height={400}
        priority
        unoptimized
      />
      <p className="mt-3">에러내용: {error.message}</p>
      <div className="mt-5 flex items-center justify-center gap-2">
        <Link
          href="/"
          className="px-4 font-semibold text-green-highlight transition hover:underline"
        >
          홈으로
        </Link>

        <Button
          intent="solid-gray"
          additionalClass="dark:bg-whiteAlpha-200 dark:text-whiteAlpha-900 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400 bg-gray-100 font-semibold text-blackAlpha-900 hover:bg-gray-200 active:bg-gray-300 text-base"
          onClick={reset} // 세그먼트를 다시 렌더링하여 복구를 시도합니다.
        >
          다시 시도
        </Button>
      </div>
    </div>
  );
}
