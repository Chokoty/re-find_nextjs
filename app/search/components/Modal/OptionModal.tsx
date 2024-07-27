'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IoClose } from 'react-icons/io5';

import MainOptions from '@/app/search/components/Option/MainOptions';
import { useSearchFilter } from '@/app/search/hooks/useSearchFilter';
import useModal from '@/hooks/useModal';

export default function OptionModal(props: Record<string, unknown>) {
  const searchModalClose = props.searchModalClose as () => void;
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get('q') ?? '';
  const { hide } = useModal();
  const [state, actions] = useSearchFilter();
  const onClose = useCallback(() => {
    hide();
  }, [hide]);
  const onApply = () => {
    // state를 query string으로 변환
    const params = new URLSearchParams();
    params.append('board', state.board);
    params.append('category', state.category);
    params.append('datetype', state.dateType.type);
    params.append('datetypeDetail', state.dateType.date ?? '');
    params.append('ranktype', state.rankType);
    params.append('sensitive', state.hasSensitiveCase.toString());
    params.append('title', state.hasTitle.toString());
    params.append('content', state.hasContent.toString());
    params.append('author', state.hasAuthor.toString());
    if (state.viewCountLimit.check) {
      params.append('viewCountCheck', state.viewCountLimit.check.toString()); // for api
      params.append('viewCountMin', state.viewCountLimit.min.toString());
      params.append('viewCountMax', state.viewCountLimit.max.toString());
    }
    if (state.likeCountLimit.check) {
      params.append('likeCountCheck', state.viewCountLimit.check.toString()); // for api
      params.append('likeCountMin', state.likeCountLimit.min.toString());
      params.append('likeCountMax', state.likeCountLimit.max.toString());
    }
    if (state.commentCountLimit.check) {
      params.append('commentCountCheck', state.viewCountLimit.check.toString()); // for api
      params.append('commentCountMin', state.commentCountLimit.min.toString());
      params.append('commentCountMax', state.commentCountLimit.max.toString());
    }

    // URL에 query string 추가
    const queryString = params.toString();
    console.log(queryString);
    router.push(`/search?q=${q}&${queryString}`);
    onClose();
    searchModalClose();
  };

  const onInit = () => {
    router.push(`/search?q=${q}&ranktype=latest&sensitive=false`);
    onClose();
    searchModalClose();
  };

  return (
    <section className="relative m-5 rounded-2xl bg-white dark:bg-dark-card md:w-full md:max-w-[760px]">
      <button
        className="absolute right-[10px] top-[10px] flex size-9 items-center justify-center rounded-full transition hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300"
        onClick={onClose}
      >
        <IoClose className="size-8" />
      </button>
      <div className="px-4 pb-5 pt-10 md:px-6">
        <MainOptions options={state} actions={actions} />
        <button
          className="h-[40px] w-full rounded-md bg-green-highlight px-2.5 font-semibold text-gray-900 transition hover:bg-teal-400 active:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-75"
          onClick={onApply}
        >
          필터 적용
        </button>
        <button
          className="mt-2 h-[40px] w-full rounded-md px-2.5 font-semibold text-white transition hover:bg-whiteAlpha-200 active:bg-whiteAlpha-100 disabled:cursor-not-allowed disabled:opacity-75 dark:border-whiteAlpha-300 dark:bg-[#48484B] dark:text-whiteAlpha-800"
          onClick={onInit}
        >
          필터 초기화
        </button>
      </div>
    </section>
  );
}
