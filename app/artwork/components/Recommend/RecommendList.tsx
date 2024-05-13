import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { HashLoader } from 'react-spinners';

import { useRecommendArtwork } from '@/app/artwork/service/client/useArtworkService';
import Alert from '@/components/Alert';
import MasonryView from '@/components/View/MasonryView';
import { useResponsive } from '@/hooks/useResponsive';

export default function RecommendList({ getAp }: { getAp: () => number }) {
  // infinite scroll을 위한 옵저버
  const isMobile = useResponsive();
  const option = isMobile ? { rootMargin: '1000px 0px' } : undefined;
  const { ref, inView } = useInView(option);

  const params = useParams<{ id: string }>();
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
