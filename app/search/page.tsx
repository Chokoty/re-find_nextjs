'use client';

import { Suspense } from 'react';

import SearchResult from '@/app/search/components/SearchResult';

export default function Search() {
  return (
    <div className="w-full px-2.5 text-center md:px-4">
      <Suspense>
        <SearchResult />
      </Suspense>
    </div>
  );
}
