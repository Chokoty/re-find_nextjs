'use client';

import { useEffect, useRef } from 'react';

import OptionModal from '@/app/search/components/Modal/OptionModal';
import SearchBar from '@/app/search/components/SearchBar';
import SearchHistory from '@/app/search/components/SearchHistory';
import { useLocalStorage } from '@/app/search/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';

export default function SearchModal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    recentSearches,
    setRecentSearches,
    addHistoryKeyword,
    deleteHistoryKeyword,
    deleteHistoryKeywords,
  } = useLocalStorage();

  const { show } = useModal(OptionModal);

  const openOptions = () => {
    show({
      isBackdropClick: true,
      applyCustomMaxWidth: true,
      searchModalClose: onClose,
    });
  };

  useEffect(() => {
    const searches = localStorage.getItem('recentSearches');
    setRecentSearches(JSON.parse(searches ?? '[]'));
    inputRef.current?.focus();
  }, []);
  const { hide } = useModal();
  const onClose = () => {
    hide();
  };

  const buttonClassName =
    'flex items-center justify-center gap-1 rounded-lg py-1.5 px-3 text-center text-base transition hover:bg-blackAlpha-100 active:bg-blackAlpha-200 dark:hover:bg-whiteAlpha-100 dark:active:bg-whiteAlpha-300 w-auto font-medium text-gray-900 dark:text-gray-50';

  return (
    <div className="flex w-full max-w-[432px] items-center justify-center">
      <section className="w-full max-w-[432px] rounded-b-2xl border border-gray-200 bg-white px-4 dark:border-whiteAlpha-300 dark:bg-dark-card">
        <div className="flex justify-center py-2">
          <SearchBar
            inputRef={inputRef}
            addHistoryKeyword={addHistoryKeyword}
            onClose={onClose}
          />
        </div>
        <div className="flex justify-end ">
          <button onClick={openOptions} className={buttonClassName}>
            필터 더보기
          </button>
        </div>
        <div className="">
          <SearchHistory
            recentSearches={recentSearches}
            deleteHistoryKeyword={deleteHistoryKeyword}
            deleteHistoryKeywords={deleteHistoryKeywords}
            closeModal={onClose}
          />
        </div>
      </section>
    </div>
  );
}
