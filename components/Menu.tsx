import clsx from 'clsx';
import React, { createContext, useEffect, useRef, useState } from 'react';

import Button, { type ButtonProps } from '@/components/Button';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

type IconSpacingType = 'auto' | number;

interface MenuButtonProps extends ButtonProps {
  iconSpacing?: IconSpacingType;
  rightIcon?: React.ReactNode;
  rightMobileIcon?: React.ReactNode;
}

type MenuContextType = {
  visible: boolean;
  onToggle: () => void;
  onClose: (e?: Event) => void;
  innerContentRef: React.RefObject<HTMLDivElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
};

const MenuContext = createContext<MenuContextType>({
  visible: false,
  onToggle: () => {},
  onClose: () => {},
  innerContentRef: { current: null },
  buttonRef: { current: null },
});

export const useMenuContext = () => {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error(
      'Menu 하위 컴포넌트를 사용하려면 부모 컴포넌트로 <Menu>가 있어야 합니다.'
    );
  }
  return context;
};

export default function Menu({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
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
    <MenuContext.Provider
      value={{ visible, onToggle, onClose, innerContentRef, buttonRef }}
    >
      <div className="relative flex h-fit" aria-label="메뉴">
        {children}
      </div>
    </MenuContext.Provider>
  );
}

function MenuButton({
  intent,
  rightIcon,
  rightMobileIcon,
  children,
}: MenuButtonProps) {
  const { onToggle, buttonRef } = useMenuContext();
  return (
    <Button
      ref={buttonRef}
      intent={intent}
      additionalClass="min-w-4 select-none appearance-none items-center justify-center rounded-full bg-gray-100 font-semibold text-blackAlpha-900 transition dark:bg-whiteAlpha-200 hover:bg-gray-200 active:bg-gray-300 dark:text-whiteAlpha-900 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400 gap-2"
      onClick={onToggle}
    >
      <span className="pointer-events-none hidden sm:block">{children}</span>
      {rightIcon && (
        <span className="hidden size-4 sm:inline-flex">{rightIcon}</span>
      )}
      {rightMobileIcon && (
        <span className="size-4 sm:hidden">{rightMobileIcon}</span>
      )}
    </Button>
  );
}

function MenuList({ children }: { children: React.ReactNode }) {
  const { visible, onClose, innerContentRef } = useMenuContext();
  useOnClickOutside(innerContentRef, (e) => {
    onClose(e);
  });
  return (
    <div
      ref={innerContentRef}
      className={clsx(
        'absolute right-0 z-[4] min-w-max rounded-md border-base border-gray-200 bg-white transition dark:border-whiteAlpha-300 dark:bg-black-200',
        {
          'visible top-[calc(100%+10px)] scale-100 opacity-100': visible,
          'invisible scale-90 opacity-0': !visible,
        }
      )}
    >
      <div
        role="menu"
        tabIndex={-1}
        aria-label="vertical"
        className={clsx(
          'min-w-56 rounded-md border-base border-gray-200 bg-white py-2 shadow-cardBox transition dark:border-whiteAlpha-300 dark:bg-black-200',
          {
            'visible opacity-100': visible,
            'invisible opacity-0': !visible,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
}

type MenuItemType = {
  onClick: () => void;
  children: React.ReactNode;
};

function MenuItem({ onClick, children }: MenuItemType) {
  const { onClose } = useMenuContext();
  const handleClick = () => {
    onClick();
    onClose();
  };
  return (
    <button
      type="button"
      role="menuitem"
      className="flex w-full select-none items-center py-1.5 pe-3 ps-3 text-start transition hover:bg-gray-100 dark:hover:bg-whiteAlpha-200"
      tabIndex={-1}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export { MenuButton, MenuItem, MenuList };
