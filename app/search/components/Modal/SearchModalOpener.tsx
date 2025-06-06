import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IoSearchOutline } from 'react-icons/io5';

import SearchModal from '@/app/search/components/Modal/SearchModal';
import Tooltip from '@/components/Tooltip';
import useModal from '@/hooks/useModal';

export default function SearchModalOpener() {
  const searchParams = useSearchParams();
  const getPlaceHolder = () => {
    const q = searchParams.get('q');
    const isNotSearch = q === null; // default
    const isFullSearch = !isNotSearch && q.length === 0;
    const searchedTextColor =
      'placeholder:text-light-myText-2 dark:placeholder:text-dark-myText-2';
    const noteSearchedTextColor =
      'placeholder:text-light-myText-2 dark:placeholder:text-dark-myText-2';
    // 'placeholder:text-gray-500 dark:placeholder:text-whiteAlpha-400';
    if (isNotSearch) {
      return {
        // placeholderText: '키워드 검색 (빈 칸은 전체 검색)',
        placeholderText: '어떤 팬아트를 찾고 계신가요?',
        placeHolderColor: noteSearchedTextColor,
      };
    }
    if (isFullSearch) {
      return {
        placeholderText: '전체 검색',
        placeHolderColor: searchedTextColor,
      };
    }
    return { placeholderText: q, placeHolderColor: searchedTextColor };
  };
  const handleInputClick = () => {
    show({ isBackdropClick: true, animateDir: 'top', position: 'top' });
  };
  const { show } = useModal(SearchModal);
  const { placeholderText, placeHolderColor } = getPlaceHolder();

  return (
    <div className="flex w-full">
      <div className="relative m-auto h-12 w-full max-w-[400px] md:w-[70%]">
        <div
          onClick={handleInputClick}
          className="group size-full cursor-pointer"
        >
          <div className="absolute left-0 top-0 z-[2] size-full cursor-pointer">
            <IoSearchOutline className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400 dark:text-dark-myText-2" />
          </div>
          <input
            className={`relative size-full cursor-pointer rounded-full border-base border-gray-200 bg-white pl-12 pr-4 transition group-hover:border-green-highlight dark:border-dark-card-2 dark:bg-dark-card-2 dark:group-hover:bg-dark-card-3 ${placeHolderColor}`}
            placeholder={placeholderText}
          />
        </div>
        {/* <Link
          href="/recap2024"
          className="group absolute right-[-120px] z-[3] hidden h-12 w-auto items-center rounded-full border border-green-highlight px-4 font-medium text-green-highlight hover:bg-blackAlpha-200 active:bg-blackAlpha-300 dark:border-none dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-300 md:flex"
          style={{ top: 0 }}
        >
          <Tooltip label={'2024 리캡'}>
            <span className="font-pop text-base font-medium text-green-highlight hover:scale-105">
              🎉RE:CAP
            </span>
          </Tooltip>
        </Link> */}
      </div>
    </div>
  );
}
