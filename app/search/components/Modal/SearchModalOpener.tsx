import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { MdHomeFilled } from 'react-icons/md';

import SearchModal from '@/app/search/components/Modal/SearchModal';
import useModal from '@/hooks/useModal';

export default function SearchModalOpener() {
  const searchParams = useSearchParams();
  const getPlaceHolder = () => {
    const q = searchParams.get('q');
    const isNotSearch = q === null; // default
    const isFullSearch = !isNotSearch && q.length === 0;
    const searchedTextColor =
      'placeholder:text-light-myText dark:placeholder:text-dark-myText-2';
    const noteSearchedTextColor =
      'placeholder:text-light-myText dark:placeholder:text-dark-myText-2';
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
    // <div className="flex h-12 items-center gap-4">
    <div
      className="group relative mx-4 h-12 w-[70%] max-w-[400px]"
      onClick={handleInputClick}
    >
      <div className="absolute left-0 top-0 z-[2] h-full w-12 cursor-pointer">
        <FaSearch className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-500 dark:text-dark-myText-2" />
      </div>
      <input
        className={`relative size-full cursor-pointer rounded-full border border-gray-100 bg-light-card pl-12 pr-4 transition group-hover:border-green-highlight group-hover:bg-light-card-2 dark:border-dark-card-2 dark:bg-dark-card-2 dark:group-hover:bg-dark-card-3 ${placeHolderColor}`}
        placeholder={placeholderText}
      />
    </div>
    // </div>
  );
}
