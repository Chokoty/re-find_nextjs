'use client';

import { useState } from 'react';
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
  const { data: user } = useMyInfo();
  const { hide } = useModal();
  const { fanarts } = props;

  const { mutate: addFanartsIntoCustomAlbum, isPending } =
    ussAddFanartsInToCustomAlbum({
      albumId: selected || '',
      items: fanarts as number[],
      handleOnSuccess: () => {
        hide();
      },
    });
  const handleAddToCustomAlbum = () => {
    // console.log(fanarts);
    if (!selected) return;
    addFanartsIntoCustomAlbum();
  };

  const toggleSelection = (id: string) => {
    setSelected((prevSelected) => (prevSelected === id ? null : id));
  };
  return (
    <section className="m-auto flex size-full flex-col items-center justify-center bg-white p-4 shadow-xl dark:bg-dark-card md:h-[550px] md:w-[430px] md:rounded-md">
      <h1 className="mb-4 w-full text-xl font-bold">
        팬아트를 추가할 앨범을 선택하세요
      </h1>
      <div className="flex size-full flex-col items-center justify-between px-2 pt-3 text-center text-sm 2xs:text-base">
        <div className="h-[400px] w-full overflow-auto">
          {user &&
            user.albums.map((album) => (
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
          <Button intent="ghost-gray" onClick={hide} disabled={isPending}>
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
