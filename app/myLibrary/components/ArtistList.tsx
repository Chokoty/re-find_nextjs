'use client';

import Image from 'next/image';
import Link from 'next/link';

import BackToLibraryLink from '@/app/myLibrary/components/BackToLibraryLink';
import TotalCount from '@/app/myLibrary/components/TotalCount';
import { useSubscribedArtists } from '@/app/myLibrary/service/client/useMyService';

export default function ArtistList() {
  const { data } = useSubscribedArtists();

  // const total = 0; // TODO: get total count from API or state management
  const total = data?.list.length || 0;
  return (
    <div className="w-full">
      <div className="mt-8 flex size-full flex-col px-8">
        <BackToLibraryLink />
        <div className="mb-12 flex items-end justify-start gap-4">
          <p className="text-left text-xl font-extrabold md:text-3xl">
            구독중인 작가
          </p>
          <TotalCount total={total} />
        </div>
        {/* body */}
        <ul
          className="
            grid w-full grid-cols-1
            gap-6
            xs:grid-cols-2
            sm:grid-cols-3
            2md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
            2xl:grid-cols-8
          "
        >
          {data?.list &&
            data.list.map(({ nick, profimg }) => (
              <li key={nick} className="mx-auto max-w-[200px] list-none">
                <Link
                  href={`/artists/${nick}`}
                  className="
                    flex flex-col items-center gap-4 rounded-md p-2
                    transition hover:bg-gray-100 dark:hover:bg-gray-800
                  "
                  prefetch={false}
                >
                  <div className="relative size-[85px] md:size-[100px] xl:size-[120px]">
                    <Image
                      src={profimg || 'https://placehold.co/375x375'}
                      alt={nick}
                      fill
                      className="rounded-full object-cover"
                      sizes="(max-width: 768px) 20vw, 120px"
                      priority
                      unoptimized
                    />
                  </div>
                  <p className="w-full truncate text-center">{nick}</p>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
