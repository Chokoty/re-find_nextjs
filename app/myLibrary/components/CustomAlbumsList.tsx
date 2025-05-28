'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { useCreateCustomAlbum } from '@/app/myLibrary/service/client/useMyService';
import queryOptions from '@/service/client/queries';
import { useMyInfo } from '@/service/client/useCommonService';

export default function CustomAlbumsList() {
  const { data: userInfo } = useMyInfo();
  const total = userInfo?.albums.length || 0;

  const router = useRouter();
  const handleOnSuccess = (albumId: string) => {
    refreshAlbumArtworks();
    toast.success('새로운 앨범이 추가되었습니다.');
    router.push(`/album/${albumId}`);
  };
  const { mutate: createCustomAlbum, status } = useCreateCustomAlbum(
    [],
    handleOnSuccess
  );
  const { queryKey } = queryOptions.myInfo();
  const queryClient = useQueryClient();
  const refreshAlbumArtworks = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  const handleAddCustomAlbum = () => {
    createCustomAlbum();
  };

  if (total === 0) {
    return (
      <div className="col-span-full py-12 text-center">
        <p className="text-gray-500">생성된 앨범이 없습니다</p>
        <button className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white">
          새 앨범 만들기
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-12 flex items-center justify-between">
        <p className="text-left text-xl font-extrabold md:text-3xl">
          나의 커스텀 앨범
        </p>
        <button
          className="rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          onClick={handleAddCustomAlbum}
          disabled={status === 'pending'}
        >
          + 새 앨범 만들기
        </button>
      </div>
      <ul className="grid w-full grid-cols-2 gap-1 xs:grid-cols-3 xs:gap-2 2xs:gap-4 sm:grid-cols-4 md:grid-cols-3 2md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {userInfo?.albums.map((album) => (
          <li key={album.id} className="mx-auto max-w-[200px] list-none">
            <Link
              href={`/album/${album.id}?viewType=masonry`}
              className="flex flex-col items-center gap-4 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800 2xs:p-2"
              prefetch={false}
            >
              <div className="aspect-square relative size-[100px] overflow-hidden rounded-md 2xl:size-[130px]">
                <Image
                  src={
                    album.cover_image === ''
                      ? 'https://placehold.co/375x375'
                      : album.cover_image
                  }
                  alt={album.name}
                  fill
                  className="object-cover hover:brightness-90"
                  sizes="(max-width: 768px) 20vw, 120px"
                  priority
                  unoptimized
                />
              </div>
              <p className="w-[100px] truncate text-center 2xl:w-[130px]">
                {album.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
