import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { HiSpeakerphone } from 'react-icons/hi';
import { useInView } from 'react-intersection-observer';
import { HashLoader } from 'react-spinners';

import { useRecommendArtwork } from '@/app/artwork/service/client/useArtworkService';
import MasonryView from '@/components/View/MasonryView';

export default function RecommendList({ getAp }: { getAp: () => number }) {
  const params = useParams<{ id: string }>();
  // infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '800px 0px', // 상단에서 800px 떨어진 지점에서 데이터를 불러옵니다. 이 값을 조정하여 원하는 위치에서 데이터를 불러올 수 있습니다.
  });

  const { fetchNextPage, artworks, isError, isFetchingNextPage, isLoading } =
    useRecommendArtwork({
      artworkId: parseInt(params.id),
      ap: getAp(),
    });

  // 무한 스크롤
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return (
      <div className="my-8 flex w-full items-center justify-center">
        <HashLoader color="#01BFA2" />
      </div>
    );
  }

  if (isError || !artworks || artworks.length === 0 || !artworks?.[0]) {
    return <Alert />;
  }

  return (
    <>
      <MasonryView
        artworks={artworks.filter((artwork) => artwork.is_hyum === false)}
        isDeletedVisible={false}
      />
      {isFetchingNextPage ? (
        <div className="my-6 flex w-full items-center justify-center">
          <HashLoader color="#01BFA2" />
        </div>
      ) : (
        // Observer를 위한 div
        <div ref={ref} className="h-20 w-full" />
      )}
    </>
  );
}
const Alert = () => (
  <div
    // datatype="alert"
    className="mx-auto flex w-[90%] flex-col items-center justify-center gap-2 rounded-2xl bg-gray-200 p-4"
  >
    <div className="flex items-center">
      <HiSpeakerphone className="mr-1 size-5 text-green-highlight" />
      <p className="text-lg font-bold text-gray-900"> 알림</p>
    </div>
    <p className="font-semibold text-gray-900">
      최근 게시글의 경우 추천 시스템이 적용되어 있지 않습니다.
    </p>
  </div>
);
