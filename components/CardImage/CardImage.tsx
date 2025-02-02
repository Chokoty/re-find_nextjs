import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaEye, FaThumbsUp } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FiClock } from 'react-icons/fi';
import { useShallow } from 'zustand/react/shallow';

import { useCheckFanartStore } from '@/app/album/store/checkFanartStore';
import { formatNumberToEnglishUnit } from '@/hooks/useFormatNumberToCompactString';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useUploadTimeDiff } from '@/hooks/useUploadTimeDiff';

type Props = {
  data: ArtworkList;
  wakzooLink: string;
  isCheckable?: boolean;
};

export default function CardImage({
  data,
  wakzooLink,
  isCheckable = false,
}: Props) {
  const [isFocus, setIsFocus] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { img_url, img_url_list, title, board, view, like, date, deleted, id } =
    data;
  const modifiedUrl300 = useModifiedImageUrl({
    url: img_url_list[0],
    size: 300,
  });
  const uploadTimeDiff = useUploadTimeDiff(date);
  // 이미지 URL 목록을 처리

  useOnClickOutside(cardRef, () => {
    setIsFocus(false);
  });

  const [isCheck, setIsCheck] = useState(false);
  const { fanarts, setFanarts } = useCheckFanartStore(
    useShallow((state) => ({
      fanarts: state.fanarts,
      setFanarts: state.setFanarts,
    }))
  );
  useEffect(() => {
    if (isCheck) {
      setFanarts([...fanarts, id]);
    }
  }, [isCheck]);

  if (isCheckable) {
    return (
      <div
        onClick={() => {
          setIsCheck(!isCheck);
        }}
        className="group relative w-full rounded-[16px] border-base border-blackAlpha-200 dark:border-none"
      >
        <Image
          width={357}
          height={357}
          // sizes="100vw"
          style={{ width: '120%', height: 'auto' }}
          src={img_url === '' ? 'https://placehold.co/375x375' : modifiedUrl300}
          alt={title}
          className={clsx(
            'max-h-[536px] rounded-[16px] bg-[#f5f5f5] object-cover',
            {
              'blur-[6px]': deleted,
            }
          )}
          unoptimized
        />
        <div
          className={clsx(
            'absolute inset-0 z-[1] rounded-[16px] bg-blackAlpha-500',
            {
              block: isCheck,
              hidden: !isCheck,
            }
          )}
        >
          <FaCheck className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 text-4xl text-white" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      tabIndex={0} // 기본적으로 div에 포커스를 받을 수 없지만, 해당 이벤트를 작동하기위해 추가
      className="group relative w-full rounded-[16px] border-base border-blackAlpha-200 dark:border-none"
      // 모바일에서 카드 클릭용
      onFocus={() => setIsFocus(true)}
    >
      <Image
        width={357}
        height={357}
        // sizes="100vw"
        style={{ width: '120%', height: 'auto' }}
        src={img_url === '' ? 'https://placehold.co/375x375' : modifiedUrl300}
        alt={title}
        className={clsx(
          'max-h-[536px] rounded-[16px] bg-[#f5f5f5] object-cover',
          {
            'blur-[6px]': deleted,
          }
        )}
        unoptimized
      />
      <div
        className={clsx(
          'absolute inset-0 z-[1] rounded-[16px] bg-blackAlpha-500 group-hover:block',
          {
            block: isFocus,
            hidden: !isFocus,
          }
        )}
      />
      <div
        className={clsx(
          'absolute inset-0 z-[2] size-full flex-col rounded-[16px] border-base border-whiteAlpha-700 bg-blackAlpha-600 text-white group-hover:flex',
          {
            block: isFocus,
            hidden: !isFocus,
          }
        )}
      >
        <div
          className="flex h-[calc(100%-50px)] w-full flex-col items-center justify-end gap-2 overflow-hidden text-ellipsis border-b-base border-whiteAlpha-700 px-4 pb-2 text-whiteAlpha-700"
          // onTouchEnd={() => setIsFocus(false)}
        >
          <p className="line-clamp-1 w-full touch-none select-none text-left text-lg font-semibold text-whiteAlpha-900">
            {board.replace(/&#\d+;/g, '').trim()}
          </p>
          <div className="flex w-full flex-row items-center justify-start gap-2 text-whiteAlpha-700">
            <div className="flex max-w-full items-center justify-center gap-1 truncate">
              <FiClock size="14px" />
              <p className="touch-none select-none text-center text-base font-normal">
                {/* {date?.split(' ')[0].slice(2, -1)} */}
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
            <div
              // className={styles.textBox}
              className="flex h-[34px] w-full items-center justify-center rounded-lg bg-gradient-to-tl from-pink-500 to-pink-300 px-2.5 py-2 text-xs font-semibold text-white transition hover:from-pink-400 hover:to-pink-200 active:from-pink-500 active:to-pink-300"
              // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
            >
              자세히
              <FaArrowRightLong className="ml-1 hidden 2xs:block" />
            </div>
          </Link>
          <Link
            className="link-to-wakzoo w-full"
            href={wakzooLink}
            target="_blank"
          >
            <div
              // className={styles.textBox}
              className="flex h-[34px] w-full items-center justify-center rounded-lg bg-gradient-to-tl from-green-500 to-green-300 px-2.5 py-2 text-xs font-semibold text-white transition hover:from-green-400 hover:to-green-200 active:from-green-500 active:to-green-300"
              // rel="noopener noreferrer" // 보안상의 이유료 이 부분도 추가합니다.
            >
              왁물원
              <FaArrowRightLong className="ml-1 hidden 2xs:block" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
