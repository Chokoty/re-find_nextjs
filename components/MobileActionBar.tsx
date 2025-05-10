'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdClose, MdOutlineFolder, MdWarningAmber } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';

import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { useSelectModeStore } from '@/app/album/store/selectModeStore';
import AddCheckedFanartsToCustomAlbumModal from '@/components/Modal/AddCheckedFanartsToCustomAlbumModal';
import useModal from '@/hooks/useModal';

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
  const { fanarts, setFanarts } = useCheckFanartStore(
    useShallow((state) => ({
      fanarts: state.fanarts,
      setFanarts: state.setFanarts,
    }))
  );
  const { isSelectMode, setSelectMode } = useSelectModeStore(
    useShallow((state) => ({
      isSelectMode: state.isSelectMode,
      setSelectMode: state.setSelectMode,
    }))
  );

  const { show: showAddFanartsToCustomAlbumModal } = useModal(
    AddCheckedFanartsToCustomAlbumModal
  );

  useEffect(() => {
    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
    setIsIOS(isDeviceIOS);
  }, []);

  // const onSave = () => {
  //   if (fanarts.length < 1) {
  //     toast.error('팬아트를 1개 이상 선택해야 합니다.', {
  //       duration: 1000,
  //       icon: <MdWarningAmber size={24} color="#fbbf24" />,
  //     });
  //     return;
  //   }
  // };

  const onSave = () => {
    if (fanarts.length < 1) {
      toast(
        (t) => (
          <div className="flex items-center gap-2">
            <MdWarningAmber size={24} color="#fbbf24" />
            <span>팬아트를 1개 이상 선택해야 합니다.</span>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="hover:bg-black/10 ml-2 rounded-full p-1"
              aria-label="닫기"
            >
              <MdClose size={18} />
            </button>
          </div>
        ),
        {
          duration: 1000,
          style: { minWidth: 220 },
        }
      );
      return;
    }

    showAddFanartsToCustomAlbumModal({
      fanarts,
      animateDir: 'bottom',
      handleAfterSuccessCallback: () => {},
    });
  };

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
    <nav
      className={clsx(
        'fixed bottom-0 z-[201] flex w-full justify-center transition-transform duration-300 ease-in-out md:hidden',
        isSelectMode ? 'translate-y-0' : 'translate-y-full' // 아래에서 올라옴
      )}
    >
      <div
        className={`relative flex w-full items-center justify-evenly bg-green-500 shadow-navBottom backdrop-blur-md ${
          isIOS ? 'h-[80px] pb-2' : 'h-[60px]'
        }`}
      >
        {/* 선택 개수 표시 */}
        {fanarts.length > 0 && (
          <div
            className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2
                 rounded-full bg-green-500 px-2.5 py-1 text-sm font-semibold text-white shadow"
            // style={{ minWidth: '48px', textAlign: 'center' }}
          >
            {fanarts.length}
          </div>
        )}
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
