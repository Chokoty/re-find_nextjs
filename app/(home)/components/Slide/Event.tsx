import Link from 'next/link';
import { PiGiftBold } from 'react-icons/pi';

export default function Event() {
  return (
    <div className="flex size-full max-h-[130px] flex-col items-center justify-center rounded-2xl bg-white py-3 shadow-cardBox dark:bg-dark-card 2xs:py-6 md:py-11">
      <p className="mb-2 text-base font-bold 2xs:text-xl md:mb-4 md:text-[1.7rem]">
        이벤트 페이지 개설!
      </p>
      <Link
        href="/events"
        className="flex w-10/12 items-center justify-center rounded-xl bg-purple-200 py-1.5 font-semibold text-gray-800 transition hover:bg-purple-300 active:bg-purple-400 2xs:w-4/5 2xs:p-2 md:w-3/5"
      >
        <PiGiftBold className="mr-2 size-6" />
        팬아트 가챠 하러가기
      </Link>
    </div>
  );
}
