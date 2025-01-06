'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';
import { ImLink } from 'react-icons/im';

import Tooltip from '@/components/Tooltip';
import { RefindLogo } from '@/lib/images';

export default function Title({ artist }: { artist?: string }) {
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
    <div className="flex h-[300px]  flex-col items-start justify-end">
      {artist ? (
        <div className="items-top flex justify-center gap-4">
          <h2 className="flex flex-col items-start justify-center text-center font-sbAggro text-[10px] font-bold leading-tight text-pink-highlight 2xs:text-[20px] md:text-[30px] lg:text-[40px]">
            {artist}님의
          </h2>
          <Tooltip label="프로필 공유">
            <button
              className=" flex size-10 items-center justify-center rounded-full transition hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400"
              onClick={handleCopyLink}
            >
              <ImLink className="size-8" />
            </button>
          </Tooltip>
        </div>
      ) : null}
      <h2 className="flex flex-col items-start justify-end text-center font-sbAggro text-[40px] font-bold leading-tight 2xs:text-[50px] md:text-[60px] lg:text-[80px]">
        <div className="flex items-start justify-center gap-4">
          <span>2024년</span>
          <Image
            src={RefindLogo}
            alt="리파인드 로고"
            width={80}
            height={80}
            priority
            unoptimized
            // className="size-12 xl:size-20 "
          />
        </div>
        <span>
          <span className="text-green-highlight">리파인드</span> 돌아보기
        </span>
      </h2>
    </div>
  );
}
