import Link from 'next/link';
import { AiFillExperiment } from 'react-icons/ai';

import { SOURCE_URL } from '@/app/more/lib/const';
import MoreButtons from '@/components/Button/MoreButtons';
import UpdateLogBoard from '@/components/UpdateLogBoard';

export default function More() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4">
        <MoreButtons />
      </div>
      <Link className="inline-block" href={SOURCE_URL} target="_blank">
        <div className="inline-flex min-h-10 items-center justify-center rounded-md bg-purple-500 px-4 text-gray-50 transition hover:bg-purple-600">
          <AiFillExperiment className="mr-1.5 size-4 xs:mr-2 xs:size-5" />
          <p className="text-sm xs:text-base">
            (beta)이세돌 팬아트를 키워드로 찾아주는 AI
          </p>
        </div>
      </Link>
      <UpdateLogBoard />
    </div>
  );
}
