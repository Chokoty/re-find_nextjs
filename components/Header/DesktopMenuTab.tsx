import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaUserEdit } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';

import Divider from '@/components/Divider';
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
  세균단1,
  세균단2,
  이파리1,
  이파리2,
  주폭도1,
  주폭도2,
  팬치1,
  팬치2,
} from '@/lib/images';
import { useLogout, useMyInfo } from '@/service/client/useCommonService';

type RouterItem = {
  path: string;
  name: string;
  icon?: IconType; // 선택적 속성
  className: string;
};

const routerMap: Record<string, RouterItem> = {
  // recap2024: {
  //   path: '/recap2024',
  //   name: '2024 리캡',
  //   className: 'size-6',
  // },
  // event: {
  //   path: '/events',
  //   name: '이벤트관',
  //   icon: PiGiftBold,
  //   className: 'size-6',
  // },
  // more: {
  //   path: '/more',
  //   name: '더보기',
  //   icon: FiMenu,
  //   className: 'size-7',
  // },
  profile: {
    path: '/profile',
    name: '프로필',
    icon: FiMenu,
    className: 'size-7',
  },
};

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
    세균단: { default: 세균단1, hover: 세균단2 },
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
  const { show } = useModal(LoginModal); // 사용자 정보 가져오기
  const { isFetching, status, data } = useMyInfo();
  const { refetch: logoutRefetch } = useLogout(); // 로그아웃 요청
  const [userData, setUserData] = useState<UserInfo | null>(data ?? null);
  const [isHovered, setIsHovered] = useState(false); // 호버 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 토글 상태
  const menuRef = useRef<HTMLDivElement>(null);
  // const { refetch } = useLogout();

  useEffect(() => {
    setUserData(data ?? null);
  }, [data]);

  const handleClick = () => {
    show({ isBackdropClick: true });
  };

  // 로그아웃 기능: 홈으로 이동 + 사용자 정보 초기화
  const handleLogout = async () => {
    try {
      await logoutRefetch(); // 서버에서 로그아웃 요청 실행
      setIsMenuOpen(false);
      setUserData(null); // 로컬 상태에서 사용자 정보 제거
      await router.push('/'); // 🚀 홈으로 이동 후
      setTimeout(() => {
        window.location.reload(); // 🚀 홈에서 새로고침
      }, 100); // 100ms 대기 후 새로고침
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

  console.log('data', data);
  console.log('userdata', userData);

  return (
    <div className="flex items-center justify-end md:min-w-[80px]">
      {userData ? (
        <div className="relative" ref={menuRef}>
          <Tooltip label={userData.nick}>
            <div
              className="flex size-[48px] cursor-pointer items-center justify-center rounded-full shadow-sm hover:bg-white dark:shadow-none hover:dark:bg-dark-card"
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
        <button
          className="hidden px-2.5 font-semibold transition hover:text-green-highlight md:block"
          onClick={handleClick}
        >
          로그인
        </button>
      )}
      {/* {Object.keys(routerMap).map((key) => {
        const typedKey = key as keyof typeof routerMap;
        const {
          path: eachPath,
          name,
          icon: Icon,
          className: iconStyle,
        } = routerMap[typedKey];

        return (
          <Link
            href={eachPath}
            key={name}
            className={
              name === '이벤트관' || name === '2024 리캡'
                ? 'hidden md:block'
                : ''
            }
          >
            <Tooltip label={name}>
              <div
                className={`flex size-12 items-center justify-center rounded-full transition hover:bg-blackAlpha-200 active:bg-blackAlpha-300 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300 ${
                  Icon ? '' : 'px-4' // 텍스트가 길 경우 여백 추가
                }`}
                style={Icon ? {} : { minWidth: `${name.length * 16}px` }} // 텍스트 길이에 따라 최소 가로 크기 설정
              >
                {Icon ? (
                  <Icon className={iconStyle} />
                ) : (
                  <span className="text-base font-medium text-green-highlight">
                    {name}
                  </span>
                )}
              </div>
            </Tooltip>
          </Link>
        );
      })} */}
    </div>
  );
}
