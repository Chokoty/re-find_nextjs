import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

import Button from '@/components/Button';

type Prop = {
  inputRef?: React.RefObject<HTMLInputElement>;
  addHistoryKeyword: (keyword: string) => void;
  onClose?: () => void;
  focusBar?: () => void;
  closeHistory?: () => void;
  hasButton?: boolean;
  q?: string;
};

export default function SearchBar({
  addHistoryKeyword,
  onClose,
  focusBar,
  inputRef,
  closeHistory,
  hasButton = false,
  q,
}: Prop) {
  const router = useRouter();
  const [input, setInput] = useState(q ?? ''); // 검색어

  const handleSearch = () => {
    const trimedInput = input.trim();
    onClose?.();
    closeHistory?.();
    if (trimedInput.length > 0) {
      addHistoryKeyword(trimedInput);
    }
    router.push(`/search?q=${encodeURIComponent(trimedInput)}`);
  };

  const onBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
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
    setInput('');
  };

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <div
        className="relative h-9 w-full"
        // onClick={handleInputClick}
      >
        <div className="absolute left-0 top-0 z-[2] h-full w-10">
          <span className="absolute right-[10%] top-1/2 ml-2 h-4 w-px -translate-y-1/2 bg-gray-600 dark:bg-whiteAlpha-500" />
        </div>
        <input
          ref={inputRef}
          className="relative size-full cursor-text rounded-full border border-gray-200 bg-gray-100 pl-12 pr-20 outline-none transition placeholder:text-gray-500 hover:border-green-highlight hover:bg-white focus:border-green-highlight focus:outline-none focus:ring-1 focus:ring-green-highlight dark:border-whiteAlpha-300 dark:bg-whiteAlpha-200 dark:placeholder:text-whiteAlpha-600 dark:hover:border-pink-highlight dark:hover:bg-dark-card dark:focus:border-pink-highlight dark:focus:ring-pink-highlight 2xs:pr-24"
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
          <button
            type="button"
            className="flex size-8 items-center justify-center"
            onClick={onSearchButtonClick}
          >
            <FaSearch className="size-5 text-gray-600 hover:text-green-highlight dark:text-whiteAlpha-700 dark:hover:text-pink-highlight" />
          </button>
        </div>
      </div>
      {hasButton && (
        <Button
          additionalClass="rounded-full bg-green-highlight hover:bg-green-600 min-h-9 h-9 hidden md:inline-flex"
          onClick={onSearchButtonClick}
        >
          검색
        </Button>
      )}
    </div>
  );
}
