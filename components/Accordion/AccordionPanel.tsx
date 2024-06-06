import clsx from 'clsx';
import React from 'react';

import { useAccordionItemContext } from '@/components/Accordion/AccordionItem';

type AccordionPanelProps = {
  children: React.ReactNode;
};

export function AccordionPanel({ children }: AccordionPanelProps) {
  const { isOpen } = useAccordionItemContext();
  return (
    <div
      // overflow-hidden를 주면 select가 하단에 있는경우 열면 컨텐츠가 숨겨지는 버그 > 제거
      className={clsx('w-full px-4 transition-all', {
        'max-h-screen opacity-100': isOpen,
        'max-h-0 overflow-hidden opacity-0': !isOpen,
      })}
    >
      {children}
    </div>
  );
}
