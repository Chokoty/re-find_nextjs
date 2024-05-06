import clsx from 'clsx';
import React from 'react';

import { useAccordionItemContext } from '@/components/Accordion/AccordionItem';

type AccordionButtonTypeProps = 'filter' | 'notFound';

type AccordionButtonProps = {
  type?: AccordionButtonTypeProps;
  children: React.ReactNode;
};

export function AccordionButton({
  children,
  type = 'notFound',
}: AccordionButtonProps) {
  const { onToggle } = useAccordionItemContext();
  return (
    <button
      type="button"
      className={clsx(
        'flex items-center justify-center gap-1 rounded-lg py-1.5 pl-3 pr-2 text-center text-base transition hover:bg-blackAlpha-100 active:bg-blackAlpha-200 dark:hover:bg-whiteAlpha-100 dark:active:bg-whiteAlpha-300',
        {
          'mr-2 w-auto font-medium text-gray-900 dark:text-gray-50':
            type === 'filter',
          'w-full font-bold text-red-500': type !== 'filter',
        }
      )}
      onClick={onToggle}
    >
      {children}
    </button>
  );
}
