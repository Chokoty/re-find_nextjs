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
    <section className="relative m-auto w-[90%] rounded-2xl bg-white dark:bg-dark-card sm:w-full sm:max-w-lg">
      <button
        className="absolute right-[10px] top-[10px] flex size-9 items-center justify-center rounded-full transition hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300"
        onClick={onClose}
      >
        <IoClose className="size-8" />
      </button>
      <div className="flex size-full flex-col items-center justify-center break-keep px-3 py-6 text-center text-sm 2xs:px-4 2xs:py-12 2xs:text-base lg:px-8">
        <p>
          리파인드에서 2025년을 맞이하여 리파인드 전체 리캡과 작가님들의 개별
          리캡 페이지를 만들었습니다!
        </p>
        <p>
          작가님들의 2024 리캡은 작가 개별 페이지에서 확인하실 수 있습니다.
          리파인드를 이용해주셔서 감사합니다.
        </p>
        <Button onClick={onMove}>리파인드 2024 리캡 보러가기</Button>
      </div>
    </section>
  );
}
