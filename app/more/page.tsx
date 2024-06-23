import Link from 'next/link';
import { AiFillExperiment } from 'react-icons/ai';
import { FaBookOpen } from 'react-icons/fa';

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
        <div className="inline-flex min-h-10 items-center justify-center rounded-md bg-purple-500 px-4 text-gray-50 transition hover:bg-purple-600 active:bg-purple-700">
          <AiFillExperiment className="mr-1.5 size-4 xs:mr-2 xs:size-5" />
          <p className="text-sm xs:text-base">
            (beta)이세돌 팬아트를 키워드로 찾아주는 AI
          </p>
        </div>
      </Link>
      <Link className="mt-2 inline-block md:hidden" href="/more/install-info">
        <div className="inline-flex min-h-10 w-[340px] items-center justify-start rounded-md bg-gray-700 px-4 text-gray-50 transition hover:bg-gray-800 active:bg-gray-900">
          <FaBookOpen className="mr-1.5 size-4 xs:mr-2 xs:size-5" />
          <p className="text-sm xs:text-base">
            (수동)리파인드 홈화면 설치 가이드
          </p>
        </div>
      </Link>
      <div className="p-4">
        <UpdateLogBoard />
      </div>
    </div>
  );
}
