import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { FaCheck, FaEye, FaThumbsUp } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FiClock } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { useDeleteModeStore } from '@/app/album/store/deleteModeStore';
import { useSelectModeStore } from '@/app/album/store/selectModeStore';
import { formatNumberToEnglishUnit } from '@/hooks/useFormatNumberToCompactString';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';
import { useUploadTimeDiff } from '@/hooks/useUploadTimeDiff';

type Props = {
  artwork: ArtworkList | AlbumArtworkList;
  isIsdPick?: boolean;
};

export default function MasonryCard({ artwork, isIsdPick = false }: Props) {
  const authorName = 'author' in artwork ? artwork.author : '';
  const pathname = usePathname();
  const isArtistDetails = pathname.startsWith('/artists');
  const article_link = useResponsiveLink('', 'article');
  const postLink = article_link + artwork.id;
  const source = artwork.source?.[0] ?? artwork.id;
  const sourceLink = article_link + source;
  // 이세돌픽 갤러리일 경우 왁물원 링크는 원본 파일 링크이고 그외는 게시글 링크입니다.
  const wakzooLink = isIsdPick ? sourceLink : postLink;
  // 이세돌픽 갤러리는 작가 링크가 올린 게시글이고 그렇지 않다면 리파인드 작가입니다.
  const artistLink = isIsdPick ? postLink : `/artists/${authorName}`;
  const linkTarget = isIsdPick ? '_blank' : '_self';
  const isSelectMode = useSelectModeStore((state) => state.isSelectMode);
  const isDeleteMode = useDeleteModeStore((state) => state.isDeleteMode);

  // CardImage 내부 상태 및 로직
  const [isFocus, setIsFocus] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { fanarts, setFanarts } = useCheckFanartStore((state) => ({
    fanarts: state.fanarts,
    setFanarts: state.setFanarts,
  }));
  const { img_url, img_url_list, title, board, view, like, date, deleted, id } =
    artwork;
  const modifiedUrl300 = useModifiedImageUrl({
    url: img_url_list[0],
    size: 300,
  });
  const uploadTimeDiff = useUploadTimeDiff(date);

  useOnClickOutside(cardRef, () => setIsFocus(false));

  const isCheck = fanarts.includes(id);

  const handleToggleCheck = () => {
    if (!(isSelectMode || isDeleteMode)) return;
    if (isCheck) {
      setFanarts(fanarts.filter((fanartId) => fanartId !== id));
    } else {
      setFanarts([...fanarts, id]);
    }
  };

  return (
    <div className="inline-block w-full">
      {/* CardImage 영역 */}
      <div
        ref={cardRef}
        tabIndex={isSelectMode || isDeleteMode ? 0 : undefined}
        className={clsx(
          'group relative w-full rounded-[16px] border-base border-blackAlpha-200 dark:border-none',
          {
            'cursor-pointer': isSelectMode || isDeleteMode,
          }
        )}
        onClick={isSelectMode || isDeleteMode ? handleToggleCheck : undefined}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      >
        <Image
          width={357}
          height={357}
          style={{ width: '120%', height: 'auto' }}
          src={img_url === '' ? 'https://placehold.co/375x375' : modifiedUrl300}
          alt={title}
          className={clsx(
            'max-h-[536px] rounded-[16px] bg-[#f5f5f5] object-cover',
            {
              'blur-[6px]': deleted,
              'opacity-70': isCheck,
            }
          )}
          unoptimized
        />

        {/* 선택모드 체크 UI */}
        {isSelectMode && !isDeleteMode && (
          <div
            className={clsx(
              'absolute right-2 top-2 flex size-8 items-center justify-center rounded-full border-2 text-green-600 shadow-lg transition-all duration-300',
              {
                'border-green-600 bg-green-500 text-white': isCheck,
                'border-gray-300 bg-white text-gray-400 group-hover:border-green-400 group-hover:text-green-500':
                  !isCheck,
              }
            )}
            style={{
              boxShadow: isCheck
                ? '0 0 0 4px rgba(34,197,94,0.15)'
                : '0 0 0 2px rgba(0,0,0,0.06)',
            }}
          >
            <FaCheck
              className={clsx('text-lg transition-transform duration-200', {
                'scale-100 opacity-100': isCheck,
                'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100':
                  !isCheck,
              })}
            />
          </div>
        )}

        {/* 삭제 모드 UI */}
        {isDeleteMode && (
          <div
            className={clsx(
              'absolute right-2 top-2 flex size-8 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300',
              {
                'border-red-600 bg-red-500 text-white': isCheck,
                'border-gray-300 bg-white text-gray-400 group-hover:border-red-400 group-hover:text-red-500':
                  !isCheck,
              }
            )}
          >
            <MdClose
              className={clsx('text-lg transition-transform duration-200', {
                'scale-100 opacity-100': isCheck,
                'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100':
                  !isCheck,
              })}
            />
          </div>
        )}

        {/* 오버레이/자세히: 선택/삭제모드 아닐 때만 */}
        {!isSelectMode && !isDeleteMode && (
          <>
            <div
              className={clsx(
                'absolute inset-0 z-[1] rounded-2xl bg-blackAlpha-500 group-hover:block',
                {
                  block: isFocus,
                  hidden: !isFocus,
                }
              )}
            />
            <div
              className={clsx(
                'absolute inset-0 z-[2] size-full flex-col rounded-2xl border-base border-whiteAlpha-700 bg-blackAlpha-600 text-white group-hover:flex',
                {
                  flex: isFocus,
                  hidden: !isFocus,
                }
              )}
            >
              <div className="flex h-[calc(100%-50px)] w-full flex-col items-center justify-end gap-2 overflow-hidden text-ellipsis border-b-base border-whiteAlpha-700 px-4 pb-2 text-whiteAlpha-700">
                <p className="line-clamp-1 w-full touch-none select-none text-left text-lg font-semibold text-whiteAlpha-900">
                  {board?.replace(/&#\d+;/g, '').trim()}
                </p>
                <div className="flex w-full flex-row items-center justify-start gap-2 text-whiteAlpha-700">
                  <div className="flex max-w-full items-center justify-center gap-1 truncate">
                    <FiClock size="14px" />
                    <p className="touch-none select-none text-center text-base font-normal">
                      {uploadTimeDiff}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <FaEye size="14px" />
                    <p className="select-none text-center text-base font-normal">
                      {formatNumberToEnglishUnit(view)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <FaThumbsUp size="14px" />
                    <p className="touch-none select-none text-center text-base font-normal">
                      {formatNumberToEnglishUnit(like)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex h-[50px] w-full flex-1 items-center justify-between gap-2 p-2">
                <Link className="w-full" href={`/artwork/${id}`}>
                  <div className="flex h-[34px] w-full items-center justify-center rounded-lg bg-gradient-to-tl from-pink-500 to-pink-300 px-2.5 py-2 text-xs font-semibold text-white transition hover:from-pink-400 hover:to-pink-200 active:from-pink-500 active:to-pink-300">
                    자세히
                    <FaArrowRightLong className="ml-1 hidden 2xs:block" />
                  </div>
                </Link>
                <Link
                  className="link-to-wakzoo w-full"
                  href={wakzooLink}
                  target="_blank"
                >
                  <div className="flex h-[34px] w-full items-center justify-center rounded-lg bg-gradient-to-tl from-green-500 to-green-300 px-2.5 py-2 text-xs font-semibold text-white transition hover:from-green-400 hover:to-green-200 active:from-green-500 active:to-green-300">
                    왁물원
                    <FaArrowRightLong className="ml-1 hidden 2xs:block" />
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      {/* 하단 정보 */}
      <div className="flex h-auto w-full max-w-[350px] flex-col items-start justify-center">
        <p
          className={clsx('line-clamp-1 text-left text-base font-medium', {
            'text-green-500': isCheck,
          })}
        >
          {title}
        </p>
        {!isArtistDetails &&
          (isSelectMode || isDeleteMode ? (
            <span
              className={clsx(
                'line-clamp-1 w-full text-left text-sm font-medium',
                {
                  'text-green-500': isCheck,
                  'text-gray-400 dark:text-gray-500': !isCheck,
                }
              )}
              title={authorName ?? undefined}
            >
              {`작가: ${authorName}`}
            </span>
          ) : (
            <Link
              href={artistLink}
              className="link-to-profile w-full"
              target={linkTarget}
            >
              <p className="line-clamp-1 text-left text-sm font-medium text-gray-900 hover:text-green-highlight dark:text-whiteAlpha-700 dark:hover:text-pink-highlight">
                {`작가: ${authorName}`}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}
