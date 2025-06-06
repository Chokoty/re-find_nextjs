'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiFillExperiment } from 'react-icons/ai';
import { FaBookOpen } from 'react-icons/fa';
import { MdOutlineMoreHoriz, MdOutlineUpdate } from 'react-icons/md';
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from 'react-icons/tb';

import RandomGacha from '@/app/(home)/components/RandomGacha';
import TopTitle from '@/app/(home)/components/TopTitle';
import Upload from '@/app/(home)/components/Upload';
import UpdateBoard from '@/app/(home)/components/Upload/UpdateBoard';
import { SOURCE_URL } from '@/app/more/lib/const';
import MoreButtons from '@/components/Button/MoreButtons';
import CustomScrollContainer from '@/components/CustomScrollContainer';
import Tooltip from '@/components/Tooltip';
import UpdateLogBoard from '@/components/UpdateLogBoard';
import { useResponsive } from '@/hooks/useResponsive';
import { UploadHoverImage } from '@/lib/images';
import { useMyInfo } from '@/service/client/useCommonService';
import { useSideMenuStore } from '@/store/sideMenuStore';

const leftTabButtons: {
  key: 'image' | 'update' | 'more';
  label: string;
}[] = [
  { key: 'image', label: '이미지 검색' },
  { key: 'update', label: '업데이트 현황' },
  { key: 'more', label: '좀더' },
];

