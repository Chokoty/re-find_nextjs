import axios from 'axios';

// 역대 작가 리스트 가져오기
// 아래처럼 lastpage를 받고 page를 주는 형태로 변경 요청
export const getAuthorList = async () => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/author_list`;
  const response = await axios.get<AuthorList>(url);

  return response.data;
};

// 작가의 작품들 가져오기
// {"lastPage": true, "list": []}
export const getArtistInfo = async ({
  nickname,
  sortType,
  page,
  field,
}: GetArtistInfoParams) => {
  const url =
    `${process.env.NEXT_PUBLIC_SERVER_URL}/author_artworks?name=${nickname}&type=${sortType}&page=${page}`.concat(
      field !== '' ? `&board=${field.replace('_cnt', '')}` : ''
    );

  const response = await axios.get<Artist>(url);

  return response.data;
};

type GetArtistInfoParams = {
  nickname: string;
  sortType: string;
  page: number;
  field: string;
};
