'use client';

import { ChakraProvider } from '@chakra-ui/provider';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import theme from '@/lib/theme';

export function Providers({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // SSR에서는 클라이언트에서 즉시 재요청하는 것을 피하기 위해,
            // default staleTime을 0보다 높게 설정하는 것이 일반적입니다.
            staleTime: 60 * 1000, // 60sec(1min)
            retry: false,
          },
        },
        /** useMutation 과 useQuery 훅의 에러를 한곳에서 공통적으로 처리할수 있도록 하였습니다. */
        // 1. useQuery 훅이 작동할때 에러가 발생한다면 에러 토스트알림을 띄웁니다.(useQuery's onError callback -> deprecated)
        queryCache: new QueryCache({
          onError: (error) => handleError(error),
        }),
        // 2. useMutation 훅이 작동할때 에러가 발생한다면 에러 토스트알림을 띄웁니다.
        mutationCache: new MutationCache({
          onError: (error) => handleError(error),
        }),
      })
  );

  // 에러핸들링 함수 만약 에러클래스를 여러개 정의한다면 에러별로 공통된 에러핸들링을 정의할 수 있습니다.
  const handleError = (error: unknown) => {
    if (isAxiosError(error)) {
      // 시간 초과 에러가 발생했을때
      if (error.code === 'ECONNABORTED') {
        toast.error(`요청시간이 초과되었습니다. 
        다시 시도해주세요.`);
        return;
      }
      if (!error.response) {
        toast.error(`네트워크 연결이 원활하지 않습니다.
        다시 시도해주세요.`);
        return;
      }
      // 서버 에러가 발생했을때
      if (error.response.status >= 500) {
        toast.error(
          `현재 서버가 많이 아픕니다.. 
          빠른 시일내에 복구하겠습니다.`
        );
      }
      // toast.error(`알 수 없는 에러가 발생했습니다.
      // 다시 시도해주세요.`);
    }
    // if (error instanceof AuthError) {
    //   Toast.error(error.message);
    //   window.location.assign(`/auth/login`);
    // }
  };

  useEffect(() => {
    localStorage.setItem('theme', 'light');
    const selectedTheme = localStorage.getItem('theme');
    if (selectedTheme) {
      document.body.classList.add(selectedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.add('light');
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Toaster position="bottom-center" />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

//     if (error.response && error.response.status === 500) {
//       console.log('Server Error: ', error.response.status);
//       toast({
//         title: `현재 서버와 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.`,
//         status: `error`,
//         isClosable: true,
//       });
//     } else if (error.code === 'ERR_NETWORK') {
//       console.log('Network Error: ', error.code);
//       toast({
//         title: `${error.code}`,
//         status: `error`,
//         isClosable: true,
//       });
//     } else {
//       console.log(error);
//     }
