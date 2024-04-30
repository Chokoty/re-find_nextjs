import clsx from 'clsx';
import React, { createContext, useEffect, useRef, useState } from 'react';

import Button, { type ButtonProps } from '@/components/Button';

type IconSpacingType = 'auto' | number;

interface MenuButtonProps extends ButtonProps {
  iconSpacing?: IconSpacingType;
  rightIcon?: React.ReactNode;
  rightMobileIcon?: React.ReactNode;
}

type MenuContextType = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  popoverRef: React.RefObject<HTMLDivElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
};

const MenuContext = createContext<MenuContextType>({
  isOpen: false,
  onToggle: () => {},
  onClose: () => {},
  popoverRef: { current: null },
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
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onToggle = () => {
    setIsOpen(!isOpen);
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
    <MenuContext.Provider
      value={{ isOpen, onToggle, onClose, popoverRef, buttonRef }}
    >
      <div className="relative flex h-fit">{children}</div>
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
      additionalClass="min-w-4 select-none appearance-none items-center justify-center rounded-full bg-gray-100 font-semibold text-blackAlpha-900 transition hover:bg-gray-200 active:bg-gray-300 dark:bg-whiteAlpha-200 dark:text-whiteAlpha-900 dark:hover:bg-whiteAlpha-300 dark:active:bg-whiteAlpha-400 gap-2"
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
  const { isOpen, popoverRef } = useMenuContext();
  return (
    <div
      ref={popoverRef}
      className={clsx(
        'absolute right-0 z-[4] min-w-max rounded-md border-base border-gray-200 bg-white transition dark:border-whiteAlpha-300 dark:bg-black-200',
        {
          'visible top-[calc(100%+10px)] opacity-100': isOpen,
          'invisible opacity-0': !isOpen,
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
            'visible opacity-100': isOpen,
            'invisible opacity-0': !isOpen,
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
