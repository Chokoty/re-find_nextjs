import axios from 'axios';

// const baseURL = process.env.NEXT_PUBLIC_IS_LOCAL
//   ? process.env.NEXT_PUBLIC_DEV_SERVER_URL!
//   : process.env.NEXT_PUBLIC_NEW_SERVER_URL!;
const baseURL = process.env.NEXT_PUBLIC_NEW_SERVER_URL!;

// 갤러리 페이지 정보 가져오기 (제목 / 설명 / 배경 이미지)
export async function getGalleryPageInfo(id: string) {
  const url = `${baseURL}/v2/album?album=${id}`;
  try {
    const response = await axios<AlbumInfo>(url);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
