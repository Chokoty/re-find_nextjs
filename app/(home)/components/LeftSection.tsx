import React, { useState } from 'react';
import {
  RiAlignItemBottomFill,
  RiAlignItemBottomLine,
  RiAlignItemLeftFill,
  RiAlignItemLeftLine,
  RiSignpostFill,
  RiSignpostLine,
} from 'react-icons/ri';

import RandomGacha from '@/app/(home)/components/RandomGacha';
import TopTitle from '@/app/(home)/components/TopTitle';
import Upload from '@/app/(home)/components/Upload';
import Tooltip from '@/components/Tooltip';

export default function LeftSection() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSection = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`relative flex h-full overflow-hidden ${
        isOpen ? 'w-[360px]' : 'w-[60px]'
      }  flex-col items-center justify-start  rounded-lg dark:bg-dark-card`}
    >
      <header className="flex w-full items-center justify-start gap-2 px-3 py-4  shadow-md dark:border-dark-myText">
        {/* <Tooltip
          label={isOpen ? '리파인드 메뉴 숨기기' : '리파인드 메뉴 펼치기'}
          position={isOpen ? 'top-center' : 'right-center'}
          bg="gray-150"
        > */}
        <button
          onClick={toggleSection}
          className="flex items-center justify-start rounded px-2 py-1 
        text-whiteAlpha-700 hover:text-whiteAlpha-900
        "
        >
          {isOpen ? (
            <div className="flex items-center justify-start gap-2">
              <RiAlignItemBottomFill className="size-6" />
              <p className="">리파인드 메뉴</p>
            </div>
          ) : (
            <RiAlignItemBottomLine className="size-6" />
          )}
        </button>
        {/* </Tooltip> */}
      </header>
      {isOpen && (
        <div className="custom-scrollbar flex flex-col items-center overflow-y-auto ">
          <TopTitle />
          <Upload />
          <RandomGacha />
        </div>
      )}
    </div>
  );
}
