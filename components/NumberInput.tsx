import clsx from 'clsx';
import React, { useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange?(valueAsString: string, valueAsNumber: number): void;
}

export default function NumberInput({
  defaultValue,
  min,
  max,
  handleChange,
}: NumberInputProps) {
  const [inputValue, setInputValue] = useState(defaultValue ?? '');

  const parsedMin = parseFloat(min as string);
  const parsedMax = parseFloat(max as string);
  const parsedInputValue = parseFloat(inputValue as string);

  const increaseValue = () => {
    if (parsedInputValue >= parsedMax) return;
    setInputValue((prevValue) =>
      (parseFloat(prevValue as string) + 1).toString()
    );
    handleChange?.('', parsedInputValue + 1);
  };

  const decreaseValue = () => {
    if (parsedInputValue <= parsedMin) return;
    setInputValue((prevValue) =>
      (parseFloat(prevValue as string) - 1).toString()
    );
    handleChange?.('', parsedInputValue - 1);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    const parsedValue = parseFloat(value);
    if (!Number.isNaN(parsedValue)) {
      handleChange?.(value, parsedValue);
    }
  };

  return (
    <div className="relative z-0 w-full max-w-[200px]">
      <input
        className="relative h-10 w-full min-w-0 appearance-none rounded-md border-base border-blackAlpha-300 bg-white pe-6 ps-4 align-top outline-transparent transition focus:outline-none focus:ring-2 dark:border-whiteAlpha-300 dark:bg-dark-card"
        type="text"
        inputMode="decimal"
        role="spinbutton"
        pattern="[0-9]*(.[0-9]+)?"
        value={inputValue}
        onChange={onChange}
        onBlur={() => {
          if (Number.isNaN(parsedInputValue)) {
            setInputValue(0);
            handleChange?.('', 0);
          }
          if (parsedInputValue > parsedMax) {
            setInputValue(parsedMax);
            handleChange?.('', parsedMax);
          } else if (parsedInputValue < parsedMin) {
            setInputValue(parsedMin);
            handleChange?.('', parsedMin);
          }
        }}
        min={min}
        max={max}
      />
      <div className="absolute right-0 top-0 z-[1] m-px flex h-[calc(100%-2px)] w-6 flex-col">
        <div
          role="button"
          tabIndex={-1}
          className={clsx(
            'flex flex-1 select-none items-center justify-center rounded-tr-md border-s-base border-blackAlpha-300 text-lg text-blackAlpha-800 transition dark:border-whiteAlpha-300 dark:text-whiteAlpha-800',
            {
              'cursor-not-allowed opacity-40': parsedInputValue >= parsedMax,
              'cursor-pointer': parsedInputValue < parsedMax,
            }
          )}
          onClick={increaseValue}
        >
          <TiArrowSortedUp className="inline-block align-middle" />
        </div>
        <div
          role="button"
          tabIndex={-1}
          className={clsx(
            '-mt-px flex flex-1 select-none items-center justify-center rounded-br-md border-s-base border-t-base border-blackAlpha-300 text-lg text-blackAlpha-800 transition dark:border-whiteAlpha-300 dark:text-whiteAlpha-800',
            {
              'cursor-not-allowed opacity-40': parsedInputValue <= parsedMin,
              'cursor-pointer': parsedInputValue > parsedMin,
            }
          )}
          onClick={decreaseValue}
        >
          <TiArrowSortedDown className="inline-block align-middle" />
        </div>
      </div>
    </div>
  );
}
