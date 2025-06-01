import { useQueryClient } from '@tanstack/react-query';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';

import LoginModal from '@/components/LoginModal';
import Tooltip from '@/components/Tooltip';
import useModal from '@/hooks/useModal';
import {
  똥강아지1,
  똥강아지2,
  뚤기1,
  뚤기2,
  라니1,
  라니2,
  박쥐1,
  박쥐2,
  세균이1,
  세균이2,
  이파리1,
  이파리2,
  주폭도1,
  주폭도2,
  팬치1,
  팬치2,
} from '@/lib/images';
import queryOptions from '@/service/client/queries';
import { useLogout, useMyInfo } from '@/service/client/useCommonService';

// 프로필 이미지 선택 함수 (호버 여부 추가)
const getUserImage = (
  nick: string | undefined,
  profimg: string | null,
  isHovered: boolean
): string | StaticImageData => {
  if (profimg) return profimg; // 사용자가 직접 업로드한 이미지가 있으면 그대로 사용

  const userImages: Record<
    string,
    { default: StaticImageData; hover: StaticImageData }
  > = {
    똥강아지: { default: 똥강아지1, hover: 똥강아지2 },
    뚤기: { default: 뚤기1, hover: 뚤기2 },
    라니: { default: 라니1, hover: 라니2 },
    박쥐: { default: 박쥐1, hover: 박쥐2 },
    세균이이: { default: 세균이1, hover: 세균이2 },
    이파리: { default: 이파리1, hover: 이파리2 },
    주폭도: { default: 주폭도1, hover: 주폭도2 },
    팬치: { default: 팬치1, hover: 팬치2 },
  };
  //   return profimg || 이파리1; // profimg가 있으면 사용, 없으면 기본값 이파리1
  return (
    userImages[nick || '이파리']?.[isHovered ? 'hover' : 'default'] || 이파리1
  );
};

export default function DesktopMenuTab() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { queryKey } = queryOptions.myInfo();
  const { show } = useModal(LoginModal);
  const { data: userData } = useMyInfo();
  const { refetch: logoutRefetch } = useLogout(); // 로그아웃 요청

  const [isHovered, setIsHovered] = useState(false); // 호버 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 토글 상태
  const menuRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    show({ isBackdropClick: true });
  };

  // 로그아웃 기능: 홈으로 이동 + 사용자 정보 초기화
  const handleLogout = async () => {
    try {
      await logoutRefetch(); // 서버에서 로그아웃 요청 실행
      // queryClient.invalidateQueries({ queryKey });
      queryClient.removeQueries({ queryKey }); // 즉시 캐시 삭제!
      setIsMenuOpen(false);
      // router.push('/');
      window.location.href = '/'; // 홈으로 이동
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-end md:min-w-[80px]">
      {userData ? (
        <div className="relative" ref={menuRef}>
          <Tooltip label={userData.nick}>
            <div
              className="flex size-[48px] cursor-pointer items-center justify-center rounded-full border-base bg-white shadow-sm hover:scale-105 dark:border-none dark:bg-dark-card dark:shadow-none hover:dark:bg-dark-card"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Image
                width={100}
                height={100}
                className="size-[32px] rounded-full object-cover"
                src={
                  getUserImage(
                    userData.nick,
                    userData.profimg,
                    isHovered
                  ) as string
                }
                alt={userData.nick || '프로필 이미지'}
                unoptimized
              />
            </div>
          </Tooltip>
          {isMenuOpen && (
            <div className="absolute right-0 top-0 z-10 mt-12 w-60 rounded-lg bg-white shadow-lg dark:bg-dark-card">
              <ul className="py-2">
                <li className="px-2">
                  <button className="w-full rounded-md p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/profile" className="flex items-center gap-2">
                      <FaUserEdit className="size-5" />
                      <span>프로필</span>
                    </Link>
                  </button>
                </li>
                {/* <Divider /> */}
                <li className="mt-2 px-2">
                  <button
                    className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={handleLogout}
                  >
                    <LuLogOut className="size-5" />
                    로그아웃
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        // <button
        //   className="hidden px-2.5 font-semibold transition hover:text-green-highlight md:block"
        //   onClick={handleClick}
        // >
        //   로그인
        // </button>
        <></>
      )}
    </div>
  );
}
