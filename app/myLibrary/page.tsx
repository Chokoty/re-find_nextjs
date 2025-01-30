'use client';

import ArtistTimelineShelf from '@/app/myLibrary/components/ArtistTimelineShelf';
import LikeArtistShelf from '@/app/myLibrary/components/LikeArtistShelf';
import LikeFanartShelf from '@/app/myLibrary/components/LikeFanartShelf';
import Button from '@/components/Button';
import { useCreateCustomAlbum } from '@/app/myLibrary/service/client/useMyService';
import AddButton from '@/app/myLibrary/components/AddButton';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/service/client/useCommonService';

export default function MyLibrary() {
  const router = useRouter();
  const handleOnSuccess = (albumId: string) => {
    router.push(`/album/${albumId}`);
  };
  const { mutate: createCustomAlbum, status } = useCreateCustomAlbum(
    [],
    handleOnSuccess
  );
  const { refetch } = useLogout();
  const handleAddCustomAlbum = () => {
    createCustomAlbum();
  };

  return (
    <div className="w-full p-2">
      <div className=" w-full rounded-xl border-[1px] border-dark-myText bg-white shadow-sm dark:border-0 dark:bg-dark-card ">
        <div className="w-full pt-4">
          <h1
            className="mb-10 mt-1.5
        break-keep p-10 font-pop text-4xl sm:text-5xl 2md:text-6xl lg:text-7xl 2xl:text-8xl"
          >
            내 라이브러리
          </h1>
        </div>
        <Button
          onClick={() => {
            refetch();
          }}
        >
          로그아웃
        </Button>

        <section className="relative ">
          <ArtistTimelineShelf />
          <LikeFanartShelf />
          <LikeArtistShelf />
          <div className="mb-10 flex w-full flex-col p-2 md:px-6">
            <div className="flex flex-wrap items-center justify-start gap-4">
              <AddButton handleClick={handleAddCustomAlbum} />
              <div className="size-40 rounded-md bg-gray-100"></div>
              <div className="size-40 rounded-md bg-gray-100"></div>
            </div>
          </div>
          {/* <div className="mb-10 flex w-full flex-col p-2 md:px-6">
            <div className="mb-12 flex w-full content-end justify-between gap-4 md:mb-4">
              <p className="text-left text-xl font-extrabold md:text-2xl">
                앨범 작품
              </p>
            </div>
            {albumArtworksStatus === 'success' && (
              <p>{JSON.stringify(artworks)}</p>
            )}
          </div> */}
        </section>
      </div>
    </div>
  );
}
