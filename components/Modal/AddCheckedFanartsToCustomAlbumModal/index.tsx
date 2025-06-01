'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Toast } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

import { ussAddFanartsInToCustomAlbum } from '@/app/myLibrary/service/client/useMyService';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import { useMyInfo } from '@/service/client/useCommonService';

import CustomAlbumRow from './CustomAlbumRow';

export default function AddCheckedFanartsToCustomAlbumModal(
  props: Record<string, unknown>
) {
  const [selected, setSelected] = useState<string | null>(null);
  const { data: userInfo } = useMyInfo();
  const { hide } = useModal();
  const fanarts = props.fanarts as number[];
  const onSuccess = props.onSuccess as () => void;
  const onCancel = props.onCancel as () => void;

  const { mutate: addFanartsIntoCustomAlbum, isPending } =
    ussAddFanartsInToCustomAlbum({
      albumId: selected || '',
      items: fanarts,
      handleOnSuccess: () => {
        handleClose();
        if (!selected) return;
        onSuccess();
        showAlbumAddedToast(selected);
      },
      handleOnError: hide,
    });

  function showAlbumAddedToast(albumId: string) {
    toast.custom(
      (t: Toast) => (
        <div
          className={`flex items-center justify-between rounded bg-white px-4 py-3 shadow-lg dark:bg-dark-card ${t.visible ? 'animate-enter' : 'animate-leave'}`}
          style={{ minWidth: 320 }}
        >
          <span className="font-medium">팬아트가 앨범에 추가되었습니다.</span>
          <Link
            href={`/album/${albumId}?viewType=masonry`}
            // target="_blank"
            className="ml-4 rounded-md bg-green-500 px-3 py-1 text-white transition hover:bg-green-600"
            onClick={() => toast.dismiss(t.id)}
          >
            앨범으로 이동
          </Link>
        </div>
      ),
      { duration: 4000 }
    );
  }

  const handleClose = () => {
    hide();
    onCancel?.();
  };
  const handleAddToCustomAlbum = () => {
    // console.log(fanarts);
    if (!selected) return;
    addFanartsIntoCustomAlbum();
  };

  const toggleSelection = (id: string) => {
    setSelected((prevSelected) => (prevSelected === id ? null : id));
  };
  return (
    <section className="m-auto flex h-[560px] w-[90%] flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-xl dark:bg-dark-card md:h-[550px] md:w-full md:max-w-[760px]">
      <h1 className="mb-4 w-full text-xl font-bold">
        팬아트를 추가할 앨범을 선택하세요
      </h1>
      <div className="flex size-full flex-col items-center justify-between pt-3 text-center text-sm 2xs:text-base md:px-2">
        <div className="h-[400px] w-full overflow-auto">
          {userInfo &&
            userInfo.albums.map((album) => (
              <CustomAlbumRow
                key={album.id}
                album={album}
                toggleSelection={toggleSelection}
                isSelected={selected === album.id}
                disabled={isPending}
              />
            ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-4">
          <Button
            intent="ghost-gray"
            onClick={handleClose}
            disabled={isPending}
          >
            취소하기
          </Button>
          <Button
            onClick={handleAddToCustomAlbum}
            disabled={!selected || isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-1">
                <span>추가 중</span>
                <ClipLoader
                  size={20} // 사이즈 조절
                  color="#3B82F6" // tailwind blue-500
                  speedMultiplier={0.75} // 회전 속도 조절
                />
              </div>
            ) : (
              '추가하기'
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
