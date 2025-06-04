'use client';

import type { OverlayScrollbars } from 'overlayscrollbars';
import type {
  OverlayScrollbarsComponentProps,
  OverlayScrollbarsComponentRef,
} from 'overlayscrollbars-react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { type ReactNode, useRef, useState } from 'react';

import BackToTopButton from '@/components/Button/BackToTopButton';

interface CustomScrollContainerProps
  extends Omit<OverlayScrollbarsComponentProps, 'ref' | 'children'> {
  children: ReactNode;
  className?: string;
  threshold?: number;
  autoHideDelay?: number;
}

export default function CustomScrollContainer({
  children,
  className = '',
  options,
  events,
  threshold = 300,
  autoHideDelay = 500,
  ...rest
}: CustomScrollContainerProps) {
  const scrollContainerRef = useRef<OverlayScrollbarsComponentRef>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  // OverlayScrollbarsComponent의 scroll 이벤트에서 back to top 버튼 제어
  const handleScroll = (osInstance: OverlayScrollbars) => {
    const scrollElement = osInstance.elements().viewport;
    if (scrollElement) {
      const { scrollTop } = scrollElement;
      setIsBackToTopVisible(scrollTop > threshold);
    }
  };

  return (
    <div className="relative size-full">
      <OverlayScrollbarsComponent
        defer
        element="div"
        ref={scrollContainerRef}
        className={className}
        options={{
          overflow: { x: 'hidden', y: 'scroll' },
          scrollbars: {
            theme: 'os-theme-custom',
            visibility: isHovered ? 'visible' : 'auto',
            autoHide: isHovered ? 'never' : 'scroll',
            autoHideDelay,
          },
          ...options,
        }}
        events={{
          ...events,
          scroll: handleScroll,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...rest}
      >
        {children}
      </OverlayScrollbarsComponent>

      {isBackToTopVisible && (
        <BackToTopButton scrollContainerRef={scrollContainerRef} />
      )}
    </div>
  );
}
