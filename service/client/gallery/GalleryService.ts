import Service from '@/service';
import type { GetKeywordGalleryArtworksParams } from '@/types';

const ROWS_PER_PAGE = 30; // 한 페이지당 불러올 아이템 개수

class GalleryService extends Service {
  // 키워드 갤러리 작품들 가져오기
  async getGalleryArtworksByKeyword({
    query,
    sortType,
    page,
  }: GetKeywordGalleryArtworksParams & PageNum) {
    return this.http.get<GalleryArtworks>(
      `/${query}&ranktype=${sortType}&per_page=${ROWS_PER_PAGE}&page=${page}`
    );
  }

  // 이세돌 공지사항 모든 글 가져오기
  // 위처럼 lastpage를 받고 page를 주는 형태로 변경 요청
  // TODO: infinite scroll 적용하기
  getIsdNotices() {
    return this.http.get<IsdNotice>(`/isd_notice`);
  }
}

type PageNum = { page: number };

export default new GalleryService();
