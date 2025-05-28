import type { Metadata } from 'next';
import { Suspense } from 'react';

import ArtistProfile from '@/app/artists/components/ArtistProfile';
import DetailedArtists from '@/app/artists/components/DetailedArtists';
import queryOptions from '@/app/artists/service/client/queries';
import { siteConfig } from '@/lib/config';
import { getDehydratedInfiniteQuery, Hydrate } from '@/lib/react-query';

type Params = {
  params: Promise<{ nickname: string }>;
};

// Image url 고민
export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;

  const { nickname } = params;

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

export default async function page(props: Params) {
  const params = await props.params;

  const { nickname } = params;

  const decodedNickname = decodeURIComponent(nickname);
  // TODO: 서버사이드 api > 클라이언트사이드 api로 변경하기
  // const result = await getAuthorInfo(nickname);
  // const { author_nickname, num_artworks } = result;
  // 배포 서버에서 실행할 경우
  // if (!process.env.NEXT_PUBLIC_IS_LOCAL) {
  //   const { queryKey, queryFn } = queryOptions.artistArtworks({
  //     nickname: decodedNickname,
  //     sortType: 'latest',
  //     board: null,
  //   });
  //   const query = await getDehydratedInfiniteQuery({
  //     queryKey,
  //     queryFn,
  //     initialPageParam: 1,
  //   });

  //   return (
  //     <div className="mb-8 mt-16 flex w-full flex-col items-center">
  //       <ArtistProfile nickname={decodedNickname} />
  //       <Hydrate state={{ queries: [query] }}>
  //         <Suspense>
  //           <DetailedArtists nickname={decodedNickname} />
  //         </Suspense>
  //       </Hydrate>
  //     </div>
  //   );
  // }
  // 로컬에서 실행할 경우
  return (
    <div className="mb-8 mt-16 flex w-full flex-col items-center">
      <ArtistProfile nickname={decodedNickname} />
      <Suspense>
        <DetailedArtists nickname={decodedNickname} />
      </Suspense>
    </div>
  );
}
