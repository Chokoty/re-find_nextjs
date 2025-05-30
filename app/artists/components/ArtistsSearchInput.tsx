'use client';

import clsx from 'clsx';
import React, { useState } from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { IoIosCloseCircle } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { useDebounce } from 'react-use';
import { useShallow } from 'zustand/react/shallow';

import { useArtistSearchInfoStore } from '@/app/artists/store/artistSearchInfoStore';
import Popover, {
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@/components/Popover';

export default function ArtistsSearchInput() {
  const [input, setInput] = useState('');
  const { setDebounceValue } = useArtistSearchInfoStore(
    useShallow((state) => ({
      setDebounceValue: state.setDebounceValue,
    }))
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClearInputText = () => {
    setInput('');
  };

  useDebounce(
    () => {
      setDebounceValue(input);
    },
    600,
    [input]
  );

  const isInputNotEmpty = input.length > 0;
  return (
    <div className="relative h-10 w-full max-w-[400px]">
      <div className="absolute left-1 top-0 z-[2] flex h-full w-10 items-center justify-center">
        <IoSearchOutline
          className={clsx('size-5', {
            'text-green-highlight': isInputNotEmpty,
            'text-gray-600 dark:text-whiteAlpha-500': !isInputNotEmpty,
          })}
        />
      </div>
      <input
        className="relative size-full cursor-text rounded-full border border-gray-200 bg-gray-100 pl-12 pr-14 outline-none transition placeholder:text-gray-500 hover:border-green-highlight hover:bg-white focus:border-green-highlight focus:outline-none focus:ring-1 focus:ring-green-highlight dark:border-whiteAlpha-300 dark:bg-whiteAlpha-200 dark:placeholder:text-whiteAlpha-600 dark:hover:bg-dark-card 2xs:pr-24"
        placeholder="왁물원 닉네임"
        value={input}
        onChange={handleSearch}
      />
      <div className="absolute right-0 top-0 z-[2] flex h-full items-center justify-end pr-4">
        {isInputNotEmpty ? (
          <button
            type="button"
            className="flex size-6 items-center justify-center"
            onClick={handleClearInputText}
          >
            <IoIosCloseCircle className="size-5 text-gray-600 dark:text-whiteAlpha-700" />
          </button>
        ) : (
          <Popover>
            <PopoverTrigger>
              <BsFillQuestionCircleFill className="size-4 text-blackAlpha-600 dark:text-whiteAlpha-600" />
            </PopoverTrigger>
            <PopoverContent size="sm" hasCloseButton={false}>
              <PopoverBody>대소문자는 구분됩니다.</PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
