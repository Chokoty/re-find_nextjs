'use client';

import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import DeleteCustomAlbumModal from '@/app/album/components/Modal/DeleteCustomAlbumModal';
import queryOptions2 from '@/app/album/service/client/queries';
import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { useDeleteModeStore } from '@/app/album/store/deleteModeStore';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import queryOptions1 from '@/service/client/queries';

export default function FanartsInAlbumDeleteButton() {
  const fanarts = useCheckFanartStore((state) => state.fanarts);
  const isDelete = useDeleteModeStore((state) => state.isDelete);
  const [isShow, setIsShow] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathNameParts = pathname.split('/');
  const albumName = pathNameParts[pathNameParts.length - 1];
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

  const { show: showDeleteCustomAlbumModal } = useModal(DeleteCustomAlbumModal);

  const showSaveButton = () => {
    setIsShow(true); // 모달이 닫히면 버튼 보이기
  };
  const handleDeleteFanartsInCustomAlbum = () => {
    showDeleteCustomAlbumModal({
      animateDir: 'bottom',
      albumName,
      showSaveButton,
      isDeleteAlbum: false,
      articles: fanarts,
      onSuccess: () => {
        refreshAlbumArtworks();
      },
    });
    setIsShow(false); // 모달이 열리면 버튼 숨기기
  };

  const handleDeleteCustomAlbum = () => {
    showDeleteCustomAlbumModal({
      animateDir: 'bottom',
      albumName,
      showSaveButton,
      isDeleteAlbum: true,
      articles: [],
      onSuccess: () => {
        refreshMyinfo();
        router.back();
      },
    });
    setIsShow(false); // 모달이 열리면 버튼 숨기기
  };

  // 삭제 모드가 아닐 때는 아무 것도 렌더링하지 않음
  if (!isShow || !isDelete) {
    return null;
  }

  return (
    <div className="fixed bottom-10 z-[300] hidden w-full animate-modalRenderFromBottom flex-col items-center justify-center gap-4 rounded-lg p-4 md:flex">
      <Button
        intent="solid-red"
        size="lg"
        onClick={handleDeleteCustomAlbum}
        additionalClass="w-4/5"
      >
        앨범 삭제
      </Button>
      {fanarts.length > 0 && (
        <Button
          intent="solid-red"
          size="lg"
          onClick={handleDeleteFanartsInCustomAlbum}
          additionalClass="w-4/5"
        >
          선택한 팬아트 삭제({fanarts.length})
        </Button>
      )}
    </div>
  );
}
