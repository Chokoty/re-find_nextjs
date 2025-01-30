import Link from 'next/link';

import ArtistList from '@/app/myLibrary/components/ArtistList';
import { useSubscribedArtists } from '@/app/myLibrary/service/client/useMyService';

export default function LikeArtistShelf() {
  const { data } = useSubscribedArtists();
  console.log(`구독중인 작가: ${JSON.stringify(data)}`);
  return (
    <div className="mb-10 flex w-full flex-col p-2 md:px-6">
      <div className="mb-12 flex w-full content-end justify-between gap-4 md:mb-4">
        <Link
          href="/myLibrary/likeArtist"
          className="flex items-center hover:underline"
        >
          <p className="text-left text-xl font-extrabold md:text-2xl">
            구독중인 작가
          </p>
        </Link>
        <Link
          href="/myLibrary/likeArtist"
          className="flex items-center text-blackAlpha-700 hover:underline dark:text-whiteAlpha-700"
        >
          <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
            모두보기
          </p>
        </Link>
      </div>
      <ArtistList />
    </div>
  );
}
