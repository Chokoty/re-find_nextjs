import { useShallow } from 'zustand/react/shallow';

import { getCurrentDate } from '@/app/search/lib/date';
import { MIN_DATE } from '@/lib/const';
import { useDatePickerStore } from '@/store/datePickerStore';
import type { SelectHandleParams } from '@/types';

type Props = {
  handleClickOption: ({ value, startD, dueD }: SelectHandleParams) => void;
};

export default function DateRangePicker({ handleClickOption }: Props) {
  const { startDate, dueDate, setStartDate, setDueDate } = useDatePickerStore(
    useShallow((state) => ({
      startDate: state.startDate,
      dueDate: state.dueDate,
      setStartDate: state.setStartDate,
      setDueDate: state.setDueDate,
    }))
  );
  return (
    <li>
      <div className="border-t-base border-gray-300 px-4 py-3 dark:border-whiteAlpha-300">
        <span className="block pb-1.5">기간 입력</span>
        <input
          type="date"
          value={startDate}
          min={MIN_DATE}
          max={dueDate} // 시작 날짜는 종료 날짜를 초과할 수 없습니다
          onChange={(e) => setStartDate(e.target.value)}
          className="mr-1 w-[118px] border border-gray-300 bg-gray-100 pe-1 ps-1.5 text-sm dark:border-whiteAlpha-300 dark:bg-whiteAlpha-300"
        />
        <input
          type="date"
          value={dueDate}
          min={startDate} // 종료 날짜는 시작 날짜보다 이전일 수 없습니다
          max={getCurrentDate()} // 종료 날짜는 오늘 날짜를 초과할 수 없습니다
          onChange={(e) => setDueDate(e.target.value)}
          className="mr-1 w-[118px] border border-gray-300 bg-gray-100 pe-1 ps-1.5 text-sm dark:border-whiteAlpha-300 dark:bg-whiteAlpha-300"
        />
        <button
          type="button"
          className="w-[52px] rounded-md bg-green-highlight text-white transition hover:bg-green-600 active:bg-green-700 dark:bg-green-200 dark:text-gray-800 dark:hover:bg-green-300 dark:active:bg-green-400"
          onClick={() =>
            handleClickOption({
              value: 'custom',
              startD: startDate,
              dueD: dueDate,
            })
          }
        >
          설정
        </button>
      </div>
    </li>
  );
}
