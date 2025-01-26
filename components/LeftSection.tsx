'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { AiFillExperiment } from 'react-icons/ai';
import { FaArrowUp, FaBookOpen } from 'react-icons/fa';
import { IoGrid, IoGridOutline } from 'react-icons/io5';

import BannerSkeleton from '@/app/(home)/components/BannerSkeleton';
import RandomGacha from '@/app/(home)/components/RandomGacha';
import TopTitle from '@/app/(home)/components/TopTitle';
import Upload from '@/app/(home)/components/Upload';
import { SOURCE_URL } from '@/app/more/lib/const';
import MoreButtons from '@/components/Button/MoreButtons';
import Tooltip from '@/components/Tooltip';
import UpdateLogBoard from '@/components/UpdateLogBoard';

const BannerSlider = dynamic(
  () => import('@/app/(home)/components/BannerSlider'),
  {
    ssr: false,
    loading: () => <BannerSkeleton />,
  }
);
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
              <IoGrid className="size-6" />
              <p className="text-xl">리파인드 메뉴</p>
            </div>
          ) : (
            <IoGridOutline className="size-6" />
          )}
        </button>
        {/* </Tooltip> */}
      </header>
      {isOpen && (
        <div
          ref={scrollContainerRef} // 스크롤 이벤트 연결
          className="custom-scrollbar flex flex-col items-center overflow-y-auto "
        >
          <BannerSlider />
          <TopTitle />
          <Upload scrollToTop={scrollToTop} />
          <RandomGacha />
          <div className="mb-4">
            <MoreButtons />
          </div>
          <Link
            className="link-to-wakzoo inline-block"
            href={SOURCE_URL}
            target="_blank"
          >
            <div className="inline-flex min-h-10 items-center justify-center rounded-md bg-purple-500 px-4 text-gray-50 transition hover:bg-purple-600 active:bg-purple-700">
              <AiFillExperiment className="mr-1.5 size-4 xs:mr-2 xs:size-5" />
              <p className="text-sm xs:text-base">
                (beta)이세돌 팬아트를 키워드로 찾아주는 AI
              </p>
            </div>
          </Link>
          <Link
            className="mt-2 inline-block md:hidden"
            href="/more/install-info"
          >
            <div className="inline-flex min-h-10 items-center justify-start rounded-md bg-gray-700 px-4 text-gray-50 transition hover:bg-gray-800 active:bg-gray-900">
              <FaBookOpen className="mr-1.5 size-4 xs:mr-2 xs:size-5" />
              <p className="text-sm xs:text-base">
                (안드로이드/IOS)리파인드 홈화면 설치 가이드
              </p>
            </div>
          </Link>
          <div className="p-4">
            <UpdateLogBoard />
          </div>
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
