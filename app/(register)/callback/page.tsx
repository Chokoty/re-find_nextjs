import { Suspense } from 'react';

import Wating from '@/app/(register)/callback/components/Wating';

// 해당 페이지에서 naver_login api를 통해 회원가입해야되는 유지 or 가입자인지 판단 후 분기
export default function callbackPage() {
  return (
    <div className="flex min-h-[calc(100vh-152px)] items-center justify-center">
      <div className="m-auto flex min-h-[inherit] w-full max-w-[500px] flex-col items-center justify-center gap-[30px] px-6 py-8 text-left md:min-h-[400px] md:w-[90%] md:min-w-[400px] md:rounded-lg md:px-[50px] md:py-[60px] md:shadow">
        <Suspense>
          <Wating />
        </Suspense>
      </div>
    </div>
  );
}
