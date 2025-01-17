'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import Tooltip from '@/components/Tooltip';

export default function BackToButton() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="absolute left-[-31rem] top-5">
      {/* <Tooltip label="뒤로" position="bottom-center"> */}
      <button
        onClick={goBack}
        className="r flex size-[50px] cursor-pointer items-center justify-center rounded-full border-none px-[15px] py-2.5 text-xl shadow-md transition-all hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-gray-800 dark:active:bg-gray-900"
      >
        <FaArrowLeft />
      </button>
      {/* </Tooltip> */}
    </div>
  );
}
