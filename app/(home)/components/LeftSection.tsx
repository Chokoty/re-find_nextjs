import React, { useEffect, useRef, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
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
  const [isBackToTopVisible, setIsBackToTopVisible] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); // 스크롤 컨테이너 참조

  const toggleSection = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleBackToTopVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollTop } = scrollContainerRef.current;
      if (scrollTop > 300) {
        setIsBackToTopVisible(true);
      } else {
        setIsBackToTopVisible(false);
      }
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', toggleBackToTopVisibility);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener(
          'scroll',
          toggleBackToTopVisibility
        );
      }
    };
  }, []);

  return (
    <section
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
        <div
          ref={scrollContainerRef} // 스크롤 이벤트 연결
          className="custom-scrollbar flex flex-col items-center overflow-y-auto "
        >
          <TopTitle />
          <Upload scrollToTop={scrollToTop} />
          <RandomGacha />
        </div>
      )}
      {/* Back to Top Button */}
      {isBackToTopVisible && (
        <div className="absolute bottom-4 right-4 z-[200] ">
          <Tooltip label="맨 위로" position="left-center">
            <button
              onClick={scrollToTop}
              className="flex size-[50px] cursor-pointer items-center justify-center rounded-full border-none bg-white px-[15px] py-2.5 text-xl shadow-md transition-all hover:bg-gray-50 active:bg-gray-100 dark:bg-dark-footer dark:hover:bg-gray-800 dark:active:bg-gray-900"
            >
              <FaArrowUp />
            </button>
          </Tooltip>
        </div>
      )}
    </section>
  );
}
