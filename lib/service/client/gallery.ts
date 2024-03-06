import axios from 'axios';

// 이세돌 공지사항 모든 글 가져오기
export const getIsdNotice = async () => {
  const response = await axios.get<IsdNotice>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/isd_notice`
  );
  return response.data;
};

// 키워드 갤러리 작품들 가져오기
export const getKeywordGalleryArtworks = async ({
  query,
  sortType,
  page,
}: GetKeywordGalleryArtworksParams) => {
  const url = `
      ${process.env.NEXT_PUBLIC_SERVER_URL}/${query}&ranktype=${sortType}&per_page=30&page=${page}`;

  const response = await axios.get<GalleryArtworks>(url);
  return response.data;
};

type GetKeywordGalleryArtworksParams = {
  query: string;
  sortType: string;
  page: number;
};
