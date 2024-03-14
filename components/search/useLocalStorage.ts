import { useEffect, useState } from 'react';

export const useLocalStorage = () => {
  // 로컬 스토리지에 저장된 검색어 가져오기
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const deleteHistoryKeyword = (value: string) => {
    const filteredSearches = recentSearches.filter(
      (eachVal) => eachVal !== value
    );
    localStorage.setItem('recentSearches', JSON.stringify(filteredSearches));
    setRecentSearches(filteredSearches);
  };

  const deleteHistoryKeywords = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  const addHistoryKeyword = (value: string) => {
    // 최대 6개까지 저장
    const newSearches = [value, ...recentSearches.slice(0, 5)];
    const newSearchesSet = new Set(newSearches);
    const newSearchesArray = Array.from(newSearchesSet);
    localStorage.setItem('recentSearches', JSON.stringify(newSearchesArray));
    setRecentSearches(newSearchesArray);
  };

  useEffect(() => {
    const searches = localStorage.getItem('recentSearches');
    if (searches) {
      setRecentSearches(JSON.parse(searches));
    }
  }, []);

  return {
    deleteHistoryKeyword,
    deleteHistoryKeywords,
    addHistoryKeyword,
    recentSearches,
    setRecentSearches,
  };
};
