import React from 'react';

import useModal from '@/hooks/useModal';
import type { OptionType } from '@/types/globals';

export default function SelectModal(props: Record<string, unknown>) {
  const { hide } = useModal();
  const options = props.options as OptionType[];
  const selected = props.selected as string;
  const onChange = props.onChange as (value: string) => void;
  const handleSelect = (value: string) => {
    onChange(value);
    hide();
  };

  // radio
  return (
    <section className="m-auto w-[300px] rounded-2xl bg-white shadow-md dark:bg-dark-card">
      <div className="flex size-full flex-col items-center justify-center overflow-y-auto break-keep rounded-2xl py-4 text-center text-sm 2xs:text-base">
        <ul
          // ref={selectRef}
          className="max-h-[410px] w-full bg-white text-start dark:bg-dark-card"
        >
          {options.map(({ value, label }) => (
            <li
              key={value}
              className="h-10 cursor-pointer border-b-base border-gray-300 px-4 text-sm leading-10 transition-all duration-300 last:border-none active:bg-blackAlpha-200  dark:border-whiteAlpha-300 dark:text-white dark:active:bg-whiteAlpha-300"
              onClick={() => handleSelect(value)}
            >
              <div className="flex items-center justify-between">
                <label htmlFor={`menu_select_radio_${value}`}>{label}</label>
                <input
                  id={`menu_select_radio_${value}`}
                  type="radio"
                  value=""
                  checked={value === selected}
                  name="default-radio"
                  className="size-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
