'use client';

import { useLogin } from '@/service/client/useCommonService';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// 해당 페이지에서 naver_login api를 통해 회원가입해야되는 유지 or 가입자인지 판단 후 분기
export default function callbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [animate, setAnimate] = useState(false);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const { isError, refetch: login } = useLogin({ code, state });

  const animateClassName = 'opacity-100 transition-opacity duration-1000';

  useEffect(() => {
    async function handleIsRefindUser() {
      const { data } = await login();
      if (!isError && data) {
        const { state, redirect_uri } = data;
        // 분기에 따라 처리 로직 추가
        if (state === 'register') {
          router.push('/register');
        } else if (state === 'login') {
          router.push(redirect_uri);
        }
      }
    }
    setAnimate(true);
    handleIsRefindUser();
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-152px)] items-center justify-center">
      <div className="m-auto flex min-h-[inherit] w-full max-w-[500px] flex-col items-center justify-center gap-[30px] px-6 py-8 text-left md:min-h-[400px] md:w-[90%] md:min-w-[400px] md:rounded-lg md:px-[50px] md:py-[60px] md:shadow">
        {/* <Suspense>{children}</Suspense> */}
        <h1
          className={`${animate ? animateClassName : 'opacity-0'} text-3xl font-semibold`}
        >
          잠시만 기다려주세요
        </h1>
        {isError && <h4>에러가 발생했습니다. 홈 버튼 추가 하기..</h4>}
      </div>
    </div>
  );
}
