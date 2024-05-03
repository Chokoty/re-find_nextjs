import Confetti from 'react-confetti';
import { IoClose } from 'react-icons/io5';
import useWindowSize from 'react-use/lib/useWindowSize';

import { TARGET_COUNT } from '@/app/(home)/lib/const';
import useModal from '@/hooks/useModal';

export default function EventModal() {
  const targetCountText = TARGET_COUNT.toString().slice(0, 1);

  const { hide } = useModal();
  const onClose = () => {
    if (
      window.confirm(
        '정말 닫으시겠습니까? 이벤트 창을 닫으면 다시 열 수 없습니다.'
      )
    ) {
      hide();
    }
  };

  const { width, height } = useWindowSize();
  return (
    <div className="size-full">
      <Confetti width={width} height={height} />
      <div className="fixed left-1/2 top-1/2 z-[1000] w-full -translate-x-1/2 -translate-y-1/2 overscroll-y-none">
        <section className="relative mx-auto w-full max-w-[95%] rounded-2xl bg-white dark:bg-dark-card 2xs:max-w-[90%] md:max-w-[60%] lg:max-w-[45%]">
          <button
            className="absolute right-[10px] top-[10px] flex size-9 items-center justify-center rounded-full transition hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-whiteAlpha-200 dark:active:bg-whiteAlpha-300"
            onClick={onClose}
          >
            <IoClose className="size-8" />
          </button>
          <div className="flex size-full flex-col items-center justify-center px-3 py-6 text-center text-sm 2xs:px-4 2xs:py-12 2xs:text-base lg:px-8">
            <h1 className="py-4 text-lg font-semibold 2xs:text-xl">
              리파인드 누적검색량 {targetCountText}만 돌파 기념 기습 이벤트
            </h1>
            <p>🎉축하드립니다!🎉</p>
            <p>
              팬아트 검색을 이용하신 {targetCountText}만 번째 이파리로
              당첨되셨습니다!!!
            </p>
            <p className="mt-4">
              이 이벤트 창은 정확히{' '}
              <span className="font-bold text-[#ef5a9a]">딱 한 분에게만</span>{' '}
              보이는 페이지입니다.
            </p>
            <p>
              본 팝업창은{' '}
              <span className="font-bold text-[#ef5a9a]">1회만</span> 뜨기
              때문에{' '}
              <span className="font-bold text-[#ef5a9a]">
                실수로 새로고침하거나 닫지 않도록
              </span>
              해주세요!
            </p>
            <p className="mt-4">저희 리파인드를 이용해주셔서 감사합니다.</p>
            <p>
              당첨되신 분께서는 현재 뜬 팝업창을 캡쳐하고 아래 문장과 함께
              인증해 주시면 작은 선물을 드릴 예정입니다.
            </p>
            <br />
            <br />
            <p className="text-center font-bold text-[#ef5a9a]">
              {`"원대한 꿈이 있잖아~"`}
            </p>
            <br />
            <br />
            <p>
              <span className="font-bold text-[#ef5a9a]">
                rerurureruru@gmail.com
              </span>{' '}
              또는 리파인드 소개 페이지 내 초코널 밀크티 개발자 프로필에서&nbsp;
              <span className="font-bold text-[#ef5a9a]">왁물원 쪽지</span>
              또는 문의, 지원 페이지 내&nbsp;
              <span className="font-bold text-[#ef5a9a]">기타 문의</span>를 통해
              보내주시면 감사하겠습니다.
            </p>
            <p className="mt-4">
              저희 서비스를 이용하면서 불편했던 점이나 개선했으면 하는 점을 같이
              공유해주시면 감사하겠습니다. 조만간 팬아트를 통한 새로운 컨텐츠와
              소소한 이벤트를 진행해 볼 예정이니 많은 관심 부탁드립니다. 킹아!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
