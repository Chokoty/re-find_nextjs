import Link from 'next/link';

import LinkBtns from '@/app/(home)/components/Footer/LinkBtn';
import Divider from '@/components/Divider';

export default function Footer() {
  return (
    <footer className="mb-16 mt-12 flex w-[90%] flex-col justify-center gap-8">
      <Divider />
      <LinkBtns />
      <div className="mb-4 mt-5 px-2 text-gray-600 dark:text-whiteAlpha-700">
        <p className="mb-4 font-bold">고객센터</p>
        <div className="mb-6">
          <p className="text-sm">팀 리파인드</p>
          <p className="text-sm">contact@re-find.xyz</p>
        </div>
        <Link href="/more/support">
          <p className="text-sm">문의 및 지원</p>
        </Link>
        <div className="mb-6 mt-2 flex w-full items-start justify-start gap-2">
          <Link href="/terms">
            <p className="text-sm">서비스 이용약관 </p>
          </Link>
          |
          <Link href="/privacy">
            <p className="text-sm">개인정보 처리방침</p>
          </Link>
        </div>

        <p className="w-full text-sm">
          RE:FIND는 수익 창출을 하지 않으며 왁타버스 구성원과 팬들을 위해
          만들어진 비공식 팬메이드 사이트입니다.
        </p>
        <p className="mt-4 text-start text-sm">
          Copyright &copy; 2025 RE:FIND. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
