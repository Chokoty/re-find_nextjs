'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { HashLoader } from 'react-spinners';
import { useShallow } from 'zustand/react/shallow';

import SearchCard from '@/app/search/components/Card/SearchCard';
import { useSearchResults } from '@/app/search/service/client/useSearchService';
import { useSearchFilterStore } from '@/app/search/store/searchFilerStore';
import Alert from '@/components/Alert';
import MasonryView from '@/components/View/MasonryView';
import { NotSearch } from '@/lib/images';

// 검색시 3번 렌더링되는거 최적화하기(옵션 상태때문)
export default function SearchResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultLimit = {
    check: false,
    min: 0,
    max: 100,
  };
  const q = searchParams.get('q') ?? '';
  const board = searchParams.get('board') ?? 'all';
  const rankType = searchParams.get('ranktype') ?? 'latest';
  const sensitiveParam = searchParams.get('sensitive');
  const hasSensitiveCase =
    sensitiveParam === null ? false : sensitiveParam === 'true';
  const category = searchParams.get('category') ?? 'all';
  const dateType = searchParams.get('datetype')
    ? {
        type: searchParams.get('datetype') ?? 'all',
        data: searchParams.get('datetypeDetail')!,
      }
    : { type: 'all' };
  const titleParam = searchParams.get('title');
  const contentParam = searchParams.get('content');
  const authorParam = searchParams.get('author');
  const hasTitle = titleParam === null ? false : titleParam === 'true';
  const hasContent = contentParam === null ? false : contentParam === 'true';
  const hasAuthor = authorParam === null ? false : authorParam === 'true';
  const viewCountCheckParam = searchParams.get('viewCountCheck');
  const likeCountCheckParam = searchParams.get('likeCountCheck');
  const commentCountCheckParam = searchParams.get('commentCountCheck');

  const viewCountCheck =
    viewCountCheckParam === null ? false : viewCountCheckParam === 'true';
  const likeCountCheck =
    likeCountCheckParam === null ? false : likeCountCheckParam === 'true';
  const commentCountCheck =
    commentCountCheckParam === null ? false : commentCountCheckParam === 'true';
  const viewCountLimit = viewCountCheck
    ? {
        check: viewCountCheck,
        min: parseInt(searchParams.get('viewCountMin')!),
        max: parseInt(searchParams.get('viewCountMax')!),
      }
    : defaultLimit;
  const likeCountLimit = likeCountCheck
    ? {
        check: likeCountCheck,
        min: parseInt(searchParams.get('likeCountMin')!),
        max: parseInt(searchParams.get('likeCountMax')!),
      }
    : defaultLimit;
  const commentCountLimit = commentCountCheck
    ? {
        check: commentCountCheck,
        min: parseInt(searchParams.get('commentCountMin')!),
        max: parseInt(searchParams.get('commentCountMax')!),
      }
    : defaultLimit;

  const viewType = searchParams.get('viewType') ?? 'list';

  const buildQueryString = (obj: any) => {
    const queryString = Object.keys(obj)
      .filter(
        (key) => obj[key] !== '' && obj[key] !== undefined && obj[key] !== null
      )
      .map(
        (key: string) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      )
      .join('&');

    return queryString;
  };

  const changeView = () => {
    const allSearchParams: { [anyProp: string]: string } = {};

    searchParams.forEach((value, key) => {
      allSearchParams[key] = value;
    });
    allSearchParams.viewType = viewType === 'list' ? 'gallery' : 'list';
    router.push(`/search?${buildQueryString(allSearchParams)}`);
  };

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '1000px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });
  const { setIsFetching } = useSearchFilterStore(
    useShallow((state) => ({ setIsFetching: state.setIsFetching }))
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

  if (viewType === 'list') {
    return (
      <div className="mx-auto w-full max-w-screen-lg rounded-lg bg-white shadow-cardBox dark:bg-dark-card md:rounded-2xl">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mt-4 flex w-full flex-wrap items-baseline gap-2 p-4">
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
            <div className="flex justify-between border-b-2 border-[#01BFA2]">
              {/* 각 탭리스트 */}
              <button className="px-6 py-2 text-[#01BFA2]">
                전체({total ?? 0})
              </button>
              <button
                className="mb-1 mr-3 flex w-auto items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-center text-base font-medium text-gray-900 transition hover:bg-blackAlpha-100 active:bg-blackAlpha-200 dark:text-gray-50 dark:hover:bg-whiteAlpha-100 dark:active:bg-whiteAlpha-300"
                onClick={changeView}
              >
                갤러리 뷰 보기
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
      </div>
    );
  }

  // 갤러리 뷰
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between">
        <div className="mb-6 mt-4 flex items-center gap-1">
          <p className="text-blackAlpha-500 dark:text-whiteAlpha-500">총</p>
          <p className="text-[#01BFA2]">
            <CountUp end={total ?? 0} duration={2} />
          </p>
          <p className="text-blackAlpha-500 dark:text-whiteAlpha-500">
            개
            <span className="hidden 2xs:inline-block">
              의 팬아트가 검색되었습니다.
            </span>
          </p>
        </div>
        <button
          className="mb-1 mr-3 flex w-auto items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-center text-base font-medium text-gray-900 transition hover:bg-blackAlpha-100 active:bg-blackAlpha-200 dark:text-gray-50 dark:hover:bg-whiteAlpha-100 dark:active:bg-whiteAlpha-300"
          onClick={changeView}
        >
          리스트 뷰 보기
        </button>
      </div>

      <MasonryView artworks={searchResults} isDeletedVisible={false} />
      {isFetchingNextPage ? (
        <div className="my-6 flex w-full items-center justify-center">
          <HashLoader color="#01BFA2" />
        </div>
      ) : (
        // Observer를 위한 div
        <div ref={ref} className="h-20 w-full" />
      )}
    </div>
  );
}
