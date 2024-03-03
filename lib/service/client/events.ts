import type { CheckBoxType } from '@/types';
import axios from 'axios';

// 랜덤 팬아트 가져오기
export const getRandomFanart = async (checkboxValues: CheckBoxType) => {
  const queryParams = Object.keys(checkboxValues)
    .filter((key) => checkboxValues[key as keyof CheckBoxType])
    .join('&');
  const response = await axios.get<EventFanart>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/rand?${queryParams}`
  );

  return response.data;
};

// 이세계 페스티벌 작품 가져오기
export const getIsdArtworks = async () => {
  const response = await axios.get<EventFanart>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/isegye_festival`
  );

  return response.data;
};

// 키딩 작품 가져오기
export const getKidingArtworks = async () => {
  const response = await axios.get<EventFanart>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/third_album`
  );

  return response.data;
};

// 랜덤 가챠 버튼 클릭시 작품 가져오기
export const getUrlInfo = async (url: string) => {
  const response = await axios.get<EventFanart>(url);
  return response.data;
};
