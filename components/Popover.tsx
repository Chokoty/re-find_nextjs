'use client';

import clsx from 'clsx';
import React, { createContext, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

type PopoverContextType = {
  visible: boolean;
  onToggle: () => void;
  onClose: (e?: Event) => void;
  innerContentRef: React.RefObject<HTMLDivElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
};

const PopoverContext = createContext<PopoverContextType>({
  visible: false,
  onToggle: () => {},
  onClose: () => {},
  innerContentRef: { current: null },
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
export default function Popover({
  children,
  openAtFirstTime = false,
}: {
  children: React.ReactNode;
  openAtFirstTime?: boolean;
}) {
  const [visible, setVisible] = useState(openAtFirstTime);
  const innerContentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onToggle = () => {
    setVisible((prev) => !prev);
  };
  const onClose = (e?: Event) => {
    const buttonEl = buttonRef?.current;
    const isButton =
      buttonEl === e?.target || buttonEl?.contains(e?.target as Node);
    if (isButton) return;

    setVisible(false);
  };

  return (
    <PopoverContext.Provider
      value={{ visible, onToggle, onClose, innerContentRef, buttonRef }}
    >
      <div className="relative inline-flex" aria-label="팝오버">
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

type PopoverTriggerProps = {
  size?: 'sm' | 'md' | '2md' | 'lg' | '9xl';
  color?: 'main' | 'sub';
  children: React.ReactNode;
};

function PopoverTrigger({
  children,
  size = 'md',
  color = 'main',
}: PopoverTriggerProps) {
  const { onToggle, buttonRef } = usePopoverContext();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onToggle();
    // onOpen();
  };
  return (
    <button
      ref={buttonRef}
      aria-label="question button"
      type="button"
      className={clsx(
        'inline-flex min-w-4 select-none appearance-none items-center justify-center rounded-full p-0 font-semibold transition',
        {
          'size-4': size === 'sm',
          'size-5': size === 'md',
          'size-8': size === '2md',
          'size-10': size === 'lg',
          'size-32': size === '9xl',
          'bg-transparent text-blackAlpha-900 hover:bg-gray-100 active:bg-gray-200 dark:text-whiteAlpha-900 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400':
            color === 'main',
          'bg-transition text-white hover:bg-blackAlpha-300 active:bg-blackAlpha-400':
            color === 'sub',
        }
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

type PopoverContentProps = {
  hasCloseButton?: boolean;
  size?: 'ss' | 'sm' | 'md' | 'lg';
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
  children: React.ReactNode;
  isForceOpen?: boolean;
};

function PopoverContent({
  children,
  size = 'md',
  position = 'bottom-left',
  hasCloseButton = true,
  isForceOpen = false,
}: PopoverContentProps) {
  if (isForceOpen) {
    const visible = true;
    const onClose = () => {};
    const innerContentRef = null;

    return (
      <div
        ref={innerContentRef}
        className={clsx(
          'absolute z-50 rounded-md border-base border-gray-200 bg-white transition dark:border-whiteAlpha-300 dark:bg-black-200',
          {
            'visible scale-100 opacity-100': visible,
            'invisible scale-95 opacity-0': !visible,
            'w-[155px]': size === 'ss',
            'w-[200px]': size === 'sm',
            'w-[320px]': size === 'md',
            'w-[400px]': size === 'lg',
            'right-[-30px] top-[calc(100%+10px)]': position === 'bottom-left',
            'left-0 top-[calc(100%+10px)] translate-x-[-30%]':
              position === 'bottom-center',
            'left-0 top-[calc(100%+10px)]': position === 'bottom-right',
          }
        )}
      >
        {children}
      </div>
    );
  }

  const { visible, onClose, innerContentRef } = usePopoverContext();
  // const buttonHeight = buttonRef.current?.clientHeight;
  useOnClickOutside(innerContentRef, (e) => {
    onClose(e);
  });

  return (
    <div
      ref={innerContentRef}
      className={clsx(
        'absolute z-50 rounded-md border-base border-gray-200 bg-white transition dark:border-whiteAlpha-300 dark:bg-black-200',
        {
          'visible scale-100 opacity-100': visible,
          'invisible scale-95 opacity-0': !visible,
          'w-[155px]': size === 'ss',
          'w-[200px]': size === 'sm',
          'w-[320px]': size === 'md',
          'w-[400px]': size === 'lg',
          'right-[-30px] top-[calc(100%+10px)]': position === 'bottom-left',
          'left-0 top-[calc(100%+10px)] translate-x-[-30%]':
            position === 'bottom-center',
          'left-0 top-[calc(100%+10px)]': position === 'bottom-right',
        }
      )}
    >
      {hasCloseButton && (
        <button
          type="button"
          aria-label="Close popover"
          onClick={() => {
            onClose();
          }}
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
  return <div className="p-3 text-start">{children}</div>;
}

export { PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger };
