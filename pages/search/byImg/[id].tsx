import React, { useEffect } from 'react';

import OtherLayout from '@/components/layout/other-layout';
import { useStore } from '@/store/store';

const Search = () => {
  const setIsOpen = useStore((state) => state.setIsOpen);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <OtherLayout title="이미지 검색결과">
      <div className="toLink">search</div>
    </OtherLayout>
  );
};

export default Search;
