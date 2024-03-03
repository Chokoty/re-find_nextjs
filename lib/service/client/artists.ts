import axios from 'axios';

// 역대 작가 리스트 가져오기
export const getAuthorList = async () => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/author_list`;
  const response = await axios.get<AuthorList>(url);

  return response.data;
};

// 작가의 작품들 가져오기
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
