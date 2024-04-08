'use client';

import { useEffect, useState } from 'react';

// number to string
export const useUploadTimeDiff = (writeDate: string): string => {
  const [uploadText, setUploadText] = useState('');

  useEffect(() => {
    const now = new Date();
    const nowUTC = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const nowKR = new Date(nowUTC + KR_TIME_DIFF);
    // Intl.DateTimeFormat을 사용하여 현재 한국 시간을 구합니다.
    // const nowKRFormatter = new Intl.DateTimeFormat('ko-KR', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   timeZone: 'Asia/Seoul',
    // });
    // const nowKR2 = nowKRFormatter.format(new Date());

    // console.log(nowKR2);
    // console.log(nowKR);

    // const uploadedDate = new Date(writeDate);

    const parts = writeDate.split(/[\s.:]+/);
    // console.log(parts);
    // if (parts.length >= 5) {
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);
    const hour = parseInt(parts[3]);
    const minute = parseInt(parts[4]);
    const date = new Date(year, month, day, hour, minute);

    // console.log(date);
    const uploadedDate = date;

    const timeDifference = nowKR.getTime() - uploadedDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const monthsDifference = Math.floor(daysDifference / 30);
    const yearsDifference = Math.floor(daysDifference / 365);

    let uploadTextTemp = '';

    if (yearsDifference >= 1) {
      uploadTextTemp = `${yearsDifference}년 전`;
    } else if (monthsDifference >= 1) {
      uploadTextTemp = `${monthsDifference}달 전`;
    } else if (daysDifference >= 1) {
      uploadTextTemp = `${daysDifference}일 전 `;
    } else if (hoursDifference >= 1) {
      uploadTextTemp = `${hoursDifference}시간 전 `;
    } else if (minutesDifference >= 1) {
      uploadTextTemp = `${minutesDifference}분 전 `;
    }
    setUploadText(uploadTextTemp);
  }, [writeDate]);

  return uploadText;
};
