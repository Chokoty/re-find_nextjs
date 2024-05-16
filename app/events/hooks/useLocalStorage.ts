'use client';

import { useState } from 'react';

import type { CheckBoxType, WaktyHallResultType } from '@/types';

type ValueType = CheckBoxType | WaktyHallResultType;
type Props = { key: string; initialValue: ValueType };
type SetValueFunction = (prevState: ValueType) => ValueType;

const useLocalStorage = ({ key, initialValue }: Props) => {
  const [state, setState] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      // 이미 저장된 값이 있다면 파싱해서 반환하고, 없다면 초기값을 반환한다.
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      // 에러가 발생하면 초기값을 반환한다.
      console.log(error);
    }
  });

  const setValue = (value: ValueType | SetValueFunction) => {
    try {
      // 만약 전달된 값이 콜백 함수라면, 기존 상태와 함께 호출한다.
      const valueToStore =
        typeof value === 'function'
          ? (value as SetValueFunction)(state)
          : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue] as const;
};

export default useLocalStorage;
