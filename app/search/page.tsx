import { Suspense } from 'react';

import SearchResult from '@/app/search/components/SearchResult';

export default function SearchPage() {
  return (
    <div className="w-full px-2.5 pb-[60px] text-center md:px-4">
      <Suspense>
        <SearchResult />
      </Suspense>
    </div>
  );
}
