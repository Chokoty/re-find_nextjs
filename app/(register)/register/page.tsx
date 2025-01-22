'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import NaverButton from '@/components/Button/NaverButton';
import { useVerificationRequest } from '@/service/client/useCommonService';

export default function Register() {
  // TODO:  ⨯ useSearchParams() should be wrapped in a suspense boundary at page "/register". Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  const inputRef = useRef<HTMLInputElement>(null);
  const [animate, setAnimate] = useState(false);
  const [input, setInput] = useState('');

  const {
    isFetching: verifyIsFetcing,
    refetch: verify,
    status: verifyStatus,
  } = useVerificationRequest(input);

  useEffect(() => {
    setAnimate(true);
    inputRef.current?.focus();
  }, []);

  const isError = verifyStatus === 'error';
  const isFetching = verifyIsFetcing;
  const isDisabledButton = isFetching || !input.length;
  const animateClassName = 'opacity-100 transition-opacity duration-1000';
  const handleVerificationRequest = async () => {
    await verify();
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      {/* title */}
      <div className="flex flex-col gap-7">
        <h1
          className={`${animate ? animateClassName : 'opacity-0'} text-3xl font-semibold`}
        >
          회원가입
        </h1>
        <p
          className={`${animate ? `${animateClassName} delay-300` : 'opacity-0'} text-sm text-blackAlpha-800 dark:text-whiteAlpha-800`}
        >
          RE:FIND에 오신 것을 환영해요.
          <br />
          서비스를 이용하기 위해 네이버 메일을 인증해주세요.
        </p>
        <div
          className={`${animate ? `${animateClassName} delay-[600ms]` : 'opacity-0'} flex flex-col gap-2.5`}
        >
          <span className="text-left">
            <label className="text-sm" htmlFor="email-input">
              이메일
            </label>
          </span>
          {/* TODO: [        ] @naver.com로 UI 바꾸기 */}
          <input
            ref={inputRef}
            id="email-input"
            className="relative size-full cursor-text rounded-md border border-gray-200 bg-gray-100 px-4 py-2 outline-none transition placeholder:text-gray-500 hover:border-green-highlight hover:bg-white focus:border-green-highlight focus:outline-none focus:ring-1 focus:ring-green-highlight dark:border-whiteAlpha-300 dark:bg-whiteAlpha-200 dark:placeholder:text-whiteAlpha-600 dark:hover:bg-dark-card"
            placeholder="example@naver.com"
            value={input}
            onChange={handleSearch}
          />
          <span className="text-xs text-blackAlpha-800 dark:text-whiteAlpha-800">
            이메일 수신이 가능해야해요.
          </span>
        </div>
      </div>
      {/* actions */}
      <div
        className={`${animate ? `${animateClassName} delay-[900ms]` : 'opacity-0'} mt-auto flex flex-col`}
      >
        <NaverButton
          onClick={handleVerificationRequest}
          disabled={isDisabledButton} // 여러 번 클릭시 중복 요청 방지
        >
          네이버 메일 인증하기
        </NaverButton>
        {isError && (
          <p className="mt-2 text-center text-sm text-red-400">
            알 수 없는 오류로 메일인증이 실패했습니다.{' '}
            <Link className="font-semibold underline" href="/more/support">
              문의 하러가기
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
