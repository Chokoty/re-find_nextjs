import React, { useEffect } from 'react';

import SearchLayout from '@/components/layout/search-layout';
import { useStore } from '@/store/store';

const Search = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <SearchLayout title="검색">
      <div className="toLink">search</div>
    </SearchLayout>
  );
};

export default Search;
