import toast from 'react-hot-toast';

import myService from '@/app/myLibrary/service/client/myService';
import { extractRefindAppError } from '@/lib/error-utils';
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
    handleOnError,
  }: {
    albumId: string;
    info: CustomAlbumEditParams;
    handleOnSuccess: () => void;
    handleOnError: () => void;
  }) => ({
    mutationFn: () => myService.putCustomAlbum(albumId, info),
    onSuccess: () => {
      handleOnSuccess();
    },
    onError: (error: unknown) => {
      const normalizedError = extractRefindAppError(error);
      if (normalizedError.statusCode === 401) {
        handleOnError();
      }
    },
  }),
  addFanartsInToCustomAlbum: ({
    albumId,
    items,
    handleOnSuccess,
    handleOnError,
  }: {
    albumId: string;
    items: number[];
    handleOnSuccess: () => void;
    handleOnError: () => void;
  }) => ({
    mutationFn: () => myService.putFanartsInToCustomAlbum(albumId, items),
    onSuccess: (data: any) => {
      console.log('putFanartsInToCustomAlbum', data);
      handleOnSuccess();
    },
    onError: (error: unknown) => {
      const normalizedError = extractRefindAppError(error);
      if (normalizedError.statusCode === 401) {
        handleOnError();
      }
    },
  }),
  deleteCustomAlbum: ({
    albumId,
    artworksIdList,
    isDeleteAlbum = false,
    handleOnSuccess,
    handleOnError,
  }: DeleteArtworkParams) => ({
    mutationFn: () =>
      myService.deleteCustomAlbum({ albumId, artworksIdList, isDeleteAlbum }),
    onSuccess: () => {
      handleOnSuccess?.();
      if (isDeleteAlbum) {
        toast.success('앨범이 삭제되었습니다.');
      } else {
        toast.success(`${artworksIdList.length}개 항목이 삭제되었습니다`);
      }
    },
    onError: (error: unknown) => {
      const normalizedError = extractRefindAppError(error);
      if (normalizedError.statusCode === 401) {
        handleOnError?.();
      }
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
    handleOnError,
  }: {
    author: string;
    getArtistInfo: () => void;
    handleOnError: () => void;
  }) => ({
    mutationFn: () => myService.subscribeArtist(author),
    onSuccess: (data: ArtistSubscribeResponse) => {
      console.log(data);
      // toast.success('구독이 추가되었습니다.');
      getArtistInfo();
    },
    onError: (error: unknown) => {
      const normalizedError = extractRefindAppError(error);
      if (normalizedError.statusCode === 401) {
        handleOnError();
      }
    },
  }),
  unsubscribeArtist: ({
    author,
    getArtistInfo,
    handleOnError,
  }: {
    author: string;
    getArtistInfo: () => void;
    handleOnError: () => void;
  }) => ({
    mutationFn: () => myService.unsubscribeArtist(author),
    onSuccess: (data: ArtistSubscribeResponse) => {
      console.log(data);
      // toast.success(`${author} 작가님 구독을 취소했습니다.`);
      getArtistInfo();
    },
    onError: (error: unknown) => {
      const normalizedError = extractRefindAppError(error);
      if (normalizedError.statusCode === 401) {
        handleOnError();
      }
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
