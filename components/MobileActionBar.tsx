'use client';

import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  MdClose,
  MdDelete,
  MdOutlineFolder,
  MdWarningAmber,
} from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';

import DeleteCustomAlbumModal from '@/app/album/components/Modal/DeleteCustomAlbumModal';
import queryOptions2 from '@/app/album/service/client/queries';
import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { useDeleteModeStore } from '@/app/album/store/deleteModeStore';
import { useSelectModeStore } from '@/app/album/store/selectModeStore';
import AddCheckedFanartsToCustomAlbumModal from '@/components/Modal/AddCheckedFanartsToCustomAlbumModal';
import useModal from '@/hooks/useModal';
import queryOptions1 from '@/service/client/queries';

export default function MobileActionBar() {
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
  const { isDeleteMode, setIsDeleteMode } = useDeleteModeStore(
    useShallow((state) => ({
      isDeleteMode: state.isDeleteMode,
      setIsDeleteMode: state.setIsDeleteMode,
    }))
  );

  const { show: showAddFanartsToCustomAlbumModal } = useModal(
    AddCheckedFanartsToCustomAlbumModal
  );
  const { show: showDeleteCustomAlbumModal } = useModal(DeleteCustomAlbumModal);
  const router = useRouter();
  const pathname = usePathname();
  const pathNameParts = pathname.split('/');
  const albumName = pathNameParts[pathNameParts.length - 1];
  const searchParams = useSearchParams();
  const sortTypeInit = searchParams.get('sortType') ?? '';
  const { queryKey: myInfoQueryKey } = queryOptions1.myInfo();
  const { queryKey: galleryArtworksKey } = queryOptions2.galleryArtworks({
    sortType: sortTypeInit === '' ? 'alzaltak' : sortTypeInit,
    galleryType: albumName,
  });

  const queryClient = useQueryClient();
  const refreshMyinfo = () => {
    queryClient.invalidateQueries({ queryKey: myInfoQueryKey });
  };
  const refreshAlbumArtworks = () => {
    queryClient.invalidateQueries({ queryKey: galleryArtworksKey });
  };

  useEffect(() => {
    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
    setIsIOS(isDeviceIOS);
  }, []);

  const onSave = () => {
    if (fanarts.length < 1) {
      showWarningToast('팬아트를 1개 이상 선택해야 합니다.');
      return;
    }
    showAddFanartsToCustomAlbumModal({
      fanarts,
      animateDir: 'bottom',
      // applyCustomMaxWidth: true,
      handleAfterSuccessCallback: exitModes,
    });
  };

  const exitModes = () => {
    setSelectMode(false);
    setIsDeleteMode(false);
    setFanarts([]);
  };

  const showWarningToast = (message: string) => {
    toast(
      (t) => (
        <div className="flex items-center gap-2">
          <MdWarningAmber size={24} color="#fbbf24" />
          <span>{message}</span>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="hover:bg-black/10 ml-2 rounded-full p-1"
            aria-label="닫기"
          >
            <MdClose size={18} />
          </button>
        </div>
      ),
      { style: { minWidth: 220 } }
    );
  };

  const handleDeleteFanartsInCustomAlbum = () => {
    if (fanarts.length < 1) {
      showWarningToast('삭제 항목을 1개 이상 선택해야 합니다.');
      return;
    }

    showDeleteCustomAlbumModal({
      animateDir: 'bottom',
      albumName,
      // showSaveButton,
      isDeleteAlbum: false,
      articles: fanarts,
      onSuccess: () => {
        refreshAlbumArtworks();
        toast.success(`${fanarts.length}개 항목이 삭제되었습니다`);
        exitModes();
      },
    });
  };

  const handleDeleteCustomAlbum = () => {
    showDeleteCustomAlbumModal({
      animateDir: 'bottom',
      albumName,
      // showSaveButton,
      isDeleteAlbum: true,
      articles: [],
      onSuccess: () => {
        refreshMyinfo();
        toast.success('앨범이 삭제되었습니다');
        router.back();
      },
    });
  };

  // 모드별 버튼 설정
  const modeConfig = {
    delete: {
      color: 'bg-red-500',
      buttons: [
        {
          key: 'album_delete',
          label: '앨범삭제',
          icon: MdDelete,
          onClick: handleDeleteCustomAlbum,
        },
        {
          key: 'album_delete',
          label: '팬아트삭제',
          icon: MdDelete,
          onClick: handleDeleteFanartsInCustomAlbum,
        },
        {
          key: 'cancel',
          label: '취소',
          icon: MdClose,
          onClick: exitModes,
        },
      ],
    },
    select: {
      color: 'bg-green-500',
      buttons: [
        {
          key: 'save',
          label: '담기',
          icon: MdOutlineFolder,
          onClick: onSave,
        },
        {
          key: 'cancel',
          label: '선택취소',
          icon: MdClose,
          onClick: exitModes,
        },
      ],
    },
  };

  const currentMode = isDeleteMode ? 'delete' : 'select';

  if (!isSelectMode && !isDeleteMode) return null;

  return (
    <nav
      className={clsx(
        'fixed bottom-0 z-[201] flex w-full justify-center transition-transform duration-300 ease-in-out md:hidden',
        isSelectMode || isDeleteMode ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div
        className={`relative flex w-full items-center justify-evenly ${modeConfig[currentMode].color} shadow-navBottom backdrop-blur-md ${
          isIOS ? 'h-[80px] pb-2' : 'h-[60px]'
        }`}
      >
        {fanarts.length > 0 && (
          <div
            className={`${modeConfig[currentMode].color} absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-full px-2.5 py-1 text-sm font-semibold text-white shadow`}
          >
            {fanarts.length}
          </div>
        )}
        {modeConfig[currentMode].buttons.map(
          ({ key, label, icon: Icon, onClick }) => (
            <button
              key={key}
              className="flex flex-col items-center justify-center gap-1 rounded-full px-2 py-1 text-white transition"
              onClick={onClick}
              type="button"
            >
              <div className="mb-0.5 flex size-7 items-center justify-center">
                <Icon size={28} />
              </div>
              <span className="w-16 text-center text-xs font-medium">
                {label}
              </span>
            </button>
          )
        )}
      </div>
    </nav>
  );
}
