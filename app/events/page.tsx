import Link from 'next/link';
import { BsDoorOpenFill } from 'react-icons/bs';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

import { cn } from '@/lib/common';

const events = [
  {
    title: '팬아트 랜덤가챠 굴리기',
    colorScheme:
      'bg-purple-400 hover:bg-purple-500 dark:text-gray-900 text-gray-50',
    icon: <GiPerspectiveDiceSixFacesRandom className="mr-2 size-6" />,
    link: '/events/randomGacha',
    linkText: '무슨 팬아트가 나올까요?',
  },
  // {
  //   title: '기간한정 슛코☆팬아트 갤러리 공개',
  //   // buttonColorScheme: 'green',
  //   buttonColorScheme: '#9ae6b4',
  //   hoverBackground: '#ddd',
  //   hoverColor: 'black',
  //   icon: (
  //     <BsCalendarEventFill
  //       style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }}
  //     />
  //   ),
  //   link: '/gallery/AprilFool',
  //   linkText: '이건 못참지',
  // },
  {
    title: '왁티홀의 문 체험하기',
    colorScheme: 'bg-red-400 hover:bg-red-500 dark:text-gray-900 text-gray-50',
    isDisabled: true,
    icon: <BsDoorOpenFill className="mr-2 size-6" />,
    link: '/events/waktyhall',
    linkText: '선택을 바꾸시겠습니까?',
  },
];

export default function Events() {
  return (
    <div className="mx-auto my-4 flex w-[90%] flex-col items-center justify-center gap-4">
      {events.map((event, index) => (
        <div
          key={index}
          className="mx-auto flex min-h-[120px] w-full max-w-[540px] flex-col items-center justify-between rounded-2xl bg-white p-5 shadow-cardBox dark:bg-dark-card"
        >
          <p className="mb-2 w-full px-4 text-center text-lg font-bold">
            {event.title}
          </p>
          {event.isDisabled && (
            <p className="text-center text-red-700 dark:text-red-300">
              현재 해당 서비스는 지웓되지않습니다.
              <br className="inline md:hidden" /> 추후 추가될 예정입니다.
            </p>
          )}
          <Link
            href={event.link}
            className={cn(
              'mt-2 flex w-full justify-center rounded-xl p-2 font-semibold transition md:w-[60%]',
              event.colorScheme
            )}
          >
            {event.icon}
            {event.linkText}
          </Link>
        </div>
      ))}
    </div>
  );
}
