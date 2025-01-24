import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  label: string;
  hasArrow?: boolean;
  bg?: string;
  color?: string;
  position?: 'bottom-center' | 'left-center' | 'top-center' | 'right-center';
};

export default function Tooltip({
  children,
  label,
  position = 'bottom-center',
}: Props) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState<DOMRect | null>(null);
  const delayTimeout = useRef<NodeJS.Timeout | null>(null); // To store the timeout ID

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setCoords(event.currentTarget.getBoundingClientRect());
    delayTimeout.current = setTimeout(() => setShow(true), 300); // 300ms delay
  };

  const handleMouseLeave = () => {
    if (delayTimeout.current) {
      clearTimeout(delayTimeout.current); // Clear timeout if the mouse leaves before delay ends
    }
    setShow(false);
  };

  const handleTooltipClick = () => {
    setShow(false); // Close the tooltip when clicked
  };

  useEffect(() => {
    return () => {
      if (delayTimeout.current) clearTimeout(delayTimeout.current);
    };
  }, []);

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
            onClick={handleTooltipClick}
            className={clsx(
              'fixed z-[9999] rounded-sm bg-gray-125 px-2 py-1 text-sm text-gray-900 shadow-lg transition-opacity duration-300 ease-out',
              {
                'opacity-100': show,
                'opacity-0': !show,
              }
            )}
            style={{
              ...tooltipStyles(),
              minWidth: 'max-content',
            }}
          >
            {label}
          </div>,
          document.body
        )}
    </div>
  );
}

// import clsx from 'clsx';
// import React, { useState } from 'react';

// type Props = {
//   children: React.ReactNode;
//   label: string;
//   hasArrow?: boolean;
//   bg?: string;
//   color?: string;
//   // 가운데 아래, 가운데 왼쪽, 가운데 위, 가운데 오른쪽
//   position?: 'bottom-center' | 'left-center' | 'top-center' | 'right-center';
// };
// // TODO: hasArrow, bg, color 적용 필요
// export default function Tooltip({
//   children,
//   label,
//   position = 'bottom-center',
//   // hasArrow = false,
//   // bg = 'gray-150', // tailwind에서 ${}를 사용하려면 변수를 사용해야함
//   // color = 'black',
// }: Props) {
//   const [show, setShow] = useState(false);

//   const handleMouseEnter = () => {
//     setShow(true);
//   };

//   const handleMouseLeave = () => {
//     setShow(false);
//   };

//   return (
//     <div className="relative inline-block transition" aria-label="A tooltip">
//       <div
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         // className="cursor-pointer"
//       >
//         {children}
//       </div>
//       <div
//         className={clsx(
//           'absolute z-[1000] rounded-sm bg-gray-125 px-2 py-1 text-sm text-gray-900 transition-all duration-200 ease-out',
//           {
//             'visible scale-100 opacity-100': show,
//             'invisible scale-125 opacity-0': !show,
//             'left-1/2 top-[110%] -translate-x-1/2':
//               position === 'bottom-center',
//             'right-full top-1/2 mr-2 -translate-y-1/2 translate-x-0':
//               position === 'left-center',
//           }
//         )}
//         style={{
//           minWidth: 'max-content',
//         }}
//       >
//         {label}
//         {/* {hasArrow && (
//             <div
//               className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-0 border-5 border-gray-125-transparent`}
//             ></div>
//           )} */}
//       </div>
//     </div>
//   );
// }
