'use client';

import React, { useState } from 'react';
import { BsQuestionLg } from 'react-icons/bs';
import { FaDice } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';

import Fanart from '@/app/events/components/RandomGacha/Fanart';
import { useRandomFanart } from '@/app/events/service/client/useEventService';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Popover, {
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@/components/Popover';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { CheckBoxType } from '@/types';

const initCheckboxValues = {
  isd: true,
  woowakgood: true,
  gomem: true,
};

export default function RandomFanart() {
  const [value, setValue] = useLocalStorage({
    key: 'checkboxValues',
    initialValue: initCheckboxValues,
  });

  const [checkboxValues, setCheckboxValues] = useState<CheckBoxType>(value);

  const { data, isLoading, isFetching, refetch, status } =
    useRandomFanart(checkboxValues);

  const showRandomFanart = async () => {
    // disabled에서 막혀야하지만 이렇게도 막을 수 있음
    if (isFetching) return;
    await refetch();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCheckboxValues = {
      ...checkboxValues,
      [e.target.name]: e.target.checked,
    };

    // 체크된 체크박스의 개수를 확인
    const checkedCount = Object.values(updatedCheckboxValues).filter(
      Boolean
    ).length;

    // 체크된 체크박스가 하나만 남았고, 사용자가 그 체크박스의 체크를 해제하려고 할 때
    if (checkedCount === 0 && !e.target.checked) {
      return; // 체크 해제를 방지하고 함수를 종료
    }

    setCheckboxValues(updatedCheckboxValues);

    // 로컬 스토리지에 체크박스 값 저장하기
    setValue(updatedCheckboxValues);
  };

  return (
    <div className="mx-auto mt-8 flex min-h-[120px] w-full max-w-[540px] flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-cardBox dark:bg-dark-card">
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-bold">왁타버스 팬아트 랜덤 가챠</p>
        <Popover>
          <PopoverTrigger size="lg">
            <IoSettingsSharp className="size-5 text-blackAlpha-600 dark:text-whiteAlpha-600" />
          </PopoverTrigger>
          <PopoverContent hasCloseButton>
            <PopoverHeader>
              <h5 className="mb-1.5 text-center font-bold">
                랜덤가챠 게시판 포함/제외하기
              </h5>
              <div className="flex items-center justify-center gap-3">
                <Checkbox
                  name="isd"
                  onChange={handleCheckboxChange}
                  defaultChecked={checkboxValues.isd}
                >
                  이세돌
                </Checkbox>
                <Checkbox
                  name="woowakgood"
                  onChange={handleCheckboxChange}
                  defaultChecked={checkboxValues.woowakgood}
                >
                  우왁굳
                </Checkbox>
                <Checkbox
                  name="gomem"
                  onChange={handleCheckboxChange}
                  defaultChecked={checkboxValues.gomem}
                >
                  고멤/고카
                </Checkbox>
              </div>
            </PopoverHeader>
            <PopoverBody>
              간혹 제외한 게시판에서의 팬아트가 뽑힐 수 있습니다 (짝! 그래서
              재밌는 거에요~)
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
      <Fanart
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={status === 'error'}
        loadingContent={<BsQuestionLg className="size-14" />}
      />
      <Button
        additionalClass="rounded-full pe-8 ps-8"
        onClick={showRandomFanart}
        disabled={isFetching} // 여러 번 클릭시 중복 요청 방지
      >
        <FaDice className="mr-2 size-5" />
        랜덤가챠 굴리기
      </Button>
    </div>
  );
}
