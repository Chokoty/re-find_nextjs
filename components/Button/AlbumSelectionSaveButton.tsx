'use client';

import { useState } from 'react';

import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { useSelectModeStore } from '@/app/album/store/selectModeStore';
import Button from '@/components/Button';
import AddCheckedFanartsToCustomAlbumModal from '@/components/Modal/AddCheckedFanartsToCustomAlbumModal';
import useModal from '@/hooks/useModal';

export default function AlbumSelectionSaveButton() {
  const fanarts = useCheckFanartStore((state) => state.fanarts);
  const isSelectMode = useSelectModeStore((state) => state.isSelectMode);
  const [isShow, setIsShow] = useState(true);

  const { show: showAddFanartsToCustomAlbumModal } = useModal(
    AddCheckedFanartsToCustomAlbumModal
  );

  const showSaveButton = () => {
    setIsShow(true); // 모달이 닫히면 버튼 보이기
  };

  const handleShowAddFanartsModal = () => {
    showAddFanartsToCustomAlbumModal({
      fanarts,
      animateDir: 'bottom',
      handleAfterSuccessCallback: showSaveButton,
    });
    setIsShow(false); // 모달이 열리면 버튼 숨기기
  };

  if (!isShow || fanarts.length < 1 || !isSelectMode) {
    return null; // 팬아트가 없거나 모달이 열리면 버튼 숨기기
  }

  return (
    <div className="fixed bottom-10 z-[300] hidden w-full animate-modalRenderFromBottom justify-center transition-all duration-500 ease-out md:flex">
      <Button
        intent="solid-green"
        size="lg"
        onClick={handleShowAddFanartsModal}
        additionalClass="w-4/5"
      >
        선택한 앨범 저장({fanarts.length})
      </Button>
    </div>
  );
}
