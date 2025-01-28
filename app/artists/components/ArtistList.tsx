'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PuffLoader } from 'react-spinners';
import { useShallow } from 'zustand/react/shallow';

import ArtistCard from '@/app/artists/components/Card/ArtistCard';
import {
  convertBoardParams,
  convertRankTypeParams,
} from '@/app/artists/lib/convertParams';
import { useArtistList } from '@/app/artists/service/client/useArtistService';
import { useArtistSearchInfoStore } from '@/app/artists/store/artistSearchInfoStore';
import Alert from '@/components/Alert';
import { NotSearch } from '@/lib/images';

// TODO: 3번 렌더링되는 문제 해결 필요
export default function ArtistList() {
  const {
    setTotal,
    debounceVal: q,
    rankCriteria,
    totalCountCriteria,
  } = useArtistSearchInfoStore(
    useShallow((state) => ({
      debounceVal: state.debounceValue,
      setTotal: state.setTotal,
      rankCriteria: state.rankCriteria,
      totalCountCriteria: state.totalCountCriteria,
    }))
  );
  const {
    fetchNextPage,
    total,
    artists,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useArtistList({
    q,
    board: rankCriteria ? convertBoardParams(rankCriteria) : null,
    ranktype: convertRankTypeParams(totalCountCriteria),
  });

  const { ref, inView } = useInView({
    threshold: 0,
    // 상단에서 1200px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
    rootMargin: '1200px 0px',
  });

  useEffect(() => {
    setTotal(total);
  }, [total]);

  // 무한 스크롤
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Alert />;
  }

  if (!artists || artists.length === 0 || (total ?? 0) === 0) {
    return (
      <div className="flex size-full flex-col items-center justify-center py-8">
        <Image
          src={NotSearch}
          alt="찾을 수 없음을 표시"
          width={202}
          height={172}
          priority
          unoptimized
        />
        <h3 className="my-6 text-center">
          검색 결과가 없습니다. <br /> 다른 닉네임으로 검색해 보세요.
        </h3>
      </div>
    );
  }

  return (
    <div className=" w-full rounded-xl px-6 pt-6 shadow-[rgba(0,_0,_0,_0.1)_-3px_4px_14px_0px] dark:bg-dark-card-2">
      {artists.map((artist, index) => {
        return (
          !artist.nick.includes('탈퇴회원') && (
            <ArtistCard
              artist={artist}
              nth={index + 1}
              inputText={q}
              rankCriteria={rankCriteria}
              totalCountCriteria={totalCountCriteria}
              key={`${artist.nick}-${index}`}
            />
          )
        );
      })}
      {isFetchingNextPage ? (
        <Loading />
      ) : (
        // Observer를 위한 div
        <div ref={ref} className="h-20 w-full" />
      )}
    </div>
  );
}

const Loading = () => (
  <div className="flex size-full min-h-[370px] items-center justify-center">
    <PuffLoader color="#01BFA2" />
  </div>
);
