import React from 'react';

import useModal from '@/hooks/useModal';
import { useMyInfo } from '@/service/client/useCommonService';

import Button from '../Button';

export default function addFanartsToCustomAlbumModal(
  props: Record<string, unknown>
) {
  const { data: user } = useMyInfo();
  const { hide } = useModal();
  const { fanarts } = props;
  const handleAddToCustomAlbum = () => {
    console.log(fanarts);
  };
  return (
    <section className="m-auto size-full bg-white p-4 shadow-xl dark:bg-dark-card md:h-[291px] md:w-[430px] md:rounded-md">
      <h1 className="text-xl font-bold">팬아트를 추가할 앨범을 선택하세요</h1>
      <div className="flex size-full flex-col items-center justify-between px-6 py-8 text-center text-sm 2xs:text-base md:py-6 lg:px-8">
        <div className="overflow-auto">
          <ul>
            {user &&
              user.albums.map((album) => (
                <li key={album.id}>{JSON.stringify(album)}</li>
              ))}
          </ul>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button intent="ghost-gray" onClick={hide}>
            취소하기
          </Button>
          <Button onClick={handleAddToCustomAlbum}>추가하기</Button>
        </div>
      </div>
    </section>
  );
}
