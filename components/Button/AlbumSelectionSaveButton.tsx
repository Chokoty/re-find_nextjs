'use client';

import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import queryOptions from '@/app/album/service/client/queries';
import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { useSelectModeStore } from '@/app/album/store/selectModeStore';
import Button from '@/components/Button';
import AddCheckedFanartsToCustomAlbumModal from '@/components/Modal/AddCheckedFanartsToCustomAlbumModal';
import useModal from '@/hooks/useModal';

export default function AlbumSelectionSaveButton() {
  const { fanarts, setFanarts } = useCheckFanartStore((state) => ({
    fanarts: state.fanarts,
    setFanarts: state.setFanarts,
  }));
  const isSelectMode = useSelectModeStore((state) => state.isSelectMode);
  const [isShow, setIsShow] = useState(true);
  const pathname = usePathname();
  const pathNameParts = pathname.split('/');
  const albumName = pathNameParts[pathNameParts.length - 1];
  const searchParams = useSearchParams();
  const sortTypeInit = searchParams.get('sortType') ?? '';
  const { queryKey: galleryArtworksKey } = queryOptions.galleryArtworks({
    sortType: sortTypeInit === '' ? 'alzaltak' : sortTypeInit,
    galleryType: albumName,
  });

  const queryClient = useQueryClient();

  const { show: showAddFanartsToCustomAlbumModal } = useModal(
    AddCheckedFanartsToCustomAlbumModal
  );
  const refreshAlbumArtworks = () => {
    queryClient.invalidateQueries({ queryKey: galleryArtworksKey });
  };

  const showSaveButton = () => {
    setIsShow(true); // 모달이 닫히면 버튼 보이기
  };

  const handleShowAddFanartsModal = () => {
    showAddFanartsToCustomAlbumModal({
      fanarts,
      animateDir: 'bottom',
      onSuccess: () => {
        refreshAlbumArtworks(); // 팬아트 저장 후 앨범 아트워크 목록 새로고침
        showSaveButton();
        setFanarts([]); // 팬아트 저장 후 팬아트 목록 초기화
      },
      onCancel: () => {
        setIsShow(true);
      },
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
