import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Alert from '@/components/Alert';
import { useModifiedImageUrl } from '@/hooks/useModifiedImageUrl';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';
import { RANDOM_TEXTS } from '@/lib/const';

type Props = {
  data?: EventFanart;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  loadingContent: React.ReactNode;
};

export default function Fanart({
  data,
  isLoading,
  isFetching,
  isError,
  loadingContent,
}: Props) {
  const [displayTextIndex, setDisplayTextIndex] = useState(0);

  // const article_link = useResponsiveLink(
  //   data?.url.split('/').pop() ?? '',
  //   'article'
  // );
  const id = data?.url.split('/').pop();

  const modifiedUrl800 = useModifiedImageUrl({
    url: data?.img_url ?? '',
    size: 800,
  });

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

  if (isError) {
    return <Alert />;
  }

  if (isFetching || isLoading || !data) {
    return (
      <div className="my-4 flex min-h-[312px] w-full flex-col items-center justify-center rounded-2xl bg-gray-100 dark:bg-whiteAlpha-200 sm:min-h-[400px]">
        {isFetching ? <p>{displayText}</p> : loadingContent}
      </div>
    );
  }

  const { title, nickname } = data;

  return (
    <div className="my-4 w-full">
      {/* <Link href={article_link} className="w-full" target="_blank"> */}
      <Link className="w-full" href={`/artwork/${id}`}>
        <Image
          className="max-h-[312px] rounded-2xl object-cover object-center shadow-img transition-transform duration-300 hover:scale-105 sm:max-h-[400px]"
          width={475}
          height={475}
          src={modifiedUrl800}
          alt={`랜덤 팬아트 게시글 title: ${title}`}
          unoptimized
        />
      </Link>
      <div className="mt-2 flex flex-col items-center justify-center px-4">
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
}
