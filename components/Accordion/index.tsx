'use client';

import React, { useState } from 'react';

type Props = {
  // 단일 또는 다수의 AccordionItem 허용
  children:
    | React.ReactElement<AccordionItemProps>[]
    | React.ReactElement<AccordionItemProps>;
  initOpen?: boolean;
};

export type AccordionItemProps = {
  children:
    | React.ReactNode
    | ((props: { isExpanded: boolean }) => React.ReactNode);
  hasBorder?: boolean;
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

export { AccordionButton } from '@/components/Accordion/AccordionButton';
export { AccordionItem } from '@/components/Accordion/AccordionItem';
export { AccordionPanel } from '@/components/Accordion/AccordionPanel';
