import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';
import { useShallow } from 'zustand/react/shallow';

import { useSearchFilterStore } from '@/app/search/store/searchFilerStore';
import Button from '@/components/Button';

type Prop = {
  inputRef?: React.RefObject<HTMLInputElement>;
  addHistoryKeyword: (keyword: string) => void;
  onClose?: () => void;
  focusBar?: () => void;
  closeHistory?: () => void;
  hasButton?: boolean;
};

export default function SearchBar({
  addHistoryKeyword,
  onClose,
  focusBar,
  inputRef,
  closeHistory,
  hasButton = false,
}: Prop) {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const router = useRouter();
  const [input, setInput] = useState(q); // 검색어
  const { setGlobalSearchValue } = useSearchFilterStore(
    useShallow((state) => ({
      setGlobalSearchValue: state.setSearchValue,
    }))
  );

  const handleSearch = () => {
    const trimedInput = input.trim();
    onClose?.();
    closeHistory?.();
    if (trimedInput.length > 0) {
      addHistoryKeyword(trimedInput);
    }

    router.push(
      `/search?q=${encodeURIComponent(trimedInput)}&ranktype=latest&sensitive=false`
    );
  };

  const onBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setGlobalSearchValue(query);
    setInput(query);
  };

  const onSearchButtonClick = () => {
    handleSearch();
  };

  const onBarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    closeHistory?.();
    setGlobalSearchValue('');
    setInput('');
  };

  /* 최근 검색어를 눌러 해당 검색어 router로 이동했을 때,
   *  업데이트된 searchParams로 검색어가 업데이트 안되는 경우가 발생했음.
   *  따라서, 컴포넌트 마운트시 업데이트
   */
  useEffect(() => {
    setGlobalSearchValue(q);
    setInput(q);
  }, [q]);

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <div
        className="relative h-12 w-full"
        // onClick={handleInputClick}
      >
        <div className="absolute left-0 top-0 z-[2] h-full w-12 cursor-pointer">
          <button
            type="button"
            className="absolute left-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center"
            onClick={onSearchButtonClick}
          >
            <FaSearch className="size-5 text-gray-600 hover:text-green-highlight dark:text-whiteAlpha-700 dark:hover:text-green-highlight" />
          </button>
        </div>
        <input
          ref={inputRef}
          className="relative size-full cursor-text rounded-full border border-gray-200 bg-gray-100 pl-12 pr-20 outline-none transition placeholder:text-gray-500 hover:border-green-highlight hover:bg-white focus:border-green-highlight focus:outline-none focus:ring-1 focus:ring-green-highlight dark:border-whiteAlpha-300 dark:bg-whiteAlpha-200 dark:placeholder:text-whiteAlpha-600 dark:hover:border-green-highlight dark:hover:bg-dark-card 2xs:pr-24"
          placeholder="키워드 검색 (빈 칸은 전체 검색)"
          value={input}
          onChange={onBarChange}
          onKeyDown={onBarKeyDown}
          onFocus={focusBar}
        />
        <div className="absolute right-0 top-0 z-[2] flex h-full w-[84px] items-center justify-end pr-4 2xs:gap-2">
          {input.length > 0 && (
            <button
              type="button"
              className="mr-2 flex size-8 items-center justify-center"
              onClick={handleClear}
            >
              <IoIosCloseCircle className="size-5 text-gray-600 dark:text-whiteAlpha-700" />
            </button>
          )}
        </div>
      </div>
      {hasButton && (
        <Button
          additionalClass="rounded-full bg-green-highlight hover:bg-green-600 active:bg-green-700 dark:active:bg-green-400 min-h-9 h-9 hidden md:inline-flex"
          onClick={onSearchButtonClick}
        >
          검색
        </Button>
      )}
    </div>
  );
}
