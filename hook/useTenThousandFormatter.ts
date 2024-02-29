'use client';

import { useEffect, useState } from 'react';

const useTenThousandFormatter = (number: number): string => {
  const [formattedNumber, setFormattedNumber] = useState<string>('');

  useEffect(() => {
    if (number >= 10000) {
      // 숫자가 1만 이상일 때 "만" 단위로 포맷팅
      setFormattedNumber(`${(number / 10000).toFixed(1)}만`);
    } else {
      // 그 외의 경우 숫자를 문자열로 변환
      setFormattedNumber(number.toString());
    }
  }, [number]);

  return formattedNumber;
};

export default useTenThousandFormatter;
// 컴포넌트에서 못쓴다..
