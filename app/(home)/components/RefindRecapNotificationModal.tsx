'use client';

import { useRouter } from 'next/navigation';
import { IoClose } from 'react-icons/io5';

import Button from '@/components/Button';
import type { setValueParams } from '@/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';

export default function RefindRecapNotificationModal(
  props: Record<string, unknown>
) {
  const setStorage = props.setStorage as (value: setValueParams) => void;
  const router = useRouter();
  const { hide } = useModal();
  const onClose = () => {
    setStorage?.(true);
    hide();
  };

  const onMove = () => {
    onClose();
    router.push('/recap2024');
  };

  return (
    <section className="relative m-auto flex h-60 w-[90%] flex-col items-center justify-start rounded-2xl bg-white dark:bg-dark-card sm:w-full sm:max-w-lg lg:h-64">
      <button
        className="absolute right-[10px] top-[10px] flex size-9 items-center justify-center rounded-full transition hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300"
        onClick={onClose}
      >
        <IoClose className="size-8" />
      </button>
      <h2 className="mt-4 text-center text-xl font-bold lg:text-2xl">
        2024년 리파인드 돌아보기
      </h2>
      <div className="m-5 flex flex-col items-center justify-start gap-2 break-keep px-8 text-start text-sm lg:text-base">
        <p className="">
          2025년을 맞이하여 리파인드에서 2024리캡 페이지를 만들어 보았습니다!
        </p>
        <p className="">
          작가님 프로필 페이지에서 작가님들의 개인 리캡도 확인해보세요!
        </p>
      </div>
      <Button onClick={onMove}>2024 리캡 보러가기</Button>
    </section>
  );
}
