'use client';

import type { Query } from '@tanstack/react-query';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import {
  extractRefindAppError,
  translateRefindAppErrorMessage,
} from '@/lib/error-utils';

export function Providers({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // SSR에서는 클라이언트에서 즉시 재요청하는 것을 피하기 위해,
            // default staleTime을 0보다 높게 설정하는 것이 일반적입니다.
            staleTime: 60 * 1000, // 60sec(1min) : 데이터가 1분 동안은 fresh(재요청 안 함)
            retry: false, // 실패 시 자동 재요청 안 함
          },
        },
        /** useMutation 과 useQuery 훅의 에러를 한곳에서 공통적으로 처리할수 있도록 하였습니다. */
        // 1. useQuery 훅이 작동할때 에러가 발생한다면 에러 토스트알림을 띄웁니다.(useQuery's onError callback -> deprecated)
        // //FIX: tanstack query v4부터 deprecated되었다 소리가..
        queryCache: new QueryCache({
          onError: (error, query) => handleError(error, query),
        }),
        // 2. useMutation 훅이 작동할때 에러가 발생한다면 에러 토스트알림을 띄웁니다.
        mutationCache: new MutationCache({
          onError: (error) => handleError(error),
        }),
      })
  );

  // 에러핸들링 함수 만약 에러클래스를 여러개 정의한다면 에러별로 공통된 에러핸들링을 정의할 수 있습니다.
  const handleError = (
    error: unknown,
    query?: Query<unknown, unknown, unknown>
  ) => {
    console.error('Global Error Handler:', error);
    // myInfo일 경우 따로 toast를 띄우지 않을 것
    if (query?.meta?.skipGlobalErrorHandler) return;

    if (isAxiosError(error) && error.code === 'ECONNABORTED') {
      toast.error('요청 시간이 초과되었습니다. 다시 시도해주세요.');
      return;
    }
    const normalizedError = extractRefindAppError(error);

    if (normalizedError.statusCode >= 500) {
      toast.error('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    // 추가 특수 처리 (예: 401 에러 시 로그인 페이지 이동)
    if (normalizedError.statusCode === 401) {
      toast.error('서비스 준비중입니다.');
      // router.push('/login');
      return;
    }
    const userMessage = translateRefindAppErrorMessage(normalizedError);
    toast.error(userMessage);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Toaster position="bottom-center" />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
