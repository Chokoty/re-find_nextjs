'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
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

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4 text-center">
        <h4>에러가 발생했습니다.</h4>
        <Button
          intent="solid-green"
          onClick={() => {
            router.push('/');
          }}
        >
          홈으로
        </Button>
      </div>
    );
  }

  return (
    <>
      <h1
        className={`${phase === 'fadeIn' ? 'animate-fade-in' : 'animate-fade-in-out'} text-3xl font-semibold`}
      >
        잠시만 기다려주세요
      </h1>
    </>
  );
}
