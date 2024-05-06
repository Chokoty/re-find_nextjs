import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa6';
import { LuExternalLink } from 'react-icons/lu';
import { MdArrowForwardIos } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';

import AuthorProfileCard from '@/app/(home)/components/Card/AuthorProfileCard';
import Description from '@/app/(home)/components/Description';
import BOARD_LIST from '@/app/(home)/lib/const';
import { useImageUploadStore } from '@/app/(home)/store/imageUploadStore';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import { useResponsiveLink } from '@/hooks/useResponsiveLink';
import { useUploadTimeDiff } from '@/hooks/useUploadTimeDiff';

type Props = {
  searchTime: number;
  data: Source;
};

export default function ImageSearchResult({ searchTime, data }: Props) {
  const uploadTimeDiff = useUploadTimeDiff(data.upload_date);
  const article_link = useResponsiveLink('', 'article');
  const ids = data.ids.slice(0, 15); // 검색결과 10~15개 제한
  const { resetFiles } = useImageUploadStore(
    useShallow((state) => ({
      resetFiles: state.resetFiles,
    }))
  );
  const board_link = useResponsiveLink(
    BOARD_LIST.find(
      (item) => item.board === data.board.replace(/&#\d+;/g, '').trim()
    )?.id ?? '',
    'menu'
  );

  return (
    <div className="flex w-full max-w-[500px] flex-col items-center justify-center rounded-b-2xl border border-gray-200 p-4 dark:border-whiteAlpha-300">
      {ids?.length === 0 ? (
        <Description />
      ) : (
        <div className=" flex w-full flex-col items-center justify-center rounded-b-2xl bg-white dark:bg-dark-card">
          <div className="flex w-full flex-col items-center justify-between gap-4">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="w-full">
                <Link
                  className="flex items-center"
                  href={board_link}
                  target="_blank"
                >
                  <p className="text-lg font-bold 2xs:text-xl">
                    {data.board.replace(/&#\d+;/g, '').trim()}
                  </p>
                  <MdArrowForwardIos className="ml-2 hidden text-sm 2xs:block" />
                </Link>
              </div>
              <Badge intent="secondary" size="lg">
                <div className="flex items-center">
                  <FaRegClock className="mr-1 text-sm text-green-800 dark:text-green-200" />
                  <p className="line-clamp-1 max-w-16 text-sm text-green-800 dark:text-green-200 2xs:max-w-20 2xs:text-base sm:max-w-32">
                    {uploadTimeDiff}
                  </p>
                </div>
              </Badge>
            </div>
            <Link
              className="mb-4 flex w-full items-center text-green-highlight dark:text-pink-highlight"
              href={article_link + ids[0].id}
              target="_blank"
            >
              <p className="text-xl font-bold 2xs:text-2xl">{data.title}</p>
              <LuExternalLink className="ml-2 hidden text-lg font-semibold 2xs:block" />
            </Link>
          </div>
          <AuthorProfileCard
            author={data.author}
            writerURL={data.author?.author_url}
            profURL={data.author?.author_prof_url}
            nickname={data.author?.author_nickname}
          />
          <Divider />
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <div className="w-full">
              <p className="mb-2 mt-4 text-xl font-bold">관련 게시글 링크</p>
            </div>
            {ids.map((item, index) => (
              <Link
                key={index}
                className="mb-4 w-full text-lg text-green-highlight dark:text-pink-highlight"
                href={article_link + item.id}
                target="_blank"
              >
                {item.is_deleted === true ? (
                  <p className="mb-4 text-center text-xl">
                    삭제된 게시글입니다.
                  </p>
                ) : (
                  <div className="flex items-center">
                    <p className="line-clamp-1">{article_link + item.id}</p>
                    <LuExternalLink className="ml-2 hidden text-lg font-semibold 2xs:block" />
                  </div>
                )}
                {item.is_shukkou === true && (
                  <p className="mb-4 text-center text-xl">
                    `(슛코당한 팬아트일 확률이 높습니다.)`
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
      <p className="m-5 text-center text-xl">
        검색시간: <span className="font-semibold">{searchTime / 1000}s</span>
      </p>
      <Button onClick={resetFiles} size="lg" intent="solid-blue">
        다른 이미지 검색
      </Button>
    </div>
  );
}
