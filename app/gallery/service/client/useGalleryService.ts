import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import queryOptions from '@/app/gallery/service/client/queries';
import type {
  GetIsdNoticeArtworksParams,
  GetKeywordGalleryArtworksParams,
} from '@/types';

// 갤러리에서 왁굳님, 이세돌 분들의 갤러리용 팬아트를 확인할 수 있습니다.(더불어, 비챤님, 릴파님 생일 요청으로도 사용됩니다.)
export function useGalleryArtworks({
  galleryType,
  sortType,
}: GetKeywordGalleryArtworksParams) {
  // return useQuery(queryOptions.galleryArtworks({ query, sortType, page }));

  const {
    data,
    status,
    fetchNextPage, // 다음 페이지를 호출하는 함수
    isFetchingNextPage, // 다음 페이지를 호출 중인지 = isLoading과 같은 개념
    // hasNextPage, // 다음 페이지를 가지고 있는지(마지막 페이지인지 판단 t/f)
  } = useInfiniteQuery(queryOptions.galleryArtworks({ galleryType, sortType }));
  // 뉴뉴릴파 갤러리 내 릴단콘 관련 게시글 중 아이네님 사진이 존재하므로 필터
  const artworks = useMemo(() => {
    return data?.pages.flatMap((page) =>
      page.list.filter((each) => !each.title.includes('🔞'))
    );
  }, [data]);

  const total = data?.pages[0].total;

  return {
    total,
    status,
    artworks,
    fetchNextPage,
    isFetchingNextPage,
  };
}

// export function useNoticeArtworks({
//   member,
//   ranktype,
// }: GetIsdNoticeArtworksParams) {
//   const { data, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery(
//     queryOptions.isdNoticeArtworks({ member, ranktype })
//   );

//   const artworks = useMemo(() => {
//     return data?.pages.flatMap((page) => page.list);
//   }, [data]);

//   const total = data?.pages[0].total;

//   return {
//     total,
//     status,
//     artworks,
//     fetchNextPage,
//     isFetchingNextPage,
//   };
// }

// export function useArtworkDetail(artworkId: number) {
//   return useQuery(queryOptions.artworkDetail(artworkId));
// }

// export function useArtworks({
//   isIsdPick,
//   selected,
//   sortType,
// }: {
//   isIsdPick: boolean;
//   endpoint: string;
//   sortType: string;
//   selected: string;
// }) {
//   let artworkHook;
//   // TODO: api 통합해달라고 요청하기
//   if (isIsdPick) {
//     const isdPickParams = { member: selected, ranktype: sortType };
//     artworkHook = useNoticeArtworks(isdPickParams);
//   } else {
//     const galleryParams = { galleryType, sortType };
//     artworkHook = useGalleryArtworks(galleryParams);
//   }

//   return artworkHook;
// }