export default function LeftSection() {
  const { isOpen, toggle } = useSideMenuStore();
  const isMobile = useResponsive();
  const [activeTab, setActiveTab] = useState<'image' | 'update' | 'more'>(
    'image'
  );
  const { data: userInfo } = useMyInfo();

  return (
    <section
      className={`hidden h-full overflow-hidden border-base border-gray-200 dark:border-0 md:flex ${
        isOpen ? 'w-[360px]' : 'w-[72px]'
      } flex-col items-center justify-start rounded-lg bg-white dark:bg-dark-card`}
    >
      <header className="z-10 flex w-full items-center justify-start gap-2 px-3 pb-1 pt-3 dark:border-dark-myText">
        {isOpen ? (
          <Tooltip
            label="리파인드 패널 접기"
            position="top-center"
            forceHide={!isOpen || isMobile}
          >
            <button
              onClick={toggle}
              className="group flex h-10 items-center justify-start rounded py-1 dark:text-whiteAlpha-700 dark:hover:text-whiteAlpha-900"
              type="button"
            >
              <div className="ml-2 flex items-center justify-start gap-2">
                <TbLayoutSidebarLeftCollapseFilled className="size-8" />
                <p className="text-xl">리파인드 패널</p>
              </div>
            </button>
          </Tooltip>
        ) : (
          <Tooltip
            label="리파인드 패널 열기"
            position="right-center"
            forceHide={!isOpen || isMobile}
          >
            <button
              onClick={toggle}
              className="ml-2 flex h-10 items-center justify-center rounded dark:text-whiteAlpha-700 dark:hover:text-whiteAlpha-900"
              type="button"
            >
              <TbLayoutSidebarRightCollapseFilled className="size-8" />
            </button>
          </Tooltip>
        )}
      </header>

      {!isOpen && (
        <hr className="my-1 w-8 border-t border-gray-300 dark:border-whiteAlpha-300" />
      )}
      {/* 사이드바가 열려 있을 때만 보이는 버튼 */}
      {/* 사이드바가 접혀 있을 때만 탭 버튼 목록 */}
      {!isOpen && (
        <div className="mt-2 flex flex-col items-center gap-2">
          {leftTabButtons.map((btn) => (
            <Tooltip
              key={btn.key}
              label={btn.label}
              position="right-center"
              delay={100}
              fontSize="text-base"
            >
              <button
                onClick={() => {
                  setActiveTab(btn.key);
                  toggle(); // 사이드바 열기
                }}
                className="flex size-12 items-center justify-center rounded-xl bg-gray-100 text-center text-xs font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-dark-card-2 dark:text-white dark:hover:bg-dark-card-3"
              >
                {btn.key === 'image' ? (
                  <Image
                    src={UploadHoverImage}
                    alt="리파인드 로고2"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                ) : btn.key === 'update' ? (
                  <MdOutlineUpdate className="text-3xl" />
                ) : btn.key === 'more' ? (
                  <MdOutlineMoreHoriz className="text-3xl" />
                ) : null}
              </button>
            </Tooltip>
          ))}
        </div>
      )}
      {!isOpen && userInfo?.albums && userInfo.albums.length > 0 && (
        <div className="flex w-full flex-col items-center justify-start gap-2 rounded-lg bg-white dark:bg-dark-card">
          <hr className="mb-1 mt-3 w-8 border-t border-gray-300 dark:border-whiteAlpha-300" />
          <div className="flex flex-col items-center gap-2">
            {userInfo.albums.map((album) => (
              <Tooltip
                key={album.id}
                label={album.name}
                position="right-center"
                delay={100}
                fontSize="text-base"
              >
                <Link
                  href={`/album/${album.id}?viewType=masonry`}
                  prefetch={false}
                  className="flex size-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition hover:bg-gray-200 dark:bg-dark-card-2 dark:text-white dark:hover:bg-dark-card-3"
                >
                  <Image
                    src={
                      album.cover_image === ''
                        ? 'https://placehold.co/100x100'
                        : album.cover_image
                    }
                    alt={album.name}
                    width={48}
                    height={48}
                    className="rounded-xl object-cover"
                    unoptimized
                    style={{ width: '48px', height: '48px' }} // ✅ 확정 크기 강제
                  />
                </Link>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
      {isOpen && (
        <CustomScrollContainer className="flex size-full flex-col items-center overflow-y-auto bg-white transition-all duration-300 dark:bg-dark-card">
          <div
            className={`sticky top-0 z-20 mb-1 flex h-16 w-full items-center justify-start gap-2 bg-white py-4 pl-3 transition-colors dark:bg-dark-card`}
          >
            {leftTabButtons.map((btn) => {
              const isSelected = activeTab === btn.key;
              return (
                <button
                  key={btn.key}
                  onClick={() => setActiveTab(btn.key)}
                  className={`flex h-10 min-w-16 items-center justify-center rounded-full px-3 py-1 text-base font-bold ${
                    isSelected
                      ? 'bg-[var(--darkmode-button)] text-white dark:bg-whiteAlpha-900 dark:text-blackAlpha-900'
                      : 'bg-light-button text-[var(--lightmode-button-text)] hover:bg-light-button-hover active:bg-gray-800 group-hover:bg-light-card-2 dark:bg-dark-card-2 dark:text-white dark:hover:bg-dark-card-3'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
          {activeTab === 'image' && (
            <div className="w-full p-1">
              <TopTitle />
              <Upload />
            </div>
          )}
          {activeTab === 'update' && (
            <div className="w-full p-4">
              <UpdateBoard />
            </div>
          )}
          {activeTab === 'more' && (
            <div className="flex w-full flex-col items-center gap-4 p-4">
              <MoreButtons />
              <Link
                className="link-to-wakzoo inline-block"
                href={SOURCE_URL}
                target="_blank"
              >
                <div className="inline-flex min-h-10 items-center justify-center rounded-md bg-purple-500 px-4 text-gray-50 transition hover:bg-purple-600 active:bg-purple-700">
                  <AiFillExperiment className="mr-1.5 size-4 xs:mr-2 xs:size-5" />
                  <p className="text-sm xs:text-base">
                    (beta)이세돌 팬아트 키워드 AI
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
              <UpdateLogBoard />
              <RandomGacha />
            </div>
          )}
        </CustomScrollContainer>
      )}
    </section>
  );
}
