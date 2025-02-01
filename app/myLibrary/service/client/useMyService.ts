import { useMutation, useQuery } from '@tanstack/react-query';

import queryOptions from '@/app/myLibrary/service/client/queries';
import type { DeleteArtworkParams } from '@/types';

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

export function useSubscribeArtist(author: string) {
  return useMutation(queryOptions.subscribeArtist(author));
}
export function useUnsubscribeArtist(author: string) {
  return useMutation(queryOptions.unsubscribeArtist(author));
}

export function useSubscribedArtists() {
  return useQuery(queryOptions.subscribedArtists());
}
