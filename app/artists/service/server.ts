// 작가 정보가져오기
import axios from 'axios';

export const getAuthorInfo = async (nickname: string) => {
  const url = `${process.env.NEXT_PUBLIC_NEW_SERVER_URL}/v2/author?nick=${nickname}`;
  const response = await axios.get<AuthorOverview>(url);

  return response.data;
};
