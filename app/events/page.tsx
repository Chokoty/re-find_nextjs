import Link from 'next/link';
import { BsDoorOpenFill, BsTrophyFill } from 'react-icons/bs';
import { FaRegSquareCaretLeft } from 'react-icons/fa6';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { PiRankingFill } from 'react-icons/pi';

import PageTitle from '@/components/PageTitle';
import { cn } from '@/lib/common';

const topTitle = {
  title: '이벤트 페이지',
  description: '리파인드팀에서 기획한 컨텐츠들을 즐겨보세요',
};

const events = [
  {
    title: '팬아트 랜덤가챠 굴리기',
    colorScheme:
      'bg-purple-400 hover:bg-purple-500 active:bg-purple-600 dark:text-gray-900 text-gray-50',
    icon: <GiPerspectiveDiceSixFacesRandom className="mr-2 size-6" />,
    link: '/events/randomGacha',
    linkText: '무슨 팬아트가 나올까요?',
    gtmTag: 'event-randomGacha',
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
    colorScheme:
      'bg-red-400 hover:bg-red-500 active:bg-red-600 dark:text-gray-900 text-gray-50',
    // isDisabled: true,
    icon: <BsDoorOpenFill className="mr-2 size-6" />,
    link: '/events/waktyhall',
    linkText: '선택을 바꾸시겠습니까?',
    gtmTag: 'event-waktyhall',
  },
  {
    title: '[고공전] 세구님 팬아트 태그 월드컵',
    colorScheme:
      'bg-blue-400 hover:bg-blue-500 active:bg-blue-600 dark:text-gray-900 text-gray-50',
    // isDisabled: true,
    icon: <BsTrophyFill className="mr-2 size-6" />,
    link: '/events/fanartWorldCup',
    linkText: '태그 월드컵 체험하기',
    gtmTag: 'event-fanartWorldCup',
  },
  {
    title: '재미로 보는 고멤투표 예측',
    colorScheme:
      'bg-green-400 hover:bg-green-500 active:bg-green-600 dark:text-gray-900 text-gray-50',
    icon: <PiRankingFill className="mr-2 size-6" />,
    link: '/events/gomemVotePredict',
    linkText: '왁물원 고멤 언급 순위 레이스 보기',
    gtmTag: 'event-gomemVotePredict',
  },
  {
    title: '2024 리파인드 돌아보기',
    colorScheme:
      'bg-green-400 hover:bg-green-500 active:bg-green-600 dark:text-gray-900 text-gray-50',
    icon: <FaRegSquareCaretLeft className="mr-2 size-6" />,
    link: '/recap2024',
    linkText: '리파인드 팬아트 연말정산',
    gtmTag: 'event-fanartWorldCup',
  },
];

export default function Events() {
  return (
    // <div className="mx-auto mt-2 flex w-[90%] flex-col items-center justify-center gap-4">
    <div className="flex w-full flex-col items-center justify-center gap-8 px-3 py-4">
      <PageTitle topTitle={topTitle} />
      {events.map((event, index) => (
        <div
          key={index}
          className="mx-auto flex min-h-[120px] w-full max-w-[540px] flex-col items-center justify-between rounded-2xl bg-light-card p-5 shadow-sm dark:bg-dark-card-2"
        >
          <p className="mb-2 w-full px-4 text-center text-lg font-bold">
            {event.title}
          </p>
          <Link
            href={event.link}
            className={cn(
              'mt-2 flex w-full justify-center rounded-xl p-2 font-semibold transition md:w-[60%]',
              event.colorScheme,
              event.gtmTag
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
