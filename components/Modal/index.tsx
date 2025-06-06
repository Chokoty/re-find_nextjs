import clsx from 'clsx';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import FocusLock from 'react-focus-lock';
import { useWindowSize } from 'react-use';

type Props = {
  Component: React.ComponentType<any>;
  modalProps?: Record<string, unknown>;
  hide: () => void;
};
type AnimationRenderPositionType = keyof typeof animationMap;

export const ModalHideContext = createContext(() => {});

const animationMap = {
  top: {
    render: 'animate-modalRenderFromTop',
    remove: 'animate-modalRemoveFromTop',
  },
  bottom: {
    render: 'animate-modalRenderFromBottom',
    remove: 'animate-modalRemove',
  },
  default: {
    render: 'animate-modalRender',
    remove: 'animate-modalRemove',
  },
} as const;

// 디폴트: 포지션(가운데), 렌더 애니메이션(밑)
export default function Modal({ Component, modalProps, hide }: Props) {
  const position = modalProps?.position ?? 'center';
  const animationPosition = modalProps?.animateDir ?? 'default';
  const ANIMATION_RENDER =
    animationMap[animationPosition as AnimationRenderPositionType].render;
  const ANIMATION_REMOVE =
    animationMap[animationPosition as AnimationRenderPositionType].remove;
  const isCelebrating = (modalProps?.congrat as boolean) || undefined;
  // applyCustomMaxWidth가 true일경우 custom modal 내부에서도 max-width를 주어야 적용됩니다. (ex. OptionModal.tsx)
  const applyCustomMaxWidth = modalProps?.applyCustomMaxWidth ?? false;

  const modalRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();
  const [className, setClassName] = useState<string>(ANIMATION_RENDER);

  // 모달이 렌더링 될 때 focus를 modal로 이동
  // useEffect(() => {
  //   if (modalRef.current) {
  //     modalRef.current.focus();
  //   }
  // }, []);

  // 기본은 backdrop 클릭시 닫히지않도록 설정, show함수에 isBackdropClick: true를 넘겨주면 backdrop 클릭시 닫히도록 설정
  const handleBackdropClick = () => {
    if (modalProps?.isBackdropClick) {
      handleCancel();
    }
  };

  // 1. 호출시 remove 애니메이션 보여준다.
  const handleCancel = useCallback(() => setClassName(ANIMATION_REMOVE), []);

  // 2. 이후 애니메이션이 종료된 후 modal을 전역 객체에서 없앤다.
  const handleAnimationEnd = () => {
    if (className === ANIMATION_REMOVE) {
      hide();
    }
  };

  // ESC 키 눌렀을 때 닫히도록 설정(단, 외부 클릭이 막혀져있지 않은 경우)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      handleBackdropClick();
    }
  };

  // 모달 외부 스크롤 제거
  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.style.overflowY = 'hidden';
    return () => {
      htmlElement.style.overflowY = 'auto';
    };
  }, []);

  return (
    <FocusLock>
      <div
        className={clsx('fixed inset-0 z-[201] size-full', {
          'block bg-blackAlpha-600': position === 'top',
          'flex items-center justify-center bg-blackAlpha-600':
            position === 'center',
          'flex items-end justify-center': position === 'bottom',
        })}
        onClick={handleBackdropClick}
      >
        {isCelebrating && <Confetti width={width} height={height} />}
        <ModalHideContext.Provider value={handleCancel}>
          <div
            tabIndex={-1}
            ref={modalRef}
            className={clsx(
              `flex w-full justify-center transition-all duration-500 ease-out sm:mx-auto ${applyCustomMaxWidth ? 'sm:max-w-fit' : 'sm:max-w-[435px]'}`,
              {
                [className]: true,
                'mb-[60px]': position === 'bottom',
                'h-full': modalProps?.size,
              }
            )}
            onClick={(e) => e.stopPropagation()} // modal 바깥 클릭시 닫히지 않도록 설정
            onAnimationEnd={handleAnimationEnd}
            onKeyDown={handleKeyDown}
          >
            <Component {...modalProps} />
          </div>
        </ModalHideContext.Provider>
      </div>
    </FocusLock>
  );
}
