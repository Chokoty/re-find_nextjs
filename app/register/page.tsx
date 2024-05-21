'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import NaverButton from '@/components/Button/NaverButton';
import { useLogin, useVerify } from '@/service/client/useCommonService';

export default function Register() {
  // TODO:  ⨯ useSearchParams() should be wrapped in a suspense boundary at page "/register". Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const {
    isFetching: loginIsFetcing,
    refetch: login,
    status: loginStatus,
  } = useLogin({ code, state });
  const {
    isFetching: verifyIsFetcing,
    refetch: verify,
    status: verifyStatus,
  } = useVerify();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const isError = loginStatus === 'error' || verifyStatus === 'error';
  const isFetching = loginIsFetcing || verifyIsFetcing;
  const animateClassName = 'opacity-100 transition-opacity duration-1000';
  const verifyWithNaverEmail = async () => {
    // console.log('test');
    await login();
    await verify();
  };

  return (
    <>
      {/* title */}
      <div className="flex flex-col gap-2.5">
        <h1
          className={`${animate ? animateClassName : 'opacity-0'} text-3xl font-semibold`}
        >
          회원가입
        </h1>
        <p
          className={`${animate ? `${animateClassName} delay-500` : 'opacity-0'} text-sm text-blackAlpha-800 dark:text-whiteAlpha-800`}
        >
          RE:FIND에 오신 것을 환영해요.
          <br />
          서비스를 이용하기 위해 네이버 메일을 인증해주세요.
        </p>
      </div>
      {/* actions */}
      <div
        className={`${animate ? `${animateClassName} delay-1000` : 'opacity-0'} mt-auto flex flex-col`}
      >
        <NaverButton
          onClick={verifyWithNaverEmail}
          disabled={isFetching} // 여러 번 클릭시 중복 요청 방지
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
