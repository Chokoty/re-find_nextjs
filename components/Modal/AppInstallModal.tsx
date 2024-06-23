import Image from 'next/image';
import React from 'react';
import { MdOutlineIosShare } from 'react-icons/md';

import { useA2HS } from '@/hooks/useA2HS';
import type { setValueParams } from '@/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';
import { Logo } from '@/lib/images';

export default function AppInstallModal(props: Record<string, unknown>) {
  const setStorage = props.setStorage as (value: setValueParams) => void;
  const { hide } = useModal();
  const { isIOS, installApp, clearPrompt } = useA2HS();
  const close = () => {
    setStorage?.(true);
    clearPrompt();
    hide();
  };

  const install = () => {
    installApp();
    close();
  };

  const commonButtonClassName =
    'h-[40px] w-full rounded-md px-2.5 font-semibold text-gray-900 transition disabled:cursor-not-allowed disabled:opacity-75';
  return (
    <section className="flex w-full flex-col items-center rounded-t-2xl bg-white px-9 pb-5 pt-7 text-blackAlpha-800 shadow-navBottom dark:bg-dark-footer dark:text-whiteAlpha-800">
      <Image alt="리파인드 로고" width={45} height={45} src={Logo} priority />
      <span className="mt-5 font-semibold">
        리파인드 바로가기를 추가해보세요
      </span>
      {isIOS ? (
        <p className="mt-4 break-keep text-center">
          중앙 하단에{' '}
          <MdOutlineIosShare className="inline text-green-highlight" />를
          선택하고{' '}
          <span className="text-green-highlight">홈 화면에 추가하기</span>를
          눌러 설치를 진행해주세요.
        </p>
      ) : (
        <>
          <p className="mt-2 text-center text-sm">
            홈 화면에서 리파인드 아이콘을 클릭하여
            <br />한 번의 탭으로 접속할 수 있어요!
          </p>
          <div className="mt-4 flex w-full flex-col gap-1">
            <button
              type="button"
              onClick={install}
              // disabled={ }
              className={`${commonButtonClassName} bg-green-highlight hover:bg-teal-400 active:bg-teal-400`}
            >
              추가하기
            </button>
            <button
              type="button"
              onClick={close}
              className={`${commonButtonClassName} border bg-blackAlpha-100 dark:border-whiteAlpha-300 dark:bg-[#48484B] dark:text-whiteAlpha-800 dark:hover:bg-black-200 dark:active:bg-whiteAlpha-100`}
            >
              {/* 다시 보지 않기 */}
              취소
            </button>
          </div>
        </>
      )}
    </section>
  );
}
