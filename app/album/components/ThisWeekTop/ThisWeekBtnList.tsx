'use client';

import clsx from 'clsx';

import { BUTTON_LIST } from '@/app/album/lib/const';
import Button from '@/components/Button';

type Props = {
  range: { start: number; end: number };
  selected: string | null;
  setSelected: ((value: string) => void) | null;
  isdPick: boolean;
};
export default function ThisWeekBtnList({
  range,
  selected,
  setSelected,
}: Props) {
  const onClick = (value: string) => {
    if (setSelected) {
      setSelected(value);
    }
  };

  return (
    <ul className="mb-3 flex w-full max-w-[680px] flex-wrap items-center justify-start gap-2 px-8 md:mb-5">
      {BUTTON_LIST.slice(range.start, range.end).map((item) => (
        <Button
          key={item}
          size="sm"
          additionalClass={clsx(
            'rounded-full text-sm sm:h-9 sm:min-h-9 sm:pe-4 sm:ps-4 sm:text-base',
            {
              'text-black bg-green-highlight font-medium hover:bg-teal-500 active:bg-teal-600 dark:bg-pink-highlight dark:hover:bg-pink-400 dark:active:bg-pink-500':
                selected === item,
              'text-black bg-blackAlpha-200 font-normal hover:bg-blackAlpha-500 active:bg-blackAlpha-600 dark:bg-whiteAlpha-200 dark:text-white dark:hover:bg-whiteAlpha-500 dark:active:bg-whiteAlpha-600':
                selected !== item,
            }
          )}
          onClick={() => onClick(item)}
        >
          {item}
        </Button>
      ))}
    </ul>
  );
}
