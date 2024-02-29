'use client';

import { useCallback } from 'react';

const useUrlQuery = (
  sortCriteria,
  setSortCriteria,
  setBoard,
  resetArtworks
) => {
  const handleViewTypeSelect = useCallback(
    (value) => {
      if (value === sortCriteria.field) {
        setBoard('');
        setSortCriteria((prevState) => ({
          ...prevState,
          field: '',
          order: 'descending',
        }));
      } else {
        setBoard(value.replace('_cnt', ''));
        setSortCriteria((prevState) => ({
          ...prevState,
          field: value,
          order: 'descending',
        }));
      }
      resetArtworks();
    },
    [sortCriteria, setSortCriteria, setBoard, resetArtworks]
  );

  return handleViewTypeSelect;
};

export default useUrlQuery;
