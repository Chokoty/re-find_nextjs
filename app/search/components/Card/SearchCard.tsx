import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ROWS_PER_PAGE } from '@/app/search/service/client/SearchService';
import SocialStats from '@/components/SocialStats';

type Props = {
  item: SearchItem;
  searchText: string;
  isTitleSearch: boolean;
  isContentSearch: boolean;
  isAuthorSearch: boolean;
  index: number;
};

// danerouslySetInnerHTML을 사용하여 검색어를 하이라이팅할 때, dompurify를 고려하여 sanitized HTML 사용할 것
export default function SearchCard({
  item,
  searchText,
  isTitleSearch,
  isAuthorSearch,
  isContentSearch,
  index,
}: Props) {
  const {
    title,
    content,
    img_url,
    like,
    view,
    comment,
    date,
    author,
    board,
    url,
  } = item;
  const isAllHightlight =
    (isTitleSearch && isAuthorSearch && isContentSearch) ||
    (!isTitleSearch && !isAuthorSearch && !isContentSearch);
  const [isVisible, setIsVisible] = useState(false);

  const highlightText = (text: string, ableHightlight: boolean) => {
    const regex = new RegExp(searchText, 'gi');
    if (!text) return '알 수 없음';
    if (isAllHightlight || ableHightlight) {
      return text.replace(
        regex,
        (match) => `<span style="color: #01BFA2">${match}</span>`
      );
    }
    // 모든 경우가 아니면 그냥 반환
    return text;
  };

  useEffect(() => {
    // setTimeout(() => {
    //   setIsVisible(true);
    // }, 50);
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const th = index % ROWS_PER_PAGE;
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

  return (
    <div
      className={`relative mb-6 flex w-full flex-col-reverse items-center gap-6 overflow-hidden border-b-base border-gray-300 pb-6 transition-all duration-300 dark:border-whiteAlpha-300 min-[660px]:flex-row min-[660px]:items-start ${animateClassName}`}
    >
      <div className="flex w-full flex-col">
        <div className="mb-2 flex flex-1 flex-col items-start">
          <Link href={url} prefetch={false} target="_blank">
            <p
              className="text-start text-lg hover:text-blackAlpha-600 dark:hover:text-whiteAlpha-600"
              dangerouslySetInnerHTML={{
                __html: highlightText(title, isTitleSearch),
              }}
            />
          </Link>
          <div className="mt-1 flex items-center gap-1 text-sm text-blackAlpha-800 dark:text-whiteAlpha-800 min-[698px]:text-base">
            <Link href={`/artists/${author}`} prefetch={false} target="_blank">
              <p
                className="hover:text-blackAlpha-600 dark:hover:text-whiteAlpha-600"
                dangerouslySetInnerHTML={{
                  __html: highlightText(author, isAuthorSearch),
                }}
              />
            </Link>
            <p>·</p>
            <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
              {board.replace(/&#\d+;/g, '').trim()}
            </p>
            <p>·</p>
            <p className="text-blackAlpha-700 dark:text-whiteAlpha-700">
              {date.split(' ')[0]}
            </p>
          </div>
          <Link href={url} prefetch={false} target="_blank">
            <p
              className="line-clamp-3 break-all py-1 text-start"
              dangerouslySetInnerHTML={{
                __html: highlightText(
                  content.length > 100
                    ? `${content.slice(0, 250)}...`
                    : content,
                  isContentSearch
                ),
              }}
            />
          </Link>
        </div>
        <div className="flex justify-start">
          <SocialStats view={view} like={like} comment={comment} />
        </div>
      </div>
      <Link href={url} prefetch={false} target="_blank">
        <div className="w-full overflow-hidden rounded-lg border-base border-blackAlpha-200 dark:border-none min-[660px]:h-[162px] min-[660px]:w-[200px]">
          <Image
            width="400"
            height="230"
            src={img_url}
            alt={title}
            className="aspect-[400/230] rounded-lg bg-[#f5f5f5] object-cover transition hover:scale-110 min-[660px]:aspect-[200/162]"
            priority
            unoptimized
          />
        </div>
      </Link>
    </div>
  );
}
