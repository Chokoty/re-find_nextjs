import { FaSearch } from 'react-icons/fa';

import SearchModal from '@/app/search/components/Modal/SearchModal';
import useModal from '@/hooks/useModal';

export default function SearchModalOpener() {
  const handleInputClick = () => {
    show({ isBackdropClick: true, animateDir: 'top', position: 'top' });
  };
  const { show } = useModal(SearchModal);

  return (
    <div className="group relative mx-4 h-9 w-[70%]" onClick={handleInputClick}>
      <div className="absolute left-0 top-0 z-[2] h-full w-10 cursor-pointer">
        <span className="absolute right-[10%] top-1/2 ml-2 h-4 w-px -translate-y-1/2 bg-gray-500 dark:bg-whiteAlpha-400" />
      </div>
      <input
        className="relative size-full cursor-pointer rounded-full border border-gray-200 bg-gray-100 pl-12 transition placeholder:text-gray-500 group-hover:border-green-highlight group-hover:bg-white dark:border-whiteAlpha-300 dark:bg-whiteAlpha-200 dark:placeholder:text-whiteAlpha-400 dark:group-hover:bg-dark-card md:pr-12"
        placeholder="키워드 검색"
      />
      <div className="absolute right-0 top-0 z-[2] hidden h-full w-12 cursor-pointer md:block">
        <FaSearch className="absolute left-1 top-1/2 size-5 -translate-y-1/2 text-gray-500 dark:text-whiteAlpha-400" />
      </div>
    </div>
  );
}
