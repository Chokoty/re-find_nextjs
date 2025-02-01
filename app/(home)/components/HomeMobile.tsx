'use client';

import Link from 'next/link';
import React, { useRef } from 'react';
import { AiFillExperiment } from 'react-icons/ai';
import { FaBookOpen } from 'react-icons/fa';

import Footer from '@/app/(home)/components/Footer';
import BoardList from '@/app/gallery/components/BoardList';
import GalleryTitle from '@/app/gallery/components/GalleryTitle';
import MemberAlbum from '@/app/gallery/components/MemberAlbum';
import RefindPick from '@/app/gallery/components/RefindPick';
import { SOURCE_URL } from '@/app/more/lib/const';
import MoreButtons from '@/components/Button/MoreButtons';
import UpdateLogBoard from '@/components/UpdateLogBoard';

export default function HomeMobile() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); // 스크롤 컨테이너 참조

  return (
    <div
      ref={scrollContainerRef} // 스크롤 이벤트 연결
      className="flex w-full flex-col items-center justify-start px-3 md:hidden"
    >
      <GalleryTitle
        pageType="galleryHome"
        title="팬아트 갤러리"
        description="왁물원에 올라온 모든 팬아트들을 한 곳에서!"
      />
      <RefindPick />
      <BoardList />
      <MemberAlbum />
      <div className="mb-4 mt-10">
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
      <Link className="mt-2 inline-block md:hidden" href="/more/install-info">
        <div className="inline-flex min-h-10 items-center justify-start rounded-md bg-gray-700 px-4 text-gray-50 transition hover:bg-gray-800 active:bg-gray-900">
          <FaBookOpen className="mr-1.5 size-4 xs:mr-2 xs:size-5" />
          <p className="text-sm xs:text-base">
            (안드로이드/IOS)리파인드 홈화면 설치 가이드
          </p>
        </div>
      </Link>
      <div className="mb-10 p-4">
        <UpdateLogBoard />
      </div>
      <Footer />
    </div>
  );
}
