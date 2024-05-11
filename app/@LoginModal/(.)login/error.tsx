'use client';

import Image from 'next/image';
import { Modal } from './modal';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import { ErrorImage } from '@/lib/images';

export default function Error() {
  const router = useRouter();
  
  return (
    <Modal>
      <div className="flex h-[90vh] w-full flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold">이용에 불편을 드려 죄송합니다.</h1>
        <p className="mb-4 mt-5">현재 해당 게시글의 대한 정보가 없습니다.</p>
        <Image
          src={ErrorImage}
          alt="404-박쥐단"
          width={400}
          height={400}
          unoptimized
          priority
        />
        <div className="mt-10 flex items-center justify-center gap-2">
          <Button
            intent="solid-gray"
            additionalClass="dark:bg-whiteAlpha-200 dark:text-whiteAlpha-900 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400 bg-gray-100 font-semibold text-blackAlpha-900 hover:bg-gray-200 active:bg-gray-300 text-base"
            onClick={() => router.back()}
          >
            뒤로 가기
          </Button>
        </div>
      </div>
    </Modal>
  );
}

