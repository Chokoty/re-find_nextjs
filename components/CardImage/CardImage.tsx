import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FaCheck, FaEye, FaThumbsUp } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FiClock } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
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
  isDeletable?: boolean;
};

export default function CardImage({
  data,
  wakzooLink,
  isCheckable = false,
  isDeletable = false,
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

  const { fanarts, setFanarts } = useCheckFanartStore(
    useShallow((state) => ({
      fanarts: state.fanarts,
      setFanarts: state.setFanarts,
    }))
  );
  const isCheck = fanarts.includes(id);

  const handleToggleCheck = () => {
    if (isCheck) {
      setFanarts(fanarts.filter((fanartId) => fanartId !== id));
    } else {
      setFanarts([...fanarts, id]);
    }
  };

  // 삭제 모드 UI
  if (isDeletable) {
    return (
      <div
        onClick={handleToggleCheck}
        className="group relative w-full cursor-pointer rounded-[16px] border-base border-blackAlpha-200 dark:border-none"
      >
        <Image
          width={357}
          height={357}
          style={{ width: '120%', height: 'auto' }}
          src={img_url === '' ? 'https://placehold.co/375x375' : modifiedUrl300}
          alt={title}
          className={clsx(
            'max-h-[536px] rounded-[16px] bg-[#f5f5f5] object-cover',
            { 'blur-[6px]': deleted }
          )}
          unoptimized
        />
        <div
          className={clsx(
            'absolute inset-0 z-[1] rounded-[16px] transition-all duration-300 ease-in-out',
            isCheck ? 'bg-red-500/30' : 'bg-transparent' // 빨간색 배경
          )}
        >
          <div
            className={clsx(
              `absolute right-2 top-2 flex size-8 items-center justify-center rounded-full border-2 shadow-lg transition-all
              duration-300
              ${
                isCheck
                  ? 'border-red-500 bg-red-500 text-white' // 빨간색 테두리
                  : 'border-gray-300 bg-white text-gray-400 group-hover:bg-red-50' // 호버시 빨간 배경
              } group-hover:border-red-400 group-hover:shadow-xl`
            )}
            style={{
              boxShadow: isCheck
                ? '0 0 0 4px rgba(239,68,68,0.15)' // 빨간색 그림자
                : '0 0 0 2px rgba(0,0,0,0.06)',
            }}
          >
            <MdClose // 삭제 아이콘으로 변경
              className={clsx(
                'text-lg transition-transform duration-200',
                isCheck
                  ? 'scale-100 opacity-100'
                  : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isCheckable) {
    return (
      <div
        onClick={handleToggleCheck}
        className="group relative w-full cursor-pointer rounded-[16px] border-base border-blackAlpha-200 dark:border-none"
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
            }
          )}
          unoptimized
        />
        <div
          className={clsx(
            'absolute inset-0 z-[1] rounded-[16px] transition-all duration-300 ease-in-out',
            isCheck ? 'bg-blackAlpha-500' : 'bg-transparent'
          )}
        >
          <div
            className={clsx(
              // group-hover로 강조 효과 추가
              `absolute right-2 top-2 flex size-8 items-center justify-center rounded-full border-2 shadow-lg transition-all
            duration-300
            ${
              isCheck
                ? 'border-green-500 bg-green-500 text-white'
                : 'border-gray-300 bg-white text-gray-400 group-hover:bg-green-50'
            } group-hover:border-green-400 group-hover:shadow-xl`
            )}
            style={{
              boxShadow: isCheck
                ? '0 0 0 4px rgba(34,197,94,0.15)'
                : '0 0 0 2px rgba(0,0,0,0.06)',
            }}
          >
            <FaCheck
              className={clsx(
                'text-lg transition-transform duration-200',
                isCheck
                  ? 'scale-100 opacity-100'
                  : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
              )}
            />
          </div>
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
