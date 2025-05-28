'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import NaverButton from '@/components/Button/NaverButton';
import { Logo } from '@/lib/images';

const redirect_uri = `${
  process.env.NEXT_PUBLIC_IS_LOCAL
    ? process.env.NEXT_PUBLIC_LOCAL_CLIENT_URL
    : process.env.NEXT_PUBLIC_CLIENT_URL
}/register`;
const client_id = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
const testApiBase = process.env.NEXT_PUBLIC_DEV_CLIENT_URL;
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function LoginPage() {
  const pathname = usePathname();
  const goToNaverLogin = () => {
    // window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&state=abcd`;
    console.log(`${serverUrl}/v2/authorize?prev_loc=${testApiBase + pathname}`);
    window.location.href = `${serverUrl}/v2/authorize?prev_loc=${testApiBase + pathname}`;
  };

  return (
    <section className="h-[calc(100vh-60px)] w-full bg-white shadow-xl dark:bg-dark-card">
      <div className="flex size-full flex-col items-center justify-center text-center text-sm 2xs:text-base">
        <div className="flex w-full flex-col items-center justify-center">
          <Image
            alt="리파인드 로고"
            width={48}
            height={48}
            src={Logo}
            className="h-[80px] w-[141px]"
            unoptimized
            priority
          />
          <h1 className="mt-2 text-xl font-semibold">리파인드 로그인</h1>
        </div>
        <div className="mt-5 w-2/3 sm:w-1/2">
          <NaverButton onClick={goToNaverLogin}>
            네이버 아이디로 로그인
          </NaverButton>
        </div>
      </div>
    </section>
  );
}
