'use client';

import PageButton from '@/app/(home)/components/PageButton';
import { useMyInfo } from '@/service/client/useCommonService';

const buttons = [
  { text: '갤러리', path: '/album' },
  { text: '작가', path: '/artists' },
  { text: '이벤트', path: '/events' },
];

export default function PageButtonList() {
  const { data } = useMyInfo();

  return (
    <div
      className={`sticky top-0 z-20 mb-1 flex h-16 w-full items-center justify-start gap-2 bg-white py-4 pl-8 shadow-md transition-colors dark:bg-dark-card`}
    >
      {buttons.map((button, index) => (
        <PageButton key={index} text={button.text} path={button.path} />
      ))}
      {/* 🔹 로그인한 경우에만 "내 라이브러리" 버튼 추가 */}
      {data && <PageButton text="내 라이브러리" path="/myLibrary" />}
    </div>
  );
}
