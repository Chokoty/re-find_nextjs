import Button, { type CustomVariantProps } from '@/components/Button';
import { VIEW_TYPES } from '@/constants/artists';
import type { SortRankCriteria } from '@/types';

type Props = {
  artist: AuthorCommon;
  rankCriteria?: SortRankCriteria | null;
  sortRankCriteria?: (value: SortRankCriteria) => void;
};

// 베스트, 금손 작가, 우왁굳, 고멤/교멤, 이세돌 게시판에 대한 작가의 작품 개수를 보여주는 컴포넌트
export default function ViewTypeIcons({
  artist,
  rankCriteria,
  sortRankCriteria,
}: Props) {
  // 모든 viewType이 0인지 확인
  const isAllZero = VIEW_TYPES.every(
    (viewType) => artist[viewType.value] === 0
  );

  return (
    <div className="flex w-auto flex-row flex-wrap justify-center gap-2">
      {isAllZero ? (
        <p className="text-base text-gray-500">정보 없음</p>
      ) : (
        VIEW_TYPES.map(
          (viewType, index) =>
            artist[viewType.value] !== 0 && (
              <Button
                key={index}
                intent={
                  (!rankCriteria || rankCriteria !== viewType.value
                    ? `outline-${viewType.colorScheme}`
                    : `solid-${viewType.colorScheme}`) as CustomVariantProps['intent']
                }
                onClick={() => {
                  sortRankCriteria?.(viewType.value);
                }}
                additionalClass="flex h-8 flex-row gap-2 md:h-12 md:flex-col md:gap-0 ps-3 pe-3"
              >
                <p className="text-sm">{viewType.name}</p>
                <p className="text-base"> {artist[viewType.value]}</p>
              </Button>
            )
        )
      )}
    </div>
  );
}
