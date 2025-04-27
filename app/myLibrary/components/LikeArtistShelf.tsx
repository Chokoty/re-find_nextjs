import Image from 'next/image';
import Link from 'next/link';

import { useSubscribedArtists } from '@/app/myLibrary/service/client/useMyService';

export default function LikeArtistShelf() {
  const { data } = useSubscribedArtists();

  /**
   {"status":"success","list":[{"nick":"라면조리기","profimg":"https://cafeptthumb-phinf.pstatic.net/MjAyMzA0MDFfOTkg/MDAxNjgwMzI4ODM5NDE1.TQDFFDUmP5alAfbzK3Rwe_lt5VVl92k98MYRC8jjghgg.FCx7oxr63R-qSr9sAmg1SKYyFjiYmMq-BaOxDLaTJn0g.JPEG/600_%25281%2529.jpg?type=s3"}]}
   */
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
      <ul className="grid w-full grid-cols-2 gap-6 2xs:grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data?.list &&
          data.list.map(({ nick, profimg }) => (
            <li key={nick} className="max-w-[200px] list-none">
              <Link
                className="link-to-profile flex size-full flex-col items-center justify-center gap-4 rounded-md p-2 transition hover:bg-gray-200 active:bg-whiteAlpha-400 dark:hover:bg-whiteAlpha-300 dark:active:bg-black-200 md:p-4 "
                href={`/artists/${nick}`}
                prefetch={false}
              >
                <div className="relative size-[85px] sm:size-[100px] xl:size-[130px] 2xl:size-[160px]">
                  <Image
                    className="rounded-full object-cover"
                    src={profimg}
                    alt={nick}
                    sizes="(max-width: 1000px) 10vw, 15vw"
                    quality={100}
                    fill
                    priority
                    unoptimized
                  />
                </div>
                <p className="w-full text-start">{nick}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
