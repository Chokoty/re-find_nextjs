import Link from 'next/link';

import Accordion, { AccordionItem } from '@/components/Accordion';

export default function Description() {
  return (
    <div className="mb-5 flex w-full items-center justify-center">
      <Accordion initOpen={true}>
        <AccordionItem title="이미지 출처를 찾지 못했습니다.">
          <div className="my-4 w-full rounded-md border-2 border-hightlight p-8">
            <p className="mb-3 font-bold">
              다음과 같은 경우에 검색결과가 나오지 않을 수 있습니다!
            </p>
            <ul role="list" className="mb-3.5 list-disc pl-5 text-hightlight">
              <li>
                <p className="font-bold">
                  원본 팬아트에서 변형을 가한 경우 찾기 어렵습니다. <br />
                  (일부 잘라낸 이미지, 크기 변형, 배경 투명화 등)
                </p>
              </li>
              <li>
                <p className="mt-2 font-bold">
                  왁물원에 새로 올라온 팬아트가 반영되기까지 시간이 좀 걸릴 수
                  있습니다.(길면 하루 정도)
                </p>
              </li>
              <li>
                <p className="mt-2 font-bold">
                  현재 상단에 명시된 게시판에 올라온 것만 찾을 수 있습니다.
                  (아직 자유 게시판이나 웹툰 게시판에 올라온 것은 찾을 수
                  없습니다.)
                </p>
              </li>
              <li>
                <p className="mt-2 font-bold">
                  게시글이 존재하는 이미지여도 못 찾는 모시깽이가 가끔 있습니다.
                </p>
              </li>
            </ul>

            <p className="font-bold">
              구글 이미지 검색을 활용하여 다른 곳에 업로드된 이미지를 찾은 뒤,
              그걸로 검색하면 간혹 찾을 수 있습니다. &nbsp;
              <Link
                className="contents"
                href="https://www.google.co.kr/imghp?hl=ko"
                target="_blank"
              >
                <span className="font-bold text-hightlight">
                  구글 이미지 검색하러가기
                </span>
              </Link>
            </p>
            <p className="mt-5 font-bold">
              만약 위에 해당하지 않는 경우라면 스크린샷과 함께 버그 제보
              해주시면 서비스 개선하는데 큰 도움이 됩니다. &nbsp;
              <Link className="contents" href="/support">
                <p className="font-bold text-hightlight">버그제보하기</p>
              </Link>
            </p>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
