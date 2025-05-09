'use client';

import { useEffect, useState } from 'react';
import { MdClose, MdOutlineFolder } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';

import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { useSelectModeStore } from '@/app/album/store/selectModeStore';

interface MobileActionBarProps {
  disabledAdd?: boolean;
  disabledSave?: boolean;
  disabledCancel?: boolean;
}

export default function MobileActionBar({
  disabledSave = false,
  disabledCancel = false,
}: MobileActionBarProps) {
  const [isIOS, setIsIOS] = useState(false);
  const setFanarts = useCheckFanartStore((state) => state.setFanarts);
  const { isSelectMode, setSelectMode } = useSelectModeStore(
    useShallow((state) => ({
      isSelectMode: state.isSelectMode,
      setSelectMode: state.setSelectMode,
    }))
  );

  useEffect(() => {
    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
    setIsIOS(isDeviceIOS);
  }, []);

  const onSave = () => {};

  const onCancel = () => {
    setSelectMode(false);
    setFanarts([]);
  };

  // 버튼 데이터 배열로 관리 (확장성, 반복 렌더링)
  const buttons = [
    // {
    //   key: 'add',
    //   label: '추가',
    //   icon: MdAdd,
    //   onClick: onAdd,
    //   disabled: disabledAdd,
    // },
    {
      key: 'save',
      label: '담기',
      icon: MdOutlineFolder,
      onClick: onSave,
      disabled: disabledSave,
    },
    {
      key: 'cancel',
      label: '선택취소',
      icon: MdClose,
      onClick: onCancel,
      disabled: disabledCancel,
    },
  ];

  if (!isSelectMode) return null;

  return (
    <nav className="fixed bottom-0 z-[201] flex w-full justify-center md:hidden">
      <div
        className={`flex w-full items-center justify-evenly bg-green-500 shadow-navBottom backdrop-blur-md ${
          isIOS ? 'h-[80px] pb-2' : 'h-[60px]'
        }`}
      >
        {buttons.map(({ key, label, icon: Icon, onClick, disabled }) => (
          <button
            key={key}
            className="flex flex-col items-center justify-center gap-1 rounded-full px-2 py-1 text-white transition"
            onClick={onClick}
            disabled={disabled}
            type="button"
          >
            <div className="mb-0.5 flex size-7 items-center justify-center">
              <Icon size={28} />
            </div>
            <span className="w-16 text-center text-xs font-medium">
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
