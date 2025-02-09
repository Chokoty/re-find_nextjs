'use client';

import { useState } from 'react';

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
  const handleAddToCustomAlbum = () => {
    console.log(fanarts);
  };

  const { mutate: addFanartsIntoCustomAlbum } = ussAddFanartsInToCustomAlbum(
    selected || '',
    fanarts as number[]
  );

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
              />
            ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-4">
          <Button intent="ghost-gray" onClick={hide}>
            취소하기
          </Button>
          <Button onClick={handleAddToCustomAlbum}>추가하기</Button>
        </div>
      </div>
    </section>
  );
}
