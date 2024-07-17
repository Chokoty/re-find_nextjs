'use client';

import Image from 'next/image';
import React, { useCallback } from 'react';

import type { setValueParams } from '@/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';
import { PollLink } from '@/lib/images';

export default function PollLinkModal(props: Record<string, unknown>) {
  const setStorage = props.setStorage as (value: setValueParams) => void;
  const { hide } = useModal();
  // 의존성 배열이 매번 변경되지 않도록 하기위함
  // 함수를 메모이제이션하여 의존성 배열의 값이 변경되지 않는 한 동일한 함수 참조를 유지
  const onClose = useCallback(() => {
    hide();
  }, [hide]);
  const onMove = () => {
    setStorage?.(true);
    window.open('https://forms.gle/x1DDq3wWqobBpC748', '_blank');
  };
  return (
    <section className="relative m-5 rounded-2xl bg-white dark:bg-dark-card sm:mx-auto sm:w-full sm:max-w-lg">
      <div className="flex size-full flex-col items-center justify-center gap-3 px-6 py-8">
        <Image
          className="cursor-pointer"
          onClick={onMove}
          src={PollLink}
          alt="poll link"
          width={1000}
          height={1000}
          priority
        />
        <button
          className="h-[40px] w-full rounded-md bg-green-highlight px-2.5 font-semibold text-gray-900 transition hover:bg-teal-400 active:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-75"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </section>
  );
}
