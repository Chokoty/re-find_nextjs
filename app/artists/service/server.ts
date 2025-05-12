// 작가 정보가져오기 (서버 사이드 > 클라이언트 사이드)
import axios from 'axios';

export const getAuthorInfo = async (nickname: string) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/v2/author?nick=${nickname}`;
  const response = await axios.get<AuthorOverview>(url);

  return response.data;
};
