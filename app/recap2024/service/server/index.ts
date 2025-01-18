import axios from 'axios';

import type { AuthorRecapResult, BestFanart, TotalRecapResult } from '@/types';

const baseURL = process.env.NEXT_PUBLIC_NEW_SERVER_URL!;

export async function getReFindRecapResults() {
  try {
    const response = await axios<TotalRecapResult>(`${baseURL}/v2/recap`);
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getAuthorRecapResults(name: string) {
  try {
    const response = await axios<AuthorRecapResult>(
      `${baseURL}/v2/recap?author_nick=${name}`
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// export async function getBestOfYearFanartInfo(
//   name: string
// ): Promise<BestFanart[]> {
//   try {
//     const [viewResponse, likeResponse, commentResponse] = await Promise.all([
//       axios(`${baseURL}/author_artworks?name=${name}&type="view"&page=1`),
//       axios(`${baseURL}/author_artworks?name=${name}&type="like"&page=1`),
//       axios(`${baseURL}/author_artworks?name=${name}&type="comment"&page=1`),
//     ]);

//     // return null;

//     return [
//       {
//         type: 'view',
//         imgUrl: viewResponse.data.list[0].img_url_list[0],
//         id: viewResponse.data.list[0].id,
//         cnt: viewResponse.data.list[0].view,
//       },
//       {
//         type: 'like',
//         imgUrl: likeResponse.data.list[0].img_url_list[0],
//         id: likeResponse.data.list[0].id,
//         cnt: viewResponse.data.list[0].like,
//       },
//       {
//         type: 'comment',
//         imgUrl: commentResponse.data.list[0].img_url_list[0],
//         id: commentResponse.data.list[0].id,
//         cnt: viewResponse.data.list[0].comment,
//       },
//     ];
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// }
