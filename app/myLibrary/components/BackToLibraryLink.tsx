'use client';

import Link from 'next/link';
import { FaAngleLeft } from 'react-icons/fa';

import SelectionModeButton from '@/components/Button/SelectionModeButton';

const BackToLibraryLink = ({
  hasRightButton = false,
}: {
  hasRightButton?: boolean;
}) => {
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
      {hasRightButton && <SelectionModeButton />}
    </div>
  );
};

export default BackToLibraryLink;
