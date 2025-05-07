'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { MdCheckCircle, MdClose } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';

import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { useEditModeStore } from '@/app/album/store/editModeStore';
import Button from '@/components/Button';

const BackToLibraryLink = ({
  hasRightButton = false,
}: {
  hasRightButton?: boolean;
}) => {
  const { isEdit: isCheckable, setIsEdit: setIsCheckable } = useEditModeStore(
    useShallow((state) => ({
      isEdit: state.isEdit,
      setIsEdit: state.setIsEdit,
    }))
  );
  const { fanarts, setFanarts } = useCheckFanartStore(
    useShallow((state) => ({
      fanarts: state.fanarts,
      setFanarts: state.setFanarts,
    }))
  );
  const handleChoiceButtonClick = () => {
    if (isCheckable) {
      setIsCheckable(false); // 선택 모드 해제
      setFanarts([]); // 체크된 팬아트 초기화
    } else {
      setIsCheckable(true); // 편집 시작
    }
  };
  const handleClearFanarts = () => {
    setFanarts([]);
  };

  // 페이지 벗어날 때 편집 모드 초기화
  useEffect(() => {
    return () => {
      setIsCheckable(false); // 컴포넌트 언마운트 시 상태 리셋
      setFanarts([]);
    };
  }, []);

  const activeColor = 'text-green-600';
  const inactiveColor = 'text-blackAlpha-700 dark:text-whiteAlpha-700';

  return (
    <div className="mb-4 flex w-full items-center justify-between">
      {/* 왼쪽: 내 라이브러리로 돌아가기 */}
      <Link
        href="/myLibrary"
        className="flex w-max items-center text-blackAlpha-700 dark:text-whiteAlpha-700"
      >
        <FaAngleLeft className="mr-1" />
        <span className="text-blackAlpha-700 dark:text-whiteAlpha-700">
          내 라이브러리
        </span>
      </Link>
      {/* 오른쪽: 선택 모드 버튼 */}
      {hasRightButton && (
        <div className="flex items-center gap-1">
          {fanarts.length > 0 && (
            <Button
              intent="ghost-gray"
              onClick={handleClearFanarts}
              additionalClass="m-0 p-1.5 h-7 min-h-7 text-sm"
            >
              <MdClose
                className="mr-1 text-blackAlpha-700 dark:text-whiteAlpha-700"
                size={16}
              />
              <span className="text-blackAlpha-700 dark:text-whiteAlpha-700">
                선택취소
              </span>
            </Button>
          )}
          <Button
            intent="ghost-gray"
            onClick={handleChoiceButtonClick}
            additionalClass="m-0 p-1.5 h-7 min-h-7 text-sm"
          >
            <MdCheckCircle
              className={`mr-1 ${isCheckable ? activeColor : inactiveColor}`}
              size={14}
            />
            <span className={isCheckable ? activeColor : inactiveColor}>
              선택모드
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default BackToLibraryLink;
