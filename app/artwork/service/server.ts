// 작품 세부 정보 가져오기
import axios from 'axios';

export const getArtworkDetail = async (artworkId: number) => {
  // const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/fanart_info?id=${artworkId}`;
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL!}/v2/fanart_info?id=${artworkId}`;
  const response = await axios.get<ArtworkDetail>(url);
  return response.data;
};
