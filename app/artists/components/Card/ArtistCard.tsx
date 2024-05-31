import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ROWS_PER_PAGE } from '@/app/artists/service/client/ArtistService';
import SortTypeIcons from '@/components/Icons/SortTypeIcons';
import ViewTypeIcons from '@/components/Icons/ViewTypeIcons';
import { useResponsive } from '@/hooks/useResponsive';
import type { SortRankCriteria, SortTotalCriteria } from '@/types';

type Props = {
  artist: AuthorInfo;
  nth: number;
  inputText: string;
  rankCriteria: SortRankCriteria | null;
  totalCountCriteria: SortTotalCriteria;
};

export default function ArtistCard({
  artist,
  nth,
  inputText,
  rankCriteria,
  totalCountCriteria,
}: Props) {
  const { nick, prof_url } = artist;
  const isMobile = useResponsive();
  const [isVisible, setIsVisible] = useState(false);
  const highlightText = (text: string) => {
    const regex = new RegExp(inputText, 'gi');

    return text.replace(
      regex,
      (match) => `<span style="color: #01BFA2">${match}</span>`
    );
  };

  useEffect(() => {
    // setTimeout(() => {
    //   setIsVisible(true);
    // }, 50);
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const th = (nth - 1) % ROWS_PER_PAGE;
  /**
   * Tailwind CSS 컴파일러가 제대로 작동하려면 attributes를 일반 텍스트로 사용할 수 있어야 합니다.
   * 예시) ``delay-[${index * 100}ms]`` 와 같은 밀리초 단위의 변수는 사용할 수 없습니다.
   * */
  const delayArr = Array.from(
    { length: ROWS_PER_PAGE },
    (_, i) => `delay-[${i * 100}ms]`
  );

  const animateClassName = isVisible
    ? `translate-y-0 opacity-100 ${delayArr[th]}`
    : 'translate-y-4 opacity-0';

  const highlightedText = highlightText(artist.nick);

  return (
    <Link
      href={`/artists/${nick}`}
      prefetch={false}
      className={`relative mb-4 flex w-full items-center justify-center border-b-base border-gray-300 pb-4 transition-all duration-300 dark:border-whiteAlpha-300 ${animateClassName}`}
    >
      <div className="flex size-full min-h-[250px] flex-col items-center justify-center gap-4 rounded-2xl p-4 transition hover:bg-gray-200 dark:hover:bg-black-200 2xs:min-h-[150px] md:min-h-[168px] md:flex-row md:justify-between 2md:py-0">
        <div className="flex flex-col items-center gap-4 2xs:flex-row">
          <p className="text-lg font-bold">{nth <= 100 ? nth : '-'}</p>
          <div className="size-20 md:size-24">
            <Image
              // fill
              // sizes="(min-width: 767px) 66px, 100px"
              className="size-20 rounded-full object-cover md:size-24"
              width={100}
              height={100}
              src={prof_url}
              alt={nick}
              priority
              unoptimized
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <p
              className="text-lg font-bold"
              dangerouslySetInnerHTML={{
                __html: highlightedText,
              }}
            />
            {!isMobile && (
              <SortTypeIcons
                artist={artist}
                totalCountCriteria={totalCountCriteria}
              />
            )}
          </div>
        </div>
        <div className="flex w-auto flex-col items-center justify-between gap-4 md:w-[169px] min-[830px]:w-[227px] 2md:w-auto">
          {isMobile && (
            <SortTypeIcons
              artist={artist}
              totalCountCriteria={totalCountCriteria}
            />
          )}
          <ViewTypeIcons artist={artist} rankCriteria={rankCriteria} />
        </div>
      </div>
    </Link>
  );
}
