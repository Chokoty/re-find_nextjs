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
      <div className="fixed inset-0 z-[299] flex size-full items-center justify-center bg-blackAlpha-300">
        <ClimbingBoxLoader color="#01BFA2" />
      </div>
    )
  );
}
