'use client';

import { IoClose } from 'react-icons/io5';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import { useDeleteCustomAlbum } from '@/app/myLibrary/service/client/useMyService';
import { useRouter } from 'next/navigation';

export default function DeleteCustomAlbumModal(props: Record<string, unknown>) {
  const { hide } = useModal();
  const router = useRouter();
  const title = props.title;
  const { mutate: deleteCustomAlbumInfo } = useDeleteCustomAlbum({
    albumId: 'user--e0b5',
    artworksIdList: [],
    isDeleteAlbum: true,
  });
  const onClose = () => {
    hide();
  };

  const onDelete = () => {
    deleteCustomAlbumInfo();
    onClose();
    router.push('/');
  };

  return (
    <section className="relative m-auto flex flex-col items-center justify-start rounded-2xl bg-white p-8 dark:bg-dark-card">
      <h2 className="mt-4 text-center text-xl font-bold lg:text-2xl">
        내 라이브러리에서 삭제할까요?
      </h2>
      <p>{`내 라이브러리에서 내 ${title}이(가) 삭제됩니다.`}</p>
      <div className="mt-4 flex gap-2">
        <Button onClick={onClose} intent="ghost-gray">
          취소하기
        </Button>
        <Button onClick={onDelete} intent="solid-red">
          삭제하기
        </Button>
      </div>
    </section>
  );
}
