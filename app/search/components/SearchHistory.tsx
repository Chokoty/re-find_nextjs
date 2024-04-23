import { usePathname, useRouter } from 'next/navigation';
import { FiClock } from 'react-icons/fi';
import { TbTrashXFilled } from 'react-icons/tb';

import Button from '@/components/Button';

type Props = {
  recentSearches: string[];
  deleteHistoryKeyword: (value: string) => void;
  deleteHistoryKeywords: () => void;
  close?: () => void;
  modalClose?: () => void;
};

export default function SearchHistory({
  recentSearches,
  deleteHistoryKeyword,
  deleteHistoryKeywords,
  close,
  modalClose,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const isSearchPage = pathname === '/search';

  const moveSearchResult = (q: string) => {
    if (!isSearchPage) {
      modalClose?.();
    }
    router.push(`/search?q=${q}`);
  };
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 text-gray-700 dark:text-whiteAlpha-800">
      <div className="mb-6 flex w-full items-center justify-between">
        <h5 className="pl-2 text-base">최근검색어</h5>
        <div className="flex items-center justify-center">
          {isSearchPage && (
            <Button
              onClick={close}
              size="xs"
              intent="ghost-gray"
              additionalClass="h-6 min-h-6"
            >
              <p className="text-[13px]">닫기</p>
            </Button>
          )}
          <Button
            onClick={deleteHistoryKeywords}
            size="xs"
            intent="ghost-gray"
            additionalClass="px-[10px] py-[13px] h-6 min-h-6"
          >
            <p className="text-[13px]">전체 삭제</p>
          </Button>
        </div>
      </div>
      {recentSearches.map((q, index) => (
        <div
          className="flex w-full items-center justify-between rounded-lg px-2"
          key={index}
        >
          <Button
            // className="flex-1 justify-start bg-transparent px-2"
            intent="ghost-gray"
            additionalClass="flex-1 px-2 justify-start h-10 min-h-10"
            onClick={() => moveSearchResult(q)}
          >
            <div className="flex items-center gap-2">
              <FiClock className="size-4" />
              <p className="text-start">{q}</p>
            </div>
          </Button>
          <Button
            // className="flex h-10 w-10 items-center justify-center rounded-full"
            // size="xs"
            intent="ghost-gray"
            additionalClass="rounded-full h-12 min-h-12"
            onClick={() => deleteHistoryKeyword(q)}
          >
            <TbTrashXFilled className="size-5" />
          </Button>
        </div>
      ))}
    </div>
  );
}
