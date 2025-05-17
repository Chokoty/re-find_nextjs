import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi2';

import queryOptions1 from '@/app/artists/service/client/queries';
import queryOptions2 from '@/app/myLibrary/service/client/queries';
import {
  useSubscribeArtist,
  useUnsubscribeArtist,
} from '@/app/myLibrary/service/client/useMyService';
import useModal from '@/hooks/useModal';

export default function SubscribeConfirmModal(props: Record<string, unknown>) {
  const isSubscribed = props.isSubscribed as boolean;
  const nickname = props.nickname as string;

  const { queryKey: queryKey1 } = queryOptions1.artistInfo(nickname);
  const { queryKey: queryKey2 } = queryOptions2.subscribedArtists();
  const queryClient = useQueryClient();
  const refreshAlbumArtworks = () => {
    queryClient.invalidateQueries({ queryKey: queryKey1 });
    queryClient.invalidateQueries({ queryKey: queryKey2 });
  };

  const { hide } = useModal();

  const close = () => {
    hide();
  };

  const { mutate: subscribeArtist, isPending: isPendingSubscribe } =
    useSubscribeArtist({
      author: nickname,
      getArtistInfo: () => {
        toast.success('구독이 추가되었습니다.');
        refreshAlbumArtworks();
        close();
      },
    });
  const { mutate: unSubscribeArtist, isPending: isPendingUnsubscribe } =
    useUnsubscribeArtist({
      author: nickname,
      getArtistInfo: () => {
        toast.success('구독이 취소되었습니다.');
        refreshAlbumArtworks();
        close();
      },
    });
  const handleSubscribe = () => {
    if (isSubscribed) {
      unSubscribeArtist();
      return;
    }
    subscribeArtist();
  };

  const isAnyPending = isPendingSubscribe || isPendingUnsubscribe;

  const confirm = () => {
    handleSubscribe();
  };

  // 아이콘 및 색상 조건 분기
  const icon = isSubscribed ? (
    <HiExclamationCircle className="mb-2 text-4xl text-yellow-400" />
  ) : (
    <HiCheckCircle className="mb-2 text-4xl text-green-500" />
  );

  return (
    // <section className="relative m-auto w-[90%] rounded-2xl bg-white dark:bg-dark-card sm:w-full sm:max-w-lg">
    <section className="relative m-auto w-[92%] max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-dark-card">
      {/* 아이콘과 제목 */}
      <div className="flex flex-col items-center">
        {icon}
        <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
          {isSubscribed ? '구독을 취소하시겠어요?' : '구독하시겠어요?'}
        </h2>
        <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-300">
          {isSubscribed
            ? '정말로 이 작가의 구독을 취소하시겠습니까?'
            : '이 작가를 구독하시겠습니까?'}
        </p>
      </div>
      {/* 버튼 영역 */}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={close}
          disabled={isAnyPending}
          className="h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-4 font-semibold text-gray-700 transition hover:bg-gray-200 disabled:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:disabled:bg-gray-800 sm:w-auto"
        >
          닫기
        </button>
        <button
          type="button"
          onClick={confirm}
          disabled={isAnyPending}
          className={`h-10 w-full rounded-md px-4 font-semibold text-white transition sm:w-auto ${
            isSubscribed
              ? 'bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-200 dark:disabled:bg-red-900'
              : 'bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-green-200 dark:disabled:bg-green-900'
          } `}
        >
          {isSubscribed ? '구독 취소' : '구독하기'}
        </button>
      </div>
    </section>
  );
}
