import localFont from 'next/font/local';

// default font family로 pretendard가 쓰입니다.
export const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/pretendard/Pretendard-Light.subset.woff2',
      weight: '300',
    },
    {
      path: '../public/fonts/pretendard/Pretendard-Regular.subset.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/pretendard/Pretendard-Medium.subset.woff2',
      weight: '500',
    },
    {
      path: '../public/fonts/pretendard/Pretendard-SemiBold.subset.woff2',
      weight: '600',
    },
    {
      path: '../public/fonts/pretendard/Pretendard-Bold.subset.woff2',
      weight: '700',
    },
    {
      path: '../public/fonts/pretendard/Pretendard-ExtraBold.subset.woff2',
      weight: '800',
    },
  ],
  display: 'swap',
  // variable: '--font-pretendard',
});

// font-pop으로 font family를 지정하고 싶은 곳에서 사용하시면 됩니다.
export const oneMobilePop = localFont({
  src: '../public/fonts/one-mobile-pop/OneMobilePop.woff2',
  display: 'swap',
  variable: '--font-one-mobile-pop',
});
