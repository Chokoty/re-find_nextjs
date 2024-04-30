'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';

type Prop = {
  description: string;
};

export default function HelpPopOver({ description }: Prop) {
  const [isShow, setIsShow] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    setIsShow((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    // 외부 클릭 시 팝오버 닫기 (다른 팝오버가 있을 경우 고려)
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      // 외부에 있는 토글 버튼을 누르면 이후 로직을 실행하지 않음
      if (
        buttonRef.current &&
        buttonRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setIsShow(false);
    }
  };

  // 컴포넌트가 마운트될 때 document.body에 클릭 이벤트 리스너 추가
  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" aria-label="A popover">
      <button
        aria-label="question button"
        type="button"
        ref={buttonRef}
        onClick={toggle}
      >
        <BsFillQuestionCircleFill className="text-blackAlpha-600 dark:text-whiteAlpha-600" />
      </button>
      <div
        ref={popoverRef}
        className={clsx(
          'absolute right-[-30px] top-[30px] z-50 w-[320px] rounded-md border-base border-whiteAlpha-700 bg-gray-600 transition',
          {
            'visible opacity-100': isShow,
            'invisible opacity-0': !isShow,
          }
        )}
      >
        <button
          type="button"
          aria-label="Close popover"
          onClick={() => setIsShow(false)}
          className="absolute right-2 top-2"
        >
          <IoClose className="size-4" />
        </button>
        <header className="border-b-base border-whiteAlpha-700 px-3 py-2">
          검색도움말
        </header>
        <div className="px-3 py-2 text-start ">{description}</div>
      </div>
    </div>
  );
}
