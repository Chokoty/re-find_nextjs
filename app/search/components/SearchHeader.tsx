'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import SearchBar from '@/app/search/components/SearchBar';
import SearchHistory from '@/app/search/components/SearchHistory';
import { useLocalStorage } from '@/app/search/hooks/useLocalStorage';

export default function SearchHeader() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const {
    recentSearches,
    addHistoryKeyword,
    deleteHistoryKeyword,
    deleteHistoryKeywords,
  } = useLocalStorage();
  const [focused, setFocused] = useState(false);

  const onBarFocus = () => {
    setFocused(true);
  };

  const handleCloseSearchHistory = () => {
    setFocused(false);
  };

  return (
    <section className="w-full">
      <div className="px-4">
        <SearchBar
          addHistoryKeyword={addHistoryKeyword}
          hasButton
          closeHistory={handleCloseSearchHistory}
          q={q}
          focusBar={onBarFocus}
        />
      </div>
      <div
        className={clsx('mt-4 max-h-0 overflow-hidden transition-all', {
          'max-h-screen': focused,
        })}
      >
        <SearchHistory
          recentSearches={recentSearches}
          deleteHistoryKeyword={deleteHistoryKeyword}
          deleteHistoryKeywords={deleteHistoryKeywords}
          closeHistory={handleCloseSearchHistory}
        />
      </div>
    </section>
  );
}
