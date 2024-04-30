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
      className={clsx('w-full overflow-hidden px-4 transition-all', {
        'max-h-screen': isOpen,
        'max-h-0': !isOpen,
      })}
    >
      {children}
    </div>
  );
}
