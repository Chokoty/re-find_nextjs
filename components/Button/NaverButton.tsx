import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function NaverButton({
  children,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      // ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-[55px] w-full items-center rounded-md border bg-icon-naver px-2.5 text-white transition disabled:cursor-not-allowed disabled:opacity-75 dark:border-whiteAlpha-300 dark:bg-icon-naverDark dark:text-whiteAlpha-800 [&:not(:disabled):active]:bg-[#009f28] dark:[&:not(:disabled):active]:bg-whiteAlpha-100 [&:not(:disabled):hover]:bg-[#06bd34] dark:[&:not(:disabled):hover]:bg-black-200"
    >
      <span className="absolute block size-6">
        <svg
          className="fill-white dark:fill-[#06bd34]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"></path>
        </svg>
      </span>
      <span className="w-full font-semibold">{children}</span>
    </button>
  );
}
