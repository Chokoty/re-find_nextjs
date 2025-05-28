import axios from 'axios';

// const baseURL = process.env.NEXT_PUBLIC_IS_LOCAL
//   ? process.env.NEXT_PUBLIC_DEV_SERVER_URL!
//   : process.env.NEXT_PUBLIC_SERVER_URL!;
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL!;

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

// Fix: 쿠키 전달 필요한 api 변경 (서버사이드 > 클라이언트사이드) <<<< commit 이름
// 로그인 유저의 경우 나의 앨범을 보는 과정에서 서버사이드에서 요청하면 쿠키를 전달할 수 없으므로 -> 클라이언트 사이드로 변경
