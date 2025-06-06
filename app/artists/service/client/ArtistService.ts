import { ROWS_PER_PAGE } from '@/app/artists/lib/const';
import Service from '@/lib/service';
import type { GetArtistArtworksParams, GetArtistListParams } from '@/types';

// TODO: 네이밍 통일하기 (artists vs authors)

class ArtistService extends Service {
  // 작가 정보 가져오기
  getArtistInfo(nickname: string) {
    const url = `/v2/author?nick=${nickname}`;
    return this.http.get<AuthorOverview>(url);
  }

  // 왁타버스 작가 리스트 가져오기 - 쿼리 있는 경우 : /v2/author_list_per_page
  getArtistList({
    q,
    ranktype,
    board,
    page,
  }: GetArtistListParams & { page: number }) {
    const url =
      `/v2/author_list_per_page?query=${q}&ranktype=${ranktype}&page=${page}&per_page=${ROWS_PER_PAGE}`.concat(
        board ? `&board=${board}` : ''
      );
    return this.http.get<AuthorList>(url);
  }

  // 왁타버스 작가 리스트 가져오기 - 쿼리 없는 경우 : /author_list_per_page
  // getArtistListWithoutQuery({
  //   ranktype,
  //   board,
  //   page,
  // }: GetArtistListParams & PageNum) {
  //   const url =
  //     `/author_list_per_page?ranktype=${ranktype}&page=${page}&per_page=${ROWS_PER_PAGE}`.concat(
  //       board ? `&board=${board}` : ''
  //     );
  //   return this.http.get<AuthorList>(url);
  // }

  // 작가의 작품들 가져오기
  // {"lastPage": true, "list": []}
  async getArtistArtworks({
    nickname,
    sortType,
    page,
    board,
  }: GetArtistArtworksParams & PageNum) {
    const url =
      `/v2/author/artworks?name=${nickname}&sorttype=${sortType}&page=${page}`.concat(
        board ? `&board=${board}` : ''
      );

    return this.http.get<Artist>(url);
  }
}

type PageNum = { page: number };

export default new ArtistService();
