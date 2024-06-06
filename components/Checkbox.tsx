import clsx from 'clsx';
import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// TODO: 현재 background color는 teal-200으로 고정되어 있습니다. 이를 props로 받아서 변경할 수 있도록 추후 수정할 예정입니다.
export default function Checkbox({
  name,
  onChange,
  defaultChecked,
  children,
}: CheckboxProps) {
  return (
    <label className="relative inline-flex cursor-pointer items-center align-top">
      <input
        name={name}
        className="absolute -m-px size-0 overflow-hidden whitespace-nowrap border-0 border-none p-0"
        type="checkbox"
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
      <span
        className={clsx(
          'inline-flex size-4 select-none items-center justify-center rounded-sm border-2 border-blackAlpha-300 align-top transition dark:border-whiteAlpha-300',
          {
            'border-base border-teal-200 bg-teal-200 text-gray-900':
              defaultChecked,
          }
        )}
      >
        {defaultChecked && (
          <div className="flex h-full items-center justify-center">
            <FaCheck className="size-2.5 transition" />
          </div>
        )}
      </span>
      <span className="ms-2 select-none">{children}</span>
    </label>
  );
}
