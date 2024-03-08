import Service from '@/service';
import type { GetArtistInfoParams } from '@/types';

// TODO: 네이밍 통일하기 (artists vs authors)
class ArtistService extends Service {
  // 역대 작가 리스트 가져오기
  // 아래처럼 lastpage를 받고 page를 주는 형태로 변경 요청
  // TODO: infinite scroll 적용하기
  getArtistList() {
    return this.http.get<AuthorList>('/author_list');
  }

  // 작가의 작품들 가져오기
  // {"lastPage": true, "list": []}
  async getArtistInfo({
    nickname,
    sortType,
    page,
    field,
  }: GetArtistInfoParams & PageNum) {
    const url =
      `/author_artworks?name=${nickname}&type=${sortType}&page=${page}`.concat(
        field !== '' ? `&board=${field.replace('_cnt', '')}` : ''
      );

    return this.http.get<Artist>(url);
  }
}

type PageNum = { page: number };

export default new ArtistService();
