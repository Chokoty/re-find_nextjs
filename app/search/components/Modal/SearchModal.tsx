'use client';

import { useEffect, useRef } from 'react';

import ModalSearchBar from '@/app/search/components/Modal/ModalSearchBar';
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

  useEffect(() => {
    const searches = localStorage.getItem('recentSearches');
    setRecentSearches(JSON.parse(searches ?? '[]'));
    inputRef.current?.focus();
  }, []);
  const { hide } = useModal();
  const onClose = () => {
    hide();
  };

  return (
    <div className="fixed left-1/2 top-0 z-[1000] w-full -translate-x-1/2 overscroll-y-none md:w-[70%]">
      <section className="w-full rounded-b-2xl border border-gray-200 bg-white px-2 dark:border-whiteAlpha-300 dark:bg-dark-card">
        <header className="flex flex-col items-center justify-center px-2 py-8">
          <ModalSearchBar
            inputRef={inputRef}
            addHistoryKeyword={addHistoryKeyword}
            onClose={onClose}
          />
        </header>
        <div className="px-2 pb-6">
          <SearchHistory
            recentSearches={recentSearches}
            deleteHistoryKeyword={deleteHistoryKeyword}
            deleteHistoryKeywords={deleteHistoryKeywords}
            modalClose={onClose}
          />
        </div>
      </section>
    </div>
  );
}
