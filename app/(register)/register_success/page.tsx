'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useVerifyEmail } from '@/service/client/useCommonService';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const [animate, setAnimate] = useState(false);
  const { isFetching, refetch, status } = useVerifyEmail(token ?? '');

  const animateClassName = 'opacity-100 transition-opacity duration-1000';
  const isError = status === 'error';
  const titleText = isError ? '이메일 인증 실패' : '이메일 인증 성공';
  const bodyText = isError
    ? '유효하지 않거나 만료된 토큰입니다'
    : '이메일 인증이 완료되었습니다';
  const buttonText = isError ? '다시 요청하기' : '홈으로 이동하기';

  const handleClick = () => {
    // 이메일 인증 실패시 재시도 요청
    if (isError) {
      refetch();
      return;
    }
    // 이메일 인증 성공시 홈으로 이동
    router.push('/');
  };

  useEffect(() => {
    setAnimate(true);
    refetch();
  }, []);

  return (
    <>
      {/* title */}
      <div className="flex flex-col gap-7">
        <h1
          className={`${animate ? animateClassName : 'opacity-0'} text-3xl font-semibold`}
        >
          {titleText}
        </h1>
        <p
          className={`${animate ? `${animateClassName} delay-300` : 'opacity-0'} text-sm text-blackAlpha-800 dark:text-whiteAlpha-800`}
        >
          {bodyText}
        </p>
      </div>
      {/* actions */}
      <div
        className={`${animate ? `${animateClassName} delay-[900ms]` : 'opacity-0'} mt-auto flex flex-col`}
      >
        <button
          type="button"
          onClick={handleClick}
          disabled={isError && isFetching} // 여러 번 클릭시 중복 요청 방지
          className="bg-icon-naver flex h-[55px] w-full items-center justify-center rounded-md border px-2.5 text-white transition disabled:cursor-not-allowed disabled:opacity-75 dark:border-whiteAlpha-300 dark:bg-green-500 dark:text-whiteAlpha-900 [&:not(:disabled):active]:bg-[#009f28] dark:[&:not(:disabled):active]:bg-green-700 [&:not(:disabled):hover]:bg-[#06bd34] dark:[&:not(:disabled):hover]:bg-green-600"
        >
          {buttonText}
        </button>
        {isError && (
          <p className="mt-2 text-center text-sm text-red-400">
            메일인증이 실패했습니다.{' '}
            <Link className="font-semibold underline" href="/more/support">
              문의 하러가기
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
