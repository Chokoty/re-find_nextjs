'use client';

import { useSearchParams } from 'next/navigation';

import UpdateBoard from '@/app/(home)/components/Upload/UpdateBoard';
import SearchResult from '@/app/search/components/SearchResult';
import { useResponsive } from '@/hooks/useResponsive';

export default function SearchBody() {
  const isMobile = useResponsive();
  const searchParams = useSearchParams();
  if (isMobile && searchParams.get('q') === null) {
    return <UpdateBoard />;
  }
  return <SearchResult searchParams={searchParams} />;
}
