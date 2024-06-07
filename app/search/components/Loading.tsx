'use client';

import { ClimbingBoxLoader } from 'react-spinners';
import { useShallow } from 'zustand/react/shallow';

import { useSearchFilterStore } from '@/app/search/store/searchFilerStore';

export default function Loading() {
  const { isShow } = useSearchFilterStore(
    useShallow((state) => ({
      isShow: state.isFetching,
    }))
  );

  return (
    isShow && (
      <div className="fixed left-1/2 top-1/2 z-[299] -translate-x-1/2 -translate-y-1/2">
        <ClimbingBoxLoader color="#01BFA2" />
      </div>
    )
  );
}
