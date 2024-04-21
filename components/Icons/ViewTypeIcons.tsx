import clsx from 'clsx';

import Button, { type CustomVariantProps } from '@/components/Button';
import { VIEW_TYPES } from '@/constants/artists';

type Props = {
  selectedView: string | null;
  artist: AuthorCommon;
  component: string;
  onSelectViewType: ((viewType: string) => void) | null;
};

export default function ViewTypeIcons({
  selectedView,
  artist,
  component,
  onSelectViewType,
}: Props) {
  if (!artist) {
    // artist가 null인 경우 예외 처리
    return null;
  }
  // 모든 viewType이 0인지 확인
  const isAllZero = VIEW_TYPES.every(
    (viewType) => artist[viewType.value] === 0
  );

  return (
    <div
      className={clsx(
        'flex w-auto flex-row flex-wrap justify-center gap-2',
        component === 'inIndex'
          ? 'justify-center md:justify-end'
          : 'justify-center'
      )}
    >
      {isAllZero ? (
        <p className="text-base text-gray-500">정보 없음</p>
      ) : (
        VIEW_TYPES.map(
          (viewType, index) =>
            artist[viewType.value] !== 0 && (
              <Button
                key={index}
                intent={
                  (selectedView === null || selectedView !== viewType.value
                    ? `outline-${viewType.colorScheme}`
                    : `solid-${viewType.colorScheme}`) as CustomVariantProps['intent']
                }
                onClick={() => {
                  if (!onSelectViewType) return;
                  onSelectViewType(viewType.value);
                }}
                // size="lg"
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
