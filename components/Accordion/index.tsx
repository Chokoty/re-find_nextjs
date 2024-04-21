'use client';

import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { cn } from '@/lib/common';

type Props = {
  // 단일 또는 다수의 AccordionItem 허용
  children:
    | React.ReactElement<AccordionItemProps>[]
    | React.ReactElement<AccordionItemProps>;
  initOpen?: boolean;
};

export type AccordionItemProps = {
  children: React.ReactNode;
  title: string;
  isOpen?: boolean;
  onToggle?: () => void;
};

export default function Accordion({ children, initOpen = false }: Props) {
  const [activeIndex, setActiveIndex] = useState(initOpen ? 0 : null);

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="mt-4 w-full">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isOpen: activeIndex === index,
          onToggle: () => handleToggle(index),
        })
      )}
    </div>
  );
}

export function AccordionItem({
  children,
  title,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="w-full border-t border-gray-200 last:border-b dark:border-whiteAlpha-300">
      <button
        type="button"
        className="flex w-full items-center px-4 py-2 hover:bg-blackAlpha-50"
        onClick={onToggle}
      >
        <p className="flex-1 text-center text-base font-bold text-red-500">
          {title}
        </p>
        <IoIosArrowDown
          size="17"
          className={cn('transition', isOpen && 'rotate-180')}
        />
      </button>
      <div
        className={cn(
          'max-h-0 w-full overflow-hidden px-4 transition-all',
          isOpen && 'max-h-screen'
        )}
      >
        {children}
      </div>
    </div>
  );
}
