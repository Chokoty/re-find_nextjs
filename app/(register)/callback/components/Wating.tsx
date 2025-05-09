'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useLogin } from '@/service/client/useCommonService';

export default function Wating() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const codeValue = searchParams.get('code');
  const stateValue = searchParams.get('state');
  const [phase, setPhase] = useState<'fadeIn' | 'loop'>('fadeIn');
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
    handleIsRefindUser();
    const timer = setTimeout(() => setPhase('loop'), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <h1
        className={`${phase === 'fadeIn' ? 'animate-fade-in' : 'animate-fade-in-out'} text-3xl font-semibold`}
      >
        잠시만 기다려주세요
      </h1>
      {isError && <h4>에러가 발생했습니다. 홈 버튼 추가 하기..</h4>}
    </>
  );
}
