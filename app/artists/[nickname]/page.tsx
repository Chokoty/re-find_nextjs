import type { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';

import ArtistProfile from '@/app/artists/components/ArtistProfile';
import DetailedArtists from '@/app/artists/components/DetailedArtists';
import queryOptions from '@/app/artists/service/client/queries';
import { getAuthorInfo } from '@/app/artists/service/server';
import { siteConfig } from '@/lib/config';
import { NotSearch } from '@/lib/images';
import { getDehydratedInfiniteQuery, Hydrate } from '@/lib/react-query';

type Params = {
  params: { nickname: string };
};

// Image url 고민
export function generateMetadata({ params: { nickname } }: Params): Metadata {
  const { title, description, url } = siteConfig.artists.detailed(nickname);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: siteConfig.type,
      images: siteConfig.image,
      siteName: siteConfig.siteName,
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      site: siteConfig.siteName,
      creator: siteConfig.creator,
      images: siteConfig.image,
    },
    icons: siteConfig.icons,
  };
}

export default async function page({ params: { nickname } }: Params) {
  const decodedNickname = decodeURIComponent(nickname);
  const result = await getAuthorInfo(nickname);
  const { author_nickname, num_artworks } = result;
  // 배포 서버에서 실행할 경우
  if (!process.env.NEXT_PUBLIC_IS_LOCAL) {
    const { queryKey, queryFn } = queryOptions.artistArtworks({
      nickname: decodedNickname,
      sortType: 'latest',
      board: null,
    });
    const query = await getDehydratedInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam: 1,
    });

    return author_nickname === '' && num_artworks === 0 ? (
      <NotFound nickname={decodedNickname} />
    ) : (
      <div className="mb-8 mt-16 flex w-full flex-col items-center">
        <ArtistProfile nickname={decodedNickname} />
        <Hydrate state={{ queries: [query] }}>
          <Suspense>
            <DetailedArtists nickname={decodedNickname} artistInfo={result} />
          </Suspense>
        </Hydrate>
      </div>
    );
  }
  // 로컬에서 실행할 경우
  return author_nickname === '' && num_artworks === 0 ? (
    <NotFound nickname={decodedNickname} />
  ) : (
    <div className="mb-8 mt-16 flex w-full flex-col items-center">
      <ArtistProfile nickname={decodedNickname} />
      <Suspense>
        <DetailedArtists nickname={decodedNickname} artistInfo={result} />
      </Suspense>
    </div>
  );
}

const NotFound = ({ nickname }: { nickname: string }) => {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <p className="text-2xl font-semibold 2xs:text-4xl">
        {`'${nickname}' 님의 프로필`}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center">
        <Image
          src={NotSearch}
          alt="찾을 수 없음"
          width={200}
          height={200}
          unoptimized
          priority
        />
        <div className="mt-2 text-center">
          <p className="text-base 2xs:text-lg">존재하지 않는 아이디 이거나</p>
          <p className="text-base 2xs:text-lg">
            아직 업로드한 작품이 없는 것 같네요
          </p>
        </div>
      </div>
    </div>
  );
};
