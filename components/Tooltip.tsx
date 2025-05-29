'use client';

import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  label: string;
  delay?: number;
  position?: 'bottom-center' | 'left-center' | 'top-center' | 'right-center';
  fontSize?: string;
  forceHide?: boolean;
};

export default function Tooltip({
  children,
  label,
  position = 'bottom-center',
  delay = 100,
  fontSize = 'text-sm',
  forceHide = false,
}: Props) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState<DOMRect | null>(null);
  const delayTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setCoords(event.currentTarget.getBoundingClientRect());
    delayTimeout.current = setTimeout(() => setShow(true), delay);
  };

  const handleMouseLeave = () => {
    if (delayTimeout.current) clearTimeout(delayTimeout.current);
    setShow(false);
  };

  useEffect(() => {
    if (forceHide && show) {
      setShow(false);
      if (delayTimeout.current) clearTimeout(delayTimeout.current);
    }
  }, [forceHide]);

  const tooltipStyles = () => {
    if (!coords) return {};
    switch (position) {
      case 'bottom-center':
        return {
          top: coords.bottom + window.scrollY + 8,
          left: coords.left + coords.width / 2 + window.scrollX,
          transform: 'translateX(-50%)',
        };
      case 'top-center':
        return {
          top: coords.top + window.scrollY - 8,
          left: coords.left + coords.width / 2 + window.scrollX,
          transform: 'translateX(-50%) translateY(-100%)',
        };
      case 'left-center':
        return {
          top: coords.top + coords.height / 2 + window.scrollY,
          left: coords.left + window.scrollX - 8,
          transform: 'translateX(-100%) translateY(-50%)',
        };
      case 'right-center':
        return {
          top: coords.top + coords.height / 2 + window.scrollY,
          left: coords.right + window.scrollX + 8,
          transform: 'translateY(-50%)',
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative inline-block" aria-label="A tooltip">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
      >
        {children}
      </div>

      {show &&
        coords &&
        createPortal(
          <div
            className={clsx(
              'fixed z-[9999] min-w-max rounded-md bg-[#282828] px-2 py-1 text-white shadow-lg transition-opacity duration-200 ease-out',
              fontSize
            )}
            style={tooltipStyles()}
          >
            {label}
          </div>,
          document.body
        )}
    </div>
  );
}
