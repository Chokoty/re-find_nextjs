import Link from 'next/link';
import { PiGiftBold } from 'react-icons/pi';

export default function Event() {
  return (
    <div className="flex size-full max-h-[130px] flex-col items-center justify-center rounded-2xl bg-card py-3 shadow-cardBox 2sm:py-6 md:py-11">
      <p className="mb-4 text-lg font-bold 2sm:text-base md:text-[1.7rem]">
        이벤트 페이지 개설!
      </p>
      <Link
        href="/events"
        className="flex w-3/5 items-center justify-center rounded-2xl bg-purple-200 p-2 font-semibold text-gray-800 transition hover:bg-purple-300"
      >
        <PiGiftBold className="mr-2 size-6" />
        팬아트 가챠 하러가기
      </Link>
    </div>
  );
}
