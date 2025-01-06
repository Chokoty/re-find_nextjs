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
        <Button onClick={onMove}>Refind 2024 리캡 보러가기</Button>
      </div>
    </section>
  );
}
