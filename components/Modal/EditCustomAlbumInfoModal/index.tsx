import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { MdInfo } from 'react-icons/md';

import queryOptions from '@/app/album/service/client/queries';
import { useEditCustomAlbum } from '@/app/myLibrary/service/client/useMyService';
import useModal from '@/hooks/useModal';

export default function EditCustomAlbumInfoModal(
  props: Record<string, unknown>
) {
  const { hide } = useModal();
  const albumName = props.albumName as string;
  const initialTitle = props.initialTitle as string;
  const initialDescription = props.initialDescription as string;
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const { queryKey } = queryOptions.galleryPageInfo(albumName);
  const queryClient = useQueryClient();

  const onClose = () => {
    hide();
  };

  const refreshAlbumInfo = () => {
    queryClient.invalidateQueries({ queryKey });
  };
  const { mutate: editCustomAlbumInfo, isPending } = useEditCustomAlbum({
    albumId: albumName,
    info: {
      name: title,
      description,
      is_public: true,
    },
    handleOnSuccess: () => {
      refreshAlbumInfo();
      toast.success('앨범 정보가 수정되었습니다.');
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editCustomAlbumInfo();
  };

  return (
    <div className="m-auto flex w-[90%] flex-col items-center justify-start rounded-2xl bg-white dark:bg-dark-card sm:w-full sm:max-w-lg">
      <div className="flex w-full items-center justify-between p-6">
        <h1 className="text-xl font-bold">앨범 정보 수정</h1>
        <button
          className="flex size-9 items-center justify-center rounded-full transition hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300"
          onClick={onClose}
        >
          <IoClose className="size-7" />
        </button>
      </div>
      <div className="flex w-full items-center gap-2 px-6 pb-2">
        <span className="flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-100">
          <MdInfo size={22} />
        </span>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 md:text-base">
          앨범 커버 이미지는{' '}
          <span className="font-bold text-green-500">3시간마다</span> 앨범 내
          팬아트 중 하나로 <span className="font-bold">자동 변경</span>됩니다.
        </p>
      </div>
      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className="w-full space-y-6 p-6 pt-0">
        <div>
          <label className="mb-2 block text-sm font-medium">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // className="dark:border-dark-hover w-full rounded-lg border p-3 focus:border-green-500 focus:ring-2 focus:ring-green-500 dark:bg-dark-card"
            className="w-full rounded-md border p-3 outline-none transition placeholder:text-gray-500 hover:border-green-highlight hover:bg-white focus:border-green-highlight focus:outline-none focus:ring-1 focus:ring-green-highlight dark:border-whiteAlpha-300 dark:bg-whiteAlpha-200 dark:placeholder:text-whiteAlpha-600 dark:hover:border-green-highlight dark:hover:bg-dark-card-3"
            placeholder="앨범 제목"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // className="dark:border-dark-hover h-32 w-full rounded-lg border p-3 focus:border-green-500 focus:ring-2 focus:ring-green-500 dark:bg-dark-card"
            className="h-32 w-full resize-none rounded-md border p-3 outline-none transition placeholder:text-gray-500 hover:border-green-highlight hover:bg-white focus:border-green-highlight focus:outline-none focus:ring-1 focus:ring-green-highlight dark:border-whiteAlpha-300 dark:bg-whiteAlpha-200 dark:placeholder:text-whiteAlpha-600 dark:hover:border-green-highlight dark:hover:bg-dark-card-3"
            placeholder="앨범 설명 (선택 사항)"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-green-500 px-6 py-2 text-white transition-colors hover:bg-green-600"
            disabled={isPending}
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
