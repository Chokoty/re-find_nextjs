import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';

import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { useDeleteModeStore } from '@/app/album/store/deleteModeStore';
import { useSelectModeStore } from '@/app/album/store/selectModeStore';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useUploadTimeDiff } from '@/hooks/useUploadTimeDiff';

type Prop = {
  artwork: ArtworkList;
};

export default function SimpleCard({ artwork }: Prop) {
  // const article_link = useResponsiveLink('', 'article');
  const [isFocus, setIsFocus] = useState(false);
  const isSelectMode = useSelectModeStore((state) => state.isSelectMode);
  const isDeleteMode = useDeleteModeStore((state) => state.isDeleteMode);
  const { fanarts, setFanarts } = useCheckFanartStore(
    useShallow((state) => ({
      fanarts: state.fanarts,
      setFanarts: state.setFanarts,
    }))
  );
  const uploadTimeDiff = useUploadTimeDiff(artwork.date);
  // 이미지 URL 목록을 처리
  const imageUrlList = processImageUrlList(artwork.img_url_list);

  // 300 크기의 수정된 URL
  const modifiedUrl300 = useModifiedImageUrl({
    url: artwork.img_url_list[0],
    size: 300,
  });

  const modifiedUrls100 = imageUrlList.map((img_url) =>
    useModifiedImageUrl({
      url: img_url,
      size: 100,
    })
  );

  // 이미지 URL 목록을 처리하는 함수
  function processImageUrlList(imgList: string[]) {
    const processedList = [...imgList];

    // 3개 미만의 이미지가 있을 경우 빈 이미지로 채우기
    if (processedList.length < 3) {
      const emptyCount = 3 - processedList.length;
      for (let i = 0; i < emptyCount; i++) {
        processedList.push('');
      }
    } else if (processedList.length > 3) {
      // 3개 초과의 이미지가 있을 경우 3개까지만 가져오기
      processedList.splice(3);
    }

    return processedList;
  }

  const isCheck = fanarts.includes(artwork.id);

  const handleToggleCheck = () => {
    if (!(isSelectMode || isDeleteMode)) return;
    if (isCheck) {
      setFanarts(fanarts.filter((fanartId) => fanartId !== artwork.id));
    } else {
      setFanarts([...fanarts, artwork.id]);
    }
  };
  // 카드 내부 렌더링 분기
  const CardInner = (
    <div
      className={clsx(
        'group relative aspect-[16/9] max-w-[440px] overflow-hidden rounded-2xl',
        {
          'cursor-pointer': isSelectMode || isDeleteMode,
        }
      )}
      onClick={isSelectMode || isDeleteMode ? handleToggleCheck : undefined}
      tabIndex={isSelectMode || isDeleteMode ? 0 : undefined}
    >
      <div className="flex size-full items-center justify-between">
        <div className="h-full w-[65.5%]">
          <Image
            alt={artwork.title}
            width={300}
            height={300}
            className={clsx('size-full object-cover object-center-top', {
              'opacity-70': isCheck,
            })}
            src={
              artwork.img_url === ''
                ? 'http://via.placeholder.com/252x157'
                : modifiedUrl300
            }
            unoptimized
          />
        </div>
        <div
          className={clsx(
            'flex h-full w-[32.5%] flex-col items-center justify-between',
            {
              'opacity-70': isCheck,
            }
          )}
        >
          {modifiedUrls100.slice(1).map((imgUrl, idx) => (
            <div key={idx} className="h-[49%] w-full bg-gray-150">
              {imgUrl !== '' && (
                <Image
                  alt={artwork.title}
                  width={300}
                  height={300}
                  className="size-full object-cover object-center-top"
                  src={imgUrl}
                  unoptimized
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* 체크 UI */}
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
      {/* 오버레이/자세히: 선택모드 아닐 때만 */}
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
              'absolute inset-0 z-[2] size-full items-center justify-center rounded-2xl bg-blackAlpha-600 text-white group-hover:flex',
              {
                flex: isFocus,
                hidden: !isFocus,
              }
            )}
          >
            <p className="text-xl font-semibold">자세히</p>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div
      className="flex flex-col"
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    >
      {/* 선택모드일 때는 Link 제거, 아닐 때만 Link로 감싼다 */}
      {isSelectMode || isDeleteMode ? (
        CardInner
      ) : (
        <Link href={`/artwork/${artwork.id}`} className="mb-2">
          {CardInner}
        </Link>
      )}
      <div className="w-full px-1">
        {/* artwork.title에 green 적용 */}
        {isSelectMode || isDeleteMode ? (
          <p
            className={clsx(
              'line-clamp-1 text-left text-base font-semibold 2xs:text-xl',
              {
                // 'text-red-500': isCheck && isDeleteMode,
                'text-green-500': isCheck && isSelectMode,
              }
            )}
          >
            {artwork.title}
          </p>
        ) : (
          <Link href={`/artwork/${artwork.id}`}>
            <p className="line-clamp-1 text-left text-base font-semibold hover:text-whiteAlpha-700 active:text-whiteAlpha-800 2xs:text-xl">
              {artwork.title}
            </p>
          </Link>
        )}
        <div
          className={clsx(
            'flex items-center justify-between text-xs font-light 2xs:text-sm',
            {
              // 'text-red-500': isCheck && isDeleteMode,
              'text-green-500': isCheck && isSelectMode,
            }
          )}
        >
          {/* 팬아트 개수에 green 적용 */}
          <p>팬아트 {artwork.img_url_list.length}개</p>
          <p>{uploadTimeDiff}</p>
        </div>
      </div>
    </div>
  );
}
