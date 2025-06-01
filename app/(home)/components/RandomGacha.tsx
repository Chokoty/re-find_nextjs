import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsQuestionLg } from 'react-icons/bs';
import { FaDice } from 'react-icons/fa';

import { useRandomFanart } from '@/app/events/service/client/useEventService';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';
import { RANDOM_TEXTS } from '@/lib/const';

export default function RandomGacha() {
  const { data, isLoading, isFetching, refetch, status } = useRandomFanart({
    isd: true,
    woowakgood: true,
    gomem: true,
  });

  const showRandomFanart = async () => {
    // disabled에서 막혀야하지만 이렇게도 막을 수 있음
    if (isFetching) return;
    await refetch();
  };
  return (
    <div className="my-10 flex w-full flex-col items-center justify-start gap-4 rounded-2xl bg-white px-6 pb-4 pt-6 dark:bg-dark-card">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-bold">팬아트 가챠</h2>
        <Link
          href="/events/randomGacha"
          className="decoration-purple-500 hover:underline"
        >
          <p className="text-sm font-bold text-blackAlpha-700 dark:text-whiteAlpha-700">
            더보기
          </p>
        </Link>
      </div>
      <Fanart
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={status === 'error'}
      />
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <Button
          additionalClass="event-randomGacha rounded-xl w-[80%] text-base font-bold gap-1.5"
          intent="solid-purple"
          size="lg"
          onClick={showRandomFanart}
          disabled={isFetching} // 여러 번 클릭시 중복 요청 방지
        >
          <FaDice className="size-5" />
          랜덤가챠 굴리기
        </Button>
        {/* <Link href="/events/randomGacha" className="w-full">
          <div className="inline-flex h-12 min-h-12 w-full select-none items-center justify-center whitespace-nowrap rounded-xl bg-gray-100 pe-4 ps-4 align-middle text-base font-bold leading-tight text-gray-800 outline-none outline-offset-2 transition hover:bg-gray-200 active:bg-gray-300 dark:bg-whiteAlpha-200 dark:text-white dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400">
            랜덤가챠 더보기(4개)
          </div>
        </Link> */}
      </div>
    </div>
  );
}

const Fanart = ({
  data,
  isLoading,
  isFetching,
  isError,
}: {
  data?: EventFanart;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
}) => {
  const [displayTextIndex, setDisplayTextIndex] = useState(0);

  useEffect(() => {
    // @ts-ignore
    let intervalId;
    if (isFetching) {
      intervalId = setInterval(() => {
        setDisplayTextIndex(
          (prevIndex) => (prevIndex + 1) % RANDOM_TEXTS.length
        );
      }, 500);
    } else {
      clearInterval(intervalId);
    }
    // @ts-ignore
    return () => clearInterval(intervalId);
  }, [isFetching]);

  const displayText = RANDOM_TEXTS[displayTextIndex];

  const article_link = useResponsiveLink(
    data?.url.split('/').pop() ?? '',
    'article'
  );

  const modifiedUrl800 = useModifiedImageUrl({
    url: data?.img_url ?? '',
    size: 800,
  });

  if (isError) {
    return <Alert />;
  }

  if (isLoading || isFetching || !data) {
    return (
      <div className="flex min-h-[200px] w-full flex-col items-center justify-center rounded-2xl bg-light-button dark:bg-dark-card-2">
        {isFetching ? (
          <p className="w-full text-center text-4xl font-bold">{displayText}</p>
        ) : (
          <BsQuestionLg className="size-20" />
        )}
      </div>
    );
  }
  const { title, nickname } = data;
  const id = data?.url.split('/').pop();

  return (
    <div className="mb-2 flex w-full flex-col items-center justify-center rounded-2xl">
      <Link
        className="link-to-wakzoo w-full"
        // href={article_link}
        href={`/artwork/${id}`}
        // target="_blank"
      >
        <Image
          className="max-h-[312px] rounded-2xl object-cover shadow-cardBox"
          src={modifiedUrl800}
          alt={`랜덤 팬아트 게시글 title: ${title}`}
          width={475}
          height={475}
          unoptimized
        />
      </Link>
      <div className="mt-2 px-4 text-center">
        <p className="line-clamp-1">제목: {title}</p>
        <Link
          href={`/artists/${nickname}`}
          className="link-to-profile hover:text-green-highlight dark:hover:text-pink-highlight"
        >
          <p className="line-clamp-1">작가: {nickname}</p>
        </Link>
      </div>
    </div>
  );
};
