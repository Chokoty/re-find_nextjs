'use client';

import toast from 'react-hot-toast';
import { ImLink } from 'react-icons/im';

import Tooltip from '@/components/Tooltip';

export function CopyRecapLinkButton() {
  const handleCopyLink = () => {
    // 복사하려는 링크를 여기에 입력하세요.
    // const linkToCopy = `https://re-find.xyz/artists/${encodeURIComponent(
    //   profile?.author_nickname
    // )}`;
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success('리캡페이지 링크가 클립보드에 복사되었습니다.');
    });
  };
  return (
    <Tooltip label="프로필 공유">
      <button
        className=" flex size-12 items-center justify-center rounded-full transition hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400"
        onClick={handleCopyLink}
      >
        <ImLink className="size-8" />
      </button>
    </Tooltip>
  );
}
