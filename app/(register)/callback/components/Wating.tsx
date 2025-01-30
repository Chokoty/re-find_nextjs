'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useLogin } from '@/service/client/useCommonService';

export default function Wating() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [animate, setAnimate] = useState(false);
  const codeValue = searchParams.get('code');
  const stateValue = searchParams.get('state');
  const { isError, refetch: login } = useLogin({
    code: codeValue,
    state: stateValue,
  });

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

  const animateClassName = 'opacity-100 transition-opacity duration-1000';

  return (
    <>
      <h1
        className={`${animate ? animateClassName : 'opacity-0'} text-3xl font-semibold`}
      >
        잠시만 기다려주세요
      </h1>
      {isError && <h4>에러가 발생했습니다. 홈 버튼 추가 하기..</h4>}
    </>
  );
}
