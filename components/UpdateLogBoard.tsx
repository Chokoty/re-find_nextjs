import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

import UpdateLog from '@/app/more/components/UpdateLog';

export default function UpdateLogBoard() {
  return (
    <div className="my-4 flex w-full flex-col items-center justify-center">
      <Link href="/more/notice" className="mx-auto w-full max-w-[700px]">
        <div className="flex w-full flex-row items-center justify-between px-2 py-4">
          <h2 className="text-xl font-bold leading-5">공지사항</h2>
          <IoIosArrowForward className="size-4" />
        </div>
      </Link>
      <UpdateLog rowCount={2} />
    </div>
  );
}
