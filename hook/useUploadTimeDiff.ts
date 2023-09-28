import { useEffect, useState } from 'react';

export const useUploadTimeDiff = (writeDate: number): string => {
  const [uploadText, setUploadText] = useState('');

  useEffect(() => {
    const now = new Date();
    const nowUTC = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const nowKR = new Date(nowUTC + KR_TIME_DIFF);

    const uploadedDate = new Date(writeDate);

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
