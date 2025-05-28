'use client';

import { useDeleteCustomAlbum } from '@/app/myLibrary/service/client/useMyService';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';

export default function DeleteCustomAlbumModal(props: Record<string, unknown>) {
  const albumName = props.albumName as string;
  const showSaveButton = props.showSaveButton as () => void;
  const isDeleteAlbum = props.isDeleteAlbum as boolean;
  const articles = props.articles as number[];
  const onSuccess = props.onSuccess as () => void;
  const { hide } = useModal();
  const { mutate: deleteCustomAlbumInfo, isPending } = useDeleteCustomAlbum({
    albumId: albumName,
    artworksIdList: articles,
    isDeleteAlbum,
    handleOnSuccess: () => {
      hide();
      onSuccess();
    },
    handleOnError: hide,
  });
  const onClose = () => {
    hide();
    showSaveButton?.();
  };

  const onDelete = () => {
    deleteCustomAlbumInfo();
  };

  return (
    <section className="relative mx-6 my-auto flex flex-col items-center justify-start rounded-2xl bg-white p-8 dark:bg-dark-card 2xs:mx-12 md:mx-auto">
      <h2 className="mt-4 text-center text-xl font-bold lg:text-2xl">
        {isDeleteAlbum ? '앨범을 삭제할까요?' : '앨범에서 팬아트를 삭제할까요?'}
      </h2>
      <p className="mt-2 text-center text-base text-gray-700 dark:text-gray-200">
        {isDeleteAlbum
          ? `이 앨범(${albumName})과 앨범 내 모든 팬아트가 내 라이브러리에서 완전히 삭제됩니다.`
          : `선택한 팬아트가 앨범(${albumName})에서 삭제됩니다.`}
      </p>
      <div className="mt-4 flex gap-2">
        <Button onClick={onClose} intent="ghost-gray" disabled={isPending}>
          취소하기
        </Button>
        <Button onClick={onDelete} intent="solid-red" disabled={isPending}>
          삭제하기
        </Button>
      </div>
    </section>
  );
}
