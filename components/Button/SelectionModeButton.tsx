import React, { useEffect } from 'react';
import { MdCheckCircle, MdClose } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';

import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { useSelectModeStore } from '@/app/album/store/selectModeStore';
import Button from '@/components/Button';

export default function SelectionModeButton() {
  const { isSelectMode, setSelectMode } = useSelectModeStore(
    useShallow((state) => ({
      isSelectMode: state.isSelectMode,
      setSelectMode: state.setSelectMode,
    }))
  );
  const setFanarts = useCheckFanartStore((state) => state.setFanarts);
  const handleToggleSelectMode = () => {
    if (isSelectMode) {
      setSelectMode(false); // 선택 모드 해제
      setFanarts([]); // 체크된 팬아트 초기화
    } else {
      setSelectMode(true); // 편집 시작
    }
  };

  // 페이지 벗어날 때 편집 모드 초기화
  useEffect(() => {
    return () => {
      setSelectMode(false); // 컴포넌트 언마운트 시 상태 리셋
      setFanarts([]);
    };
  }, []);

  return (
    <Button
      intent="ghost-gray"
      onClick={handleToggleSelectMode}
      additionalClass="m-0 p-1.5 h-7 min-h-7 text-sm"
    >
      {isSelectMode ? (
        <>
          <MdClose className="mr-1 text-green-300" size={16} />
          <span className="text-green-300">선택해제</span>
        </>
      ) : (
        <>
          <MdCheckCircle
            className="mr-1 text-blackAlpha-700 dark:text-whiteAlpha-700"
            size={16}
          />
          <span className="text-blackAlpha-700 dark:text-whiteAlpha-700">
            선택모드
          </span>
        </>
      )}
    </Button>
  );
}
