'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackToArtistButton() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로를 가져옴

  const goBack = () => {
    if (pathname.includes('/recap2024')) {
      // 현재 경로가 recap2024일 경우 /artists/:nickname으로 이동
      const newPath = pathname.replace('/recap2024', '');
      router.push(newPath);
    } else {
      // 다른 경우 이전 페이지로 이동
      router.back();
    }
  };

  return (
    <div className="absolute left-4 top-20 lg:left-12 lg:top-24">
      <button
        onClick={goBack}
        className="flex size-[50px] cursor-pointer items-center justify-center rounded-full border-none px-[15px] py-2.5 text-xl text-whiteAlpha-600 shadow-md transition-all hover:bg-gray-50 hover:text-blackAlpha-800 active:bg-gray-100"
      >
        <FaArrowLeft
          className="text-2xl font-bold"
          style={{ strokeWidth: '1.5' }}
        />
      </button>
    </div>
  );
}
