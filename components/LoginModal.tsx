import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

import useModal from '@/hooks/useModal';
import { Logo, Naver } from '@/lib/images';

// TODO: 추후 개발용, 배포용 env 파일 분리하여 관리하기(feat.env-cmd)
const redirect_uri =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_CLIENT_URL
    : process.env.NEXT_PUBLIC_LOCAL_CLIENT_URL;
const client_id = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;

export default function LoginModal() {
  const { hide } = useModal();
  const goToNaverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&state=abcd`;
  };

  return (
    <section className="relative m-auto size-full bg-white shadow-xl dark:bg-dark-card md:h-[291px] md:w-[430px] md:rounded-md">
      <button
        className="absolute right-[10px] top-[10px] flex size-9 items-center justify-center rounded-full transition hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300"
        onClick={hide}
      >
        <IoClose className="size-8" />
      </button>
      <div className="flex size-full flex-col items-center justify-center px-3 py-8 text-center text-sm 2xs:px-4 2xs:py-12 2xs:text-base lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <Image
            alt="리파인드 로고"
            width={48}
            height={48}
            src={Logo}
            priority
          />
          <h1 className="mt-2 text-xl font-semibold">리파인드 로그인</h1>
        </div>
        <button
          className="mt-10 flex h-[55px] w-full items-center rounded-md bg-icon-naver 2xs:px-2"
          onClick={goToNaverLogin}
        >
          <Image
            src={Naver}
            alt="네이버 로고"
            className="absolute"
            width={45}
            height={45}
            priority
          />
          <span className="w-full font-semibold">네이버 아이디로 로그인</span>
        </button>
      </div>
    </section>
  );
}
