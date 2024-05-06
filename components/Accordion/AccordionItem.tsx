import clsx from 'clsx';
import React, { createContext } from 'react';

type AccordionItemProps = {
  children:
    | React.ReactNode
    | ((props: { isExpanded: boolean }) => React.ReactNode);
  hasBorder?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
};

type AccordionItemContextType = {
  isOpen?: boolean;
  onToggle?: () => void;
};

const AccordionItemContext = createContext<AccordionItemContextType>({
  isOpen: false,
  onToggle: () => {},
});

export const useAccordionItemContext = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem 하위컴포넌트를 사용하려면 부모 컴포넌트로 <Accordion>이 있어야 합니다.'
    );
  }
  return context;
};

export function AccordionItem({
  children,
  isOpen,
  hasBorder = true,
  onToggle,
}: AccordionItemProps) {
  const isFunctionChild = typeof children === 'function';
  return (
    <AccordionItemContext.Provider value={{ isOpen, onToggle }}>
      <div
        className={clsx(
          'w-full border-t border-gray-200 last:border-b dark:border-whiteAlpha-300',
          {
            'border-none': !hasBorder,
          }
        )}
      >
        {isFunctionChild
          ? (children as (props: { isExpanded: boolean }) => React.ReactNode)({
              isExpanded: isOpen ?? false,
            })
          : children}
      </div>
    </AccordionItemContext.Provider>
  );
}
