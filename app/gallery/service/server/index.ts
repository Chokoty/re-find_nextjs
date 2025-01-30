import axios from 'axios';
import { cookies } from 'next/headers';

// const baseURL = process.env.NEXT_PUBLIC_IS_LOCAL
//   ? process.env.NEXT_PUBLIC_DEV_SERVER_URL!
//   : process.env.NEXT_PUBLIC_SERVER_URL!;
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL!;

// 갤러리 페이지 정보 가져오기 (제목 / 설명 / 배경 이미지)
export async function getGalleryPageInfo(id: string) {
  const cookieStore = cookies();
  const cookieResult = cookieStore.get('session-data');

  /**
   * 
   * cookie {
  name: 'session-data',
  value: 'eyJhbGciOiJIUzxxxx'
}
   */

  // if (!cookieResult) {
  //   throw new Error('Session cookie not found');
  // }

  const url = `${baseURL}/v2/album?album=${id}`;
  try {
    const response = await axios<AlbumInfo>(url, {
      headers: {
        Cookie: `session-data=${cookieResult?.value}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Get Album Info Error:', error);
    throw error;
  }
}
