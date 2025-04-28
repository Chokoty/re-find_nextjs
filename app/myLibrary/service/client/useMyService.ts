import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import queryOptions from '@/app/myLibrary/service/client/queries';
import type { DeleteArtworkParams } from '@/types';

export type RefetchFn = (
  options?: RefetchOptions
) => Promise<QueryObserverResult<AuthorOverview, Error>>;

// export function useImageInfo({ hash }: { hash: string }) {
//   return useQuery(queryOptions.imageInfo(hash));
// }

// export function useCounts() {
//   return useQuery(queryOptions.counts());
// }

// export function useRecentUpdates() {
//   return useQuery(queryOptions.updates());
// }

export function useCreateCustomAlbum(
  items: number[],
  handleOnSuccess: (albumId: string) => void
) {
  return useMutation(queryOptions.createCustomAlbum(items, handleOnSuccess));
}

export function useEditCustomAlbum(
  albumId: string,
  info: CustomAlbumEditParams
) {
  return useMutation(queryOptions.editCustomAlbuminfo(albumId, info));
}

export function useDeleteCustomAlbum({
  albumId,
  artworksIdList,
  isDeleteAlbum = false,
}: DeleteArtworkParams) {
  return useMutation(
    queryOptions.deleteCustomAlbum({ albumId, artworksIdList, isDeleteAlbum })
  );
}

export function useUpdateLikedArticles() {
  return useQuery(queryOptions.updateLikedArticles());
}

export function useSubscribeArtist({
  author,
  getArtistInfo,
}: {
  author: string;
  getArtistInfo: RefetchFn;
}) {
  return useMutation(queryOptions.subscribeArtist({ author, getArtistInfo }));
}
export function useUnsubscribeArtist({
  author,
  getArtistInfo,
}: {
  author: string;
  getArtistInfo: RefetchFn;
}) {
  return useMutation(queryOptions.unsubscribeArtist({ author, getArtistInfo }));
}

export function useSubscribedArtists() {
  return useQuery(queryOptions.subscribedArtists());
}

export function ussAddFanartsInToCustomAlbum({
  albumId,
  items,
  handleOnSuccess,
}: {
  albumId: string;
  items: number[];
  handleOnSuccess: () => void;
}) {
  return useMutation(
    queryOptions.addFanartsInToCustomAlbum({ albumId, items, handleOnSuccess })
  );
}
