import clsx from 'clsx';
import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  shape?: 'circle' | 'square';
  bgColor?: string; // 기본 배경색 (ex: 'bg-white')
  checkedBgColor?: string; // 체크됐을 때 배경색 (ex: 'bg-teal-200')
  borderColor?: string; // 테두리 색 (ex: 'border-blackAlpha-300')
  checkedBorderColor?: string; // 체크됐을 때 테두리 색
}

// TODO: 현재 background color는 teal-200으로 고정되어 있습니다. 이를 props로 받아서 변경할 수 있도록 추후 수정할 예정입니다.
export default function Checkbox({
  name,
  onChange,
  defaultChecked,
  children,
  shape = 'square',
  bgColor = 'bg-transparent',
  checkedBgColor = 'bg-teal-200',
  borderColor = 'border-blackAlpha-300 dark:border-whiteAlpha-300',
  checkedBorderColor = 'border-teal-200',
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
          'inline-flex size-4 select-none items-center justify-center border-2 align-top transition',
          shape === 'circle' ? 'rounded-full' : 'rounded-sm',
          defaultChecked
            ? [checkedBgColor, checkedBorderColor, 'text-gray-900']
            : [bgColor, borderColor]
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
