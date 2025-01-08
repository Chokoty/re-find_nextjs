import Link from 'next/link';

import LinkBtns from '@/app/(home)/components/Footer/LinkBtn';

export default function Footer() {
  return (
    <footer className="my-5 flex w-[90%] flex-col justify-center lg:mt-1">
      <LinkBtns />
      <div className="mb-4 mt-5 px-2 text-gray-600 dark:text-whiteAlpha-700">
        <p className="mb-4 font-bold">고객센터</p>
        <div className="mb-6">
          <p className="text-sm">팀 리파인드</p>
          <p className="text-sm">contact@re-find.xyz</p>
        </div>
        <Link href="/more/support">
          <p className="mb-6 text-sm">문의 및 지원</p>
        </Link>
        <p className="w-full max-w-[310px] text-sm">
          RE:FIND는 수익 창출을 하지 않으며 왁타버스 구성원과 팬들을 위해
          만들어진 팬메이드 비공식 사이트입니다.
        </p>
        <p className="mt-8 text-center text-sm">
          Copyright &copy; 2025 RE:FIND. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
