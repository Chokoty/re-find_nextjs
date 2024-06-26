'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useShallow } from 'zustand/react/shallow';

import SearchCard from '@/app/search/components/Card/SearchCard';
import { useSearchResults } from '@/app/search/service/client/useSearchService';
import { useSearchFilterStore } from '@/app/search/store/searchFilerStore';
import Alert from '@/components/Alert';
import { NotSearch } from '@/lib/images';

// 검색시 3번 렌더링되는거 최적화하기(옵션 상태때문)
export default function SearchResult() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '1000px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const {
    board,
    category,
    dateType,
    rankType,
    hasSensitiveCase,
    hasTitle,
    hasContent,
    hasAuthor,
    viewCountLimit,
    likeCountLimit,
    commentCountLimit,
    setIsFetching,
  } = useSearchFilterStore(
    useShallow((state) => ({
      board: state.board,
      category: state.category,
      dateType: state.dateType,
      rankType: state.rankType,
      hasSensitiveCase: state.hasSensitiveCase,
      hasTitle: state.hasTitle,
      hasContent: state.hasContent,
      hasAuthor: state.hasAuthor,
      viewCountLimit: state.viewCountLimit,
      likeCountLimit: state.likeCountLimit,
      commentCountLimit: state.commentCountLimit,
      setIsFetching: state.setIsFetching,
    }))
  );

  const {
    fetchNextPage,
    total,
    searchResults,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useSearchResults({
    q,
    board,
    category,
    dateType,
    rankType,
    sensitive: hasSensitiveCase,
    title: hasTitle,
    content: hasContent,
    author: hasAuthor,
    viewCountLimit,
    likeCountLimit,
    commentCountLimit,
  });

  // 무한 스크롤
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    const isFetching = isFetchingNextPage || isLoading;
    setIsFetching(isFetching);
  }, [isFetchingNextPage, isLoading]);

  if (isLoading) {
    return (
      <div className="my-6 flex min-h-[300px] w-full items-center justify-center rounded-2xl md:min-h-[450px]" />
    );
  }

  if (isError) {
    return <Alert />;
  }
  if (!searchResults || searchResults.length === 0 || (total ?? 0) === 0) {
    return (
      <div className="flex min-h-[300px] w-full flex-col items-center justify-center md:min-h-[450px]">
        <Image
          src={NotSearch}
          alt="찾을 수 없음을 표시"
          width={202}
          height={172}
          priority
          unoptimized
        />
        <h3 className="my-6 text-center">
          검색 결과가 없습니다. <br /> 다른 키워드로 검색해 보세요
        </h3>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-wrap items-baseline gap-2 p-4">
        <h4 className="text-xl font-bold">{`${
          q.length === 0 ? '전체검색' : `'${q}'`
        }`}</h4>
        <h4 className="text-xl font-bold">에 대한 검색결과 입니다.</h4>
        <div className="flex items-center gap-1">
          <p className="text-blackAlpha-500 dark:text-whiteAlpha-500">총</p>
          <p className="text-[#01BFA2]">
            <CountUp end={total ?? 0} duration={2} />
          </p>
          <p className="text-blackAlpha-500 dark:text-whiteAlpha-500">
            개의 팬아트가 검색되었습니다.
          </p>
        </div>
      </div>
      {/* TODO: tab components 만들기 */}
      <div className="relative w-full">
        <div className="flex justify-start border-b-2 border-[#01BFA2]">
          {/* 각 탭리스트 */}
          <button className="px-6 py-2 text-[#01BFA2]">
            전체({total ?? 0})
          </button>
        </div>
        <div className="mt-6 w-full px-6">
          {/* 각 패널 */}
          {searchResults.map((item, index) => (
            <SearchCard
              index={index}
              item={item}
              searchText={q}
              isTitleSearch={hasTitle}
              isContentSearch={hasContent}
              isAuthorSearch={hasAuthor}
              key={item.id}
            />
          ))}
          {/* Observer를 위한 Element */}
          <div className="h-20 w-full" ref={ref} />
        </div>
      </div>
    </div>
  );
}
