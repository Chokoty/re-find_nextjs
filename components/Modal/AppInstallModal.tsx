import Image from 'next/image';
import React from 'react';

import useModal from '@/hooks/useModal';
import { Logo } from '@/lib/images';

export default function AppInstallModal() {
  const { hide } = useModal();

  const onClose = () => {
    hide();
  };

  const commonButtonClassName =
    'h-[40px] w-full rounded-md px-2.5 font-semibold text-gray-900 transition disabled:cursor-not-allowed disabled:opacity-75';

  return (
    <section className="flex w-full flex-col items-center rounded-t-2xl bg-white px-9 pb-5 pt-7 text-blackAlpha-800 shadow-navBottom dark:bg-dark-footer dark:text-whiteAlpha-800">
      <Image alt="리파인드 로고" width={45} height={45} src={Logo} priority />
      <span className="mt-5 font-semibold">
        리파인드 바로가기를 추가해보세요
      </span>
      <p className="mt-2 text-center text-sm">
        홈 화면에서 리파인드 아이콘을 클릭하여
        <br />한 번의 탭으로 접속할 수 있어요!
      </p>
      <div className="mt-4 flex w-full gap-1">
        <button
          type="button"
          onClick={onClose}
          className={`${commonButtonClassName} bg-blackAlpha-100 dark:bg-white [&:not(:disabled):active]:bg-teal-400`}
        >
          {/* 다시 보지 않기 */}
          취소
        </button>
        <button
          type="button"
          onClick={() => {
            console.log('test');
          }}
          // disabled={ }
          className={`${commonButtonClassName} bg-green-highlight [&:not(:disabled):active]:bg-teal-400`}
        >
          추가하기
        </button>
      </div>
    </section>
  );
}
