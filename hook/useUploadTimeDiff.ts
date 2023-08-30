import { useEffect, useState } from 'react';

export function useUploadTimeDifference(writeDate: number): string {
  const [uploadText, setUploadText] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const date = new Date(writeDate);
    const timeDifference = currentDate.getTime() - date.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    if (daysDifference >= 365) {
      const yearsDifference = Math.floor(daysDifference / 365);
      setUploadText(`${yearsDifference}년 전 업로드`);
    } else if (daysDifference >= 30) {
      const monthsDifference = Math.floor(daysDifference / 30);
      setUploadText(`${monthsDifference}달 전 업로드`);
    } else if (daysDifference > 0) {
      setUploadText(`${daysDifference}일 전 업로드`);
    } else {
      setUploadText(`${hoursDifference}시간 전 업로드`);
    }
  }, [writeDate]);

  return uploadText;
}
