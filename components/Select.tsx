import clsx from 'clsx';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder: string;
}

export default function Select({
  placeholder,
  disabled,
  children,
  onChange,
  defaultValue,
}: SelectProps) {
  return (
    <div className="relative h-fit w-full">
      <select
        className={clsx(
          'h-10 w-full min-w-0 appearance-none rounded-md border-base border-blackAlpha-300 bg-white pb-px pe-8 ps-4 outline-transparent transition *:bg-blackAlpha-100 *:text-gray-900 focus:outline-none focus:ring-2 dark:border-whiteAlpha-300 dark:bg-dark-card dark:*:bg-whiteAlpha-200 dark:*:text-white',
          {
            'cursor-not-allowed opacity-40': disabled,
          }
        )}
        disabled={disabled}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
      <div
        className={clsx(
          'pointer-events-none absolute right-2 top-1/2 inline-flex h-full w-6 -translate-y-1/2 items-center justify-center text-xl text-current',
          {
            'opacity-50': disabled,
          }
        )}
      >
        <IoIosArrowDown className="size-4" />
      </div>
    </div>
  );
}
