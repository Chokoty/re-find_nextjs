import { getCurrentDate } from '@/app/search/lib/date';
import { create } from 'zustand';

type DatePickerStore = {
  startDate: string;
  dueDate: string;
  // set methods
  setStartDate: (date: string) => void;
  setDueDate: (date: string) => void;
};

export const useDatePickerStore = create<
  DatePickerStore,
  [['zustand/devtools', DatePickerStore]]
>((set) => ({
  startDate: getCurrentDate(),
  dueDate: getCurrentDate(),
  setStartDate: (date: string) => set({ startDate: date }),
  setDueDate: (date: string) => set({ dueDate: date }),
}));
