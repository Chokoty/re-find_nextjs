import Image from 'next/image';
import Link from 'next/link';

import SocialStats from '@/components/SocialStats';

type Props = {
  item: SearchItem;
  searchText: string;
  isTitleSearch: boolean;
  isContentSearch: boolean;
  isAuthorSearch: boolean;
};

// danerouslySetInnerHTML을 사용하여 검색어를 하이라이팅할 때, dompurify를 고려하여 sanitized HTML 사용할 것
export default function SearchCard({
  item,
  searchText,
  isTitleSearch,
  isAuthorSearch,
  isContentSearch,
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

  return (
    <div className="flex w-full flex-col-reverse items-center gap-8 overflow-hidden py-4 min-[660px]:flex-row">
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-1 flex-col items-start">
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
            <p>{board}</p>
            <p>·</p>
            <p className="text-blackAlpha-600 dark:text-whiteAlpha-600">
              {date.split(' ')[0]}
            </p>
          </div>
          <p
            className="line-clamp-4 py-1 text-start"
            dangerouslySetInnerHTML={{
              __html: highlightText(
                content.length > 100 ? `${content.slice(0, 250)}...` : content,
                isContentSearch
              ),
            }}
          />
        </div>
        <div className="flex justify-start">
          <SocialStats view={view} like={like} comment={comment} />
        </div>
      </div>
      <Link href={url} prefetch={false} target="_blank">
        <div className="size-full rounded-lg border-base border-blackAlpha-200 dark:border-none min-[660px]:h-[132px] min-[660px]:w-[235px]">
          <Image
            width="400"
            height="190"
            src={img_url}
            alt={title}
            className="aspect-[400/230] rounded-lg bg-[#f5f5f5] object-cover"
            unoptimized
          />
        </div>
      </Link>
    </div>
  );
}
