import { Suspense } from 'react';

import SearchBody from '@/app/search/components/SearchBody';

export default function Search() {
  return (
    <div className="w-full px-2.5 pb-[60px] text-center md:px-4">
      <Suspense>
        <SearchBody />
      </Suspense>
    </div>
  );
}
