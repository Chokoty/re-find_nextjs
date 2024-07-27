import { Suspense } from 'react';

import SearchResult from '@/app/search/components/SearchResult';

export default function Search() {
  return (
    <div className="w-full px-2.5 text-center md:px-4">
      <div className="mx-auto w-full max-w-screen-lg rounded-lg bg-white shadow-cardBox dark:bg-dark-card md:rounded-2xl">
        <Suspense>
          <SearchResult />
        </Suspense>
      </div>
    </div>
  );
}
