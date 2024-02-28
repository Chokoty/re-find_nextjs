'use client';

import React, { useEffect } from 'react';

import OtherLayout from '@/components/layout/other-layout';
import { useDrawerStore } from '@/store/drawerStore';

const Search = ({ params }: { params: { id: string } }) => {
  const setIsOpen = useDrawerStore((state) => state.setIsOpen);
  const { id } = params;

  console.log(id);

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
