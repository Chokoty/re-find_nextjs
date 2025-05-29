'use client';

import { useResponsive } from '@/hooks/useResponsive';
import UpdateBoard from '@/app/(home)/components/Upload/UpdateBoard';
import SearchResult from '@/app/search/components/SearchResult';
import { useSearchParams } from 'next/navigation';

export default function SearchBody() {
  const isMobile = useResponsive();
  const searchParams = useSearchParams();
  if (isMobile && searchParams.get('q') === null) {
    return <UpdateBoard />;
  }
  return <SearchResult searchParams={searchParams} />;
}
