import toast from 'react-hot-toast';

import myService from '@/app/myLibrary/service/client/myService';
import type { DeleteArtworkParams } from '@/types';

const queryKeys = {
  updateLikedArticles: () => ['updateLikedArticles'] as const,
  subscribedArtists: () => ['subscribedArtists'] as const,
  // counts: ['counts'] as const,
  // updates: ['updates'] as const,
};

const queryOptions = {
  createCustomAlbum: (
    items: number[],
    handleOnSuccess: (albumId: string) => void
  ) => ({
    mutationFn: () => myService.postCustomAlbum(items),
    onSuccess: (data: CustomAlbumAddResponse) => {
      handleOnSuccess(data.album);
    },
  }),
  editCustomAlbuminfo: (albumId: string, info: CustomAlbumEditParams) => ({
    mutationFn: () => myService.putCustomAlbum(albumId, info),
  }),
  addFanartsInToCustomAlbum: (albumId: string, items: number[]) => ({
    mutationFn: () => myService.putFanartsInToCustomAlbum(albumId, items),
  }),
  deleteCustomAlbum: ({
    albumId,
    artworksIdList,
    isDeleteAlbum = false,
  }: DeleteArtworkParams) => ({
    mutationFn: () =>
      myService.deleteCustomAlbum({ albumId, artworksIdList, isDeleteAlbum }),
  }),
  updateLikedArticles: () => ({
    queryKey: queryKeys.updateLikedArticles(),
    queryFn: () => myService.updateLikedArticles(),
    enabled: false,
  }),
  subscribeArtist: (author: string) => ({
    mutationFn: () => myService.subscribeArtist(author),
    onSuccess: (data: ArtistSubscribeResponse) => {
      console.log(data);
      toast.success('구독이 추가되었습니다.');
    },
    onError: (data: ArtistSubscribeResponse) => {
      console.log(data);
      toast.error('구독 기능 준비 중입니다.');
    },
  }),
  unsubscribeArtist: (author: string) => ({
    mutationFn: () => myService.unsubscribeArtist(author),
    onSuccess: (data: ArtistSubscribeResponse) => {
      console.log(data);
      toast.success(`${author} 작가님 구독을 취소했습니다.`);
    },
    onError: (data: ArtistSubscribeResponse) => {
      console.log(data);
      toast.error('구독 기능 준비 중입니다.');
    },
  }),
  subscribedArtists: () => ({
    queryKey: queryKeys.subscribedArtists(),
    queryFn: () => myService.subscribedArtists(),
  }),
  // counts: () => ({
  //   queryKey: queryKeys.counts,
  //   queryFn: () => myService.getCounts(),
  // }),
  // updates: () => ({
  //   queryKey: queryKeys.updates,
  //   queryFn: () => myService.getRecentUpdates(),
  // }),
};

export default queryOptions;
