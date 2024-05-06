'use client';

import clsx from 'clsx';
import React, { createContext, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

type PopoverContextType = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  popoverRef: React.RefObject<HTMLDivElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
};

const PopoverContext = createContext<PopoverContextType>({
  isOpen: false,
  onToggle: () => {},
  onClose: () => {},
  popoverRef: { current: null },
  buttonRef: { current: null },
});

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error(
      'Popover 하위 컴포넌트를 사용하려면 부모 컴포넌트로 <Popover>가 있어야 합니다.'
    );
  }
  return context;
};

// TODO: 현재 Content는 고정적으로 top right에 위치해있다. 이를 동적으로 변경할 수 있도록 수정해야함
export default function Popover({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const onClose = () => {
    setIsOpen(false);
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
      onClose();
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
    <PopoverContext.Provider
      value={{ isOpen, onToggle, onClose, popoverRef, buttonRef }}
    >
      <div className="relative inline-flex" aria-label="A popover">
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

type PopoverTriggerProps = {
  size?: 'sm' | 'md' | 'lg' | '9xl';
  children: React.ReactNode;
};

function PopoverTrigger({ children, size = 'md' }: PopoverTriggerProps) {
  const { onToggle, buttonRef } = usePopoverContext();
  return (
    <button
      ref={buttonRef}
      aria-label="question button"
      type="button"
      className={clsx(
        'inline-flex min-w-4 select-none appearance-none items-center justify-center rounded-full bg-transparent p-0 font-semibold text-blackAlpha-900 transition hover:bg-gray-100 active:bg-gray-200 dark:text-whiteAlpha-900 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400',
        {
          'size-4': size === 'sm',
          'size-5': size === 'md',
          'size-10': size === 'lg',
          'size-32': size === '9xl',
        }
      )}
      onClick={onToggle}
    >
      {children}
    </button>
  );
}

type PopoverContentProps = {
  hasCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
  children: React.ReactNode;
};

function PopoverContent({
  children,
  size = 'md',
  position = 'bottom-left',
  hasCloseButton = true,
}: PopoverContentProps) {
  const { isOpen, onClose, popoverRef } = usePopoverContext();
  // const buttonHeight = buttonRef.current?.clientHeight;
  return (
    <div
      ref={popoverRef}
      className={clsx(
        'absolute z-50 rounded-md border-base border-gray-200 bg-white transition dark:border-whiteAlpha-300 dark:bg-black-200',
        {
          'visible scale-100 opacity-100': isOpen,
          'invisible scale-95 opacity-0': !isOpen,
          'w-[200px]': size === 'sm',
          'w-[320px]': size === 'md',
          'w-[400px]': size === 'lg',
          'right-[-30px] top-[calc(100%+10px)]': position === 'bottom-left',
          'left-0 top-[calc(100%+10px)] translate-x-[-30%]':
            position === 'bottom-center',
        }
      )}
    >
      {hasCloseButton && (
        <button
          type="button"
          aria-label="Close popover"
          onClick={onClose}
          className="absolute right-2 top-2"
        >
          <IoClose className="size-4" />
        </button>
      )}
      {children}
    </div>
  );
}

function PopoverHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="border-b-base border-gray-200 px-3 py-2 dark:border-whiteAlpha-300">
      {children}
    </header>
  );
}

function PopoverBody({ children }: { children: React.ReactNode }) {
  return <div className="px-3 py-2 text-start">{children}</div>;
}

export { PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger };
