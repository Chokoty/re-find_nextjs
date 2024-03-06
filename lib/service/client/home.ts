import axios from 'axios';

// 이미지 정보 가져오기
export const getImageInfoByHash = async (value: string) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/receive?dhash=${value}`;
  const response = await axios.get<Source>(url);
  return response.data;
};

// 출처 총 개수 가져오기
export const getCounters = async () => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/counter`;
  const TIMEOUT = 2000;
  const response = await axios.get<Counter>(url, {
    timeout: TIMEOUT, // TODO: 필요한 이유 알아보기
  });
  return response.data;
};

// 최근 업데이트 게시물 가져오기
export const getRecentUpdateInfos = async () => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/last_update_info`;
  const response = await axios.get<RecentBoardData[]>(url);
  return response.data;
};
