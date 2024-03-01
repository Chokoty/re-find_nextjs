// 작가 정보가져오기
import axios from 'axios';

export const getAuthorInfo = async (nickname: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/author_name2info?name=${nickname}`
  );

  return response.data;
};
