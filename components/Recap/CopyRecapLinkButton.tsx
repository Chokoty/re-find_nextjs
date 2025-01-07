'use client';

import toast from 'react-hot-toast';
import { ImLink } from 'react-icons/im';

import Button, { type CustomVariantProps } from '@/components/Button';

export function CopyRecapLinkButton() {
  const handleCopyLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success('링크가 클립보드에 복사되었어요.');
    });
  };
  return (
    <Button
      size="lg"
      intent={`solid-secondary` as CustomVariantProps['intent']}
      additionalClass="lg:w-[150px] flex gap-2 rounded-xl text-whiteAlpha-900 font-semibold  lg:text-lg  p-4"
      onClick={handleCopyLink}
    >
      <ImLink className="size-4 lg:size-6" />
      링크공유
    </Button>
  );
}

// <Button
//   intent={`solid-purple` as CustomVariantProps['intent']}
//   additionalClass="rounded-full text-whiteAlpha-900 font-semibold dark:text-blackAlpha-900   text-base h-[48px] p-4"
// >
//   <p className="">2024 리캡</p>
// </Button>;
