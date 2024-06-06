'use client';

import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useShallow } from 'zustand/react/shallow';

import DateRangePicker from '@/components/Select/DateRangePicker';
import SelectModal from '@/components/Select/SelectModal';
import useModal from '@/hooks/useModal';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useResponsive } from '@/hooks/useResponsive';
import { useDatePickerStore } from '@/store/datePickerStore';
import type { OptionType, SelectHandleParams } from '@/types';

type Props = {
  selected: string;
  disabled?: boolean;
  options: OptionType[];
  onChange: (value: string, date?: string) => void;
};

/**
 * select -> ul / option -> li
 */
export default function Select({
  disabled,
  options,
  selected,
  onChange,
}: Props) {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const innerContentRef = useRef<HTMLUListElement>(null);
  const isMobile = useResponsive();
  const { show } = useModal(SelectModal);
  // 단순히 label을 표시하기 위함
  const { startDate, dueDate } = useDatePickerStore(
    useShallow((state) => ({
      startDate: state.startDate,
      dueDate: state.dueDate,
    }))
  );
  // SelectModal에서 date가 업데이트되면 여기서 이전 데이터가 유지되는 버그(모바일)때문에 넘겨 받습니다.
  const handleSelect = ({ value, startD, dueD }: SelectHandleParams) => {
    const isCustomDate = value === 'custom';
    if (isCustomDate) {
      if (startD === '' || dueD === '') {
        alert('시작 날짜와 종료 날짜를 정확히 기입해주세요.');
        return;
      }
      const start = startD.split('-').join('');
      const due = dueD.split('-').join('');
      const customPriod = `&since=${start}&until=${due}`;
      onChange(value, customPriod);
    } else {
      onChange(value);
    }
  };
  const handleClickOption = ({ value, startD, dueD }: SelectHandleParams) => {
    handleSelect({ value, startD, dueD });
    onClose();
  };

  const handleSelectButtonClick = () => {
    if (isMobile) {
      show({
        isBackdropClick: true,
        options,
        selected,
        handleSelect,
      });
      return;
    }
    onToggle();
  };

  const onToggle = () => {
    setVisible((prev) => !prev);
  };
  const onClose = (e?: Event) => {
    const buttonEl = buttonRef?.current;
    const isButton =
      buttonEl === e?.target || buttonEl?.contains(e?.target as Node);
    if (isButton) return;

    setVisible(false);
  };
  useOnClickOutside(innerContentRef, (e) => {
    onClose(e);
  });

  const selectedLabel = options.find(
    (option) => option.value === selected
  )?.label;
  const liLabel =
    selected === 'custom' ? `${startDate} ~ ${dueDate}` : selectedLabel;

  return (
    <div className="relative inline-block h-9 w-full text-start">
      {/* select box */}
      <button
        ref={buttonRef}
        disabled={disabled}
        onClick={handleSelectButtonClick}
        className={clsx(
          'relative block h-[40px] w-full appearance-none border-base border-blackAlpha-300 bg-white pb-px pe-8 ps-4 text-start outline-transparent transition focus:outline-none focus:ring-2 dark:border-whiteAlpha-300 dark:bg-dark-card',
          {
            'cursor-not-allowed opacity-40': disabled,
            'rounded-t-md': visible,
            'rounded-md': !visible,
          }
        )}
      >
        {liLabel}
        <div
          className={clsx(
            'pointer-events-none absolute right-2 top-1/2 inline-flex h-full w-6 -translate-y-1/2 items-center justify-center text-xl text-current transition',
            {
              'rotate-180': visible,
              'opacity-50': disabled,
            }
          )}
        >
          <IoIosArrowDown className="size-4" />
        </div>
      </button>
      {/* select list
       * 8개 넘어가면 스크롤
       */}
      <ul
        ref={innerContentRef}
        className={`absolute top-[39px] z-10 max-h-[300px] w-full overflow-y-auto rounded-b-md border-base border-blackAlpha-300 bg-white shadow-md dark:border-whiteAlpha-300 dark:bg-dark-card ${visible ? 'block' : 'hidden'}`}
      >
        {options.map(({ value, label, hasCustomDateRangePicker }) =>
          !hasCustomDateRangePicker ? (
            <li
              key={value}
              className={clsx(
                'h-9 cursor-pointer pe-8 ps-4 text-sm leading-9 transition hover:bg-green-100 hover:text-green-highlight hover:underline active:bg-green-200 dark:text-white dark:hover:bg-[#01BFA2] dark:active:bg-[#01bfa2b0]'
                // {
                //   'bg-green-300 text-white': value === selected,
                // }
              )}
              onClick={() => handleClickOption({ value, startD: '', dueD: '' })}
            >
              {label}
            </li>
          ) : (
            //  date input area
            <DateRangePicker
              key={value}
              handleClickOption={handleClickOption}
            />
          )
        )}
      </ul>
    </div>
  );
}
