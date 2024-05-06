import Image from 'next/image';
import Link from 'next/link';
import { LuExternalLink } from 'react-icons/lu';

import Game from '@/app/events/components/WaktyHall/Game';
import PageTitle from '@/components/PageTitle';
import { Question } from '@/lib/images';

const topTitle = {
  title: '왁티홀의 역설',
  description:
    '문 뒤에는 고퀄팬아트와 혐잘딱팬아트, 왁두팬아트가 있습니다, 당신의 선택은?',
};

const SOURCE_URL = 'https://cafe.naver.com/steamindiegame/2093767';

export default function WaktyHall() {
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center justify-center gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-4 p-4 pb-16 text-center">
        <div className="mb-4">
          <PageTitle topTitle={topTitle} />
        </div>
        <Image
          src={Question}
          alt="왁티홀"
          width={300}
          height={300}
          unoptimized
        />
        <Link
          className="flex items-center text-green-highlight transition hover:underline dark:text-pink-highlight"
          href={SOURCE_URL}
          target="_blank"
        >
          원본링크: 몬티홀의 역설의 현실(+왁굳님 반응 추가)
          <LuExternalLink className="ml-1 hidden 2xs:block" />
        </Link>
      </div>
      <Game />
    </div>
  );
}
