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
  editCustomAlbuminfo: ({
    albumId,
    info,
    handleOnSuccess,
  }: {
    albumId: string;
    info: CustomAlbumEditParams;
    handleOnSuccess: () => void;
  }) => ({
    mutationFn: () => myService.putCustomAlbum(albumId, info),
    onSuccess: () => {
      handleOnSuccess();
    },
  }),
  addFanartsInToCustomAlbum: ({
    albumId,
    items,
    handleOnSuccess,
  }: {
    albumId: string;
    items: number[];
    handleOnSuccess: () => void;
  }) => ({
    mutationFn: () => myService.putFanartsInToCustomAlbum(albumId, items),
    onSuccess: (data: any) => {
      console.log('putFanartsInToCustomAlbum', data);
      handleOnSuccess();
    },
  }),
  deleteCustomAlbum: ({
    albumId,
    artworksIdList,
    isDeleteAlbum = false,
    handleOnSuccess,
  }: DeleteArtworkParams) => ({
    mutationFn: () =>
      myService.deleteCustomAlbum({ albumId, artworksIdList, isDeleteAlbum }),
    onSuccess: () => {
      handleOnSuccess?.();
    },
  }),
  updateLikedArticles: () => ({
    queryKey: queryKeys.updateLikedArticles(),
    queryFn: () => myService.updateLikedArticles(),
    enabled: false,
  }),
  subscribeArtist: ({
    author,
    getArtistInfo,
  }: {
    author: string;
    getArtistInfo: () => void;
  }) => ({
    mutationFn: () => myService.subscribeArtist(author),
    onSuccess: (data: ArtistSubscribeResponse) => {
      console.log(data);
      // toast.success('구독이 추가되었습니다.');
      getArtistInfo();
    },
    onError: (data: ArtistSubscribeResponse) => {
      console.log(data);
      toast.error('구독 기능 준비 중입니다.');
    },
  }),
  unsubscribeArtist: ({
    author,
    getArtistInfo,
  }: {
    author: string;
    getArtistInfo: () => void;
  }) => ({
    mutationFn: () => myService.unsubscribeArtist(author),
    onSuccess: (data: ArtistSubscribeResponse) => {
      console.log(data);
      // toast.success(`${author} 작가님 구독을 취소했습니다.`);
      getArtistInfo();
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
