import { Suspense } from 'react';

import OptionContainer from '@/app/search//components/Option/OptionContainer';
import SearchHeader from '@/app/search/components/SearchHeader';
import SearchResult from '@/app/search/components/SearchResult';

export default function Search() {
  return (
    <div className="w-full px-2 py-3 text-center md:p-4">
      <div className="mx-auto mb-7 w-full max-w-screen-lg rounded-lg bg-white pb-4 shadow-cardBox dark:bg-dark-card md:rounded-2xl">
        <div className="size-full rounded-t-2xl pt-4">
          <Suspense>
            <SearchHeader />
          </Suspense>
          <OptionContainer />
        </div>
        <Suspense>
          <SearchResult />
        </Suspense>
      </div>
    </div>
  );
}
