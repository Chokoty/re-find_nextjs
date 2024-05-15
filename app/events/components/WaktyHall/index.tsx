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

const WAK_URL = 'https://cafe.naver.com/steamindiegame/2093767';
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=9ZJf2M6ZoGU';

export default function WaktyHall() {
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center justify-center gap-4">
      <div className="flex w-full flex-col items-center justify-center p-4 pb-8 text-center">
        <div className="mb-2">
          <PageTitle topTitle={topTitle} />
        </div>
        <div className="mb-2 flex flex-col items-start">
          <Link
            className="flex items-center text-green-highlight transition hover:underline dark:text-pink-highlight"
            href={WAK_URL}
            target="_blank"
          >
            왁물원: 몬티홀의 역설의 현실(+왁굳님 반응)
            <LuExternalLink className="ml-1 hidden 2xs:block" />
          </Link>
          <Link
            className="flex items-center text-green-highlight transition hover:underline dark:text-pink-highlight"
            href={YOUTUBE_URL}
            target="_blank"
          >
            유튜브: 몬티홀의 역설을 아십니까? - 왁굳의 노가리
            <LuExternalLink className="ml-1 hidden 2xs:block" />
          </Link>
        </div>
        <Image
          src={Question}
          alt="왁티홀"
          width={300}
          height={300}
          unoptimized
        />
      </div>
      <Game />
    </div>
  );
}
