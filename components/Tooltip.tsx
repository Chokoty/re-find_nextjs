import clsx from 'clsx';
import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
  label: string;
  hasArrow?: boolean;
  bg?: string;
  color?: string;
};
// TODO: hasArrow, bg, color 적용
export default function Tooltip({
  children,
  label,
  // hasArrow = false,
  // bg = 'gray-150', // tailwind에서 ${}를 사용하려면 변수를 사용해야함
  // color = 'black',
}: Props) {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
    <div className="relative inline-block transition" aria-label="A tooltip">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // className="cursor-pointer"
      >
        {children}
      </div>
      <div
        className={clsx(
          'absolute left-1/2 top-[110%] z-[1000] -translate-x-1/2 rounded-sm bg-gray-125 px-2 py-1 text-sm text-gray-900 transition-all duration-200 ease-out',
          {
            'visible scale-100 opacity-100': show,
            'invisible scale-125 opacity-0': !show,
          }
        )}
        style={{
          minWidth: 'max-content',
        }}
      >
        {label}
        {/* {hasArrow && (
            <div
              className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-0 border-5 border-gray-125-transparent`}
            ></div>
          )} */}
      </div>
    </div>
  );
}
