'use client';

import { useState } from 'react';

import ArtistList from '@/components/artist/ArtistList';
import SortTypeButtonGroup from '@/components/artist/SortTypeButtonGroup';
import ViewTypeButtonGroup from '@/components/artist/ViewTypeButtonGroup';
import type { SortCriteria } from '@/types';

export default function Artists() {
  const [selectedView, setSelectedView] = useState<keyof AuthorCommon | null>(
    null
  );
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>({
    field: 'total_likes',
    active: true,
  });

  const handleViewSelect = (value: keyof AuthorCommon) => {
    if (selectedView === value) {
      // 뷰 선택 해제
      setSelectedView(null);
    } else {
      setSelectedView((prevValue) => (prevValue === value ? null : value));
    }
  };

  const handleChangeSortCriteria = (field: keyof AuthorCommon) => {
    if (sortCriteria.field === field) {
      return;
    }
    setSortCriteria((prevState) => {
      return { ...prevState, field, active: true };
    });
  };

  return (
    <>
      <ViewTypeButtonGroup
        selectedView={selectedView}
        handleViewSelect={handleViewSelect}
      />
      <SortTypeButtonGroup
        sortCriteria={sortCriteria}
        handleChangeSortCriteria={handleChangeSortCriteria}
      />
      <ArtistList sortCriteria={sortCriteria} selectedView={selectedView} />
    </>
  );
}
