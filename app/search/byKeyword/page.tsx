'use client';

import { useEffect } from 'react';

import OtherLayout from '@/components/layout/other-layout';
import { useDrawerStore } from '@/store/drawerStore';

export default function Search() {
  const setIsOpen = useDrawerStore((state) => state.setIsOpen);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <OtherLayout title="키워드 검색결과">
      <div className="toLink">search</div>
    </OtherLayout>
  );
}
