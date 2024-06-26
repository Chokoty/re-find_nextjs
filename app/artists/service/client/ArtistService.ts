import { ROWS_PER_PAGE } from '@/app/artists/lib/const';
import Service from '@/lib/service';
import type { GetArtistInfoParams, GetArtistListParams } from '@/types';

// TODO: 네이밍 통일하기 (artists vs authors)

class ArtistService extends Service {
  // 왁타버스 작가 리스트 가져오기
  getArtistList({
    q,
    ranktype,
    board,
    page,
  }: GetArtistListParams & { page: number }) {
    const url =
      `/author_list_per_page?query=${q}&ranktype=${ranktype}&page=${page}&per_page=${ROWS_PER_PAGE}`.concat(
        board ? `&board=${board}` : ''
      );
    return this.http.get<AuthorList>(url);
  }

  // 작가의 작품들 가져오기
  // {"lastPage": true, "list": []}
  async getArtistArtworks({
    nickname,
    sortType,
    page,
    board,
  }: GetArtistInfoParams & PageNum) {
    const url =
      `/author_artworks?name=${nickname}&type=${sortType}&page=${page}`.concat(
        board ? `&board=${board}` : ''
      );

    return this.http.get<Artist>(url);
  }
}

type PageNum = { page: number };

export default new ArtistService();
