import Service from '@/service';
import type {
  GetIsdNoticeArtworksParams,
  GetKeywordGalleryArtworksParams,
  GetRecommendArtworksParams,
} from '@/types';

const ROWS_PER_PAGE = 30; // 한 페이지당 불러올 아이템 개수

class GalleryService extends Service {
  // 키워드 갤러리 작품들 가져오기
  async getGalleryArtworksByKeyword({
    query,
    sortType,
    page,
  }: GetKeywordGalleryArtworksParams & PageNum) {
    const url = `/${query}&ranktype=${sortType}&per_page=${ROWS_PER_PAGE}&page=${page}`;
    return this.http.get<GalleryArtworks>(url);
  }

  // 이세돌 공지사항에 이세돌 멤버들이 직접 골라서 업로드한 팬아트들을 확인할 수 있습니다.
  // ranktype Type 만들어서 사용하기
  getIsdNoticesArtworks({
    member,
    ranktype,
    page,
  }: GetIsdNoticeArtworksParams & PageNum) {
    const memberQuery = member !== 'isd' ? `&member=${member}` : '';
    const url =
      `/isd_notice_per_page?ranktype=${ranktype}&per_page=${ROWS_PER_PAGE}&page=${page}`.concat(
        memberQuery
      );
    return this.http.get<IsdNoticeArtworks>(url);
  }

  // 작품(게시글)의 상세 정보를 가져옵니다.
  getArtworkDetail(artworkId: number) {
    const url = `/fanart_info?id=${artworkId}`;
    return this.http.get<ArtworkDetail>(url);
  }

  // 작품(게시글)에 대한 추천 작품들을 가져옵니다. 추천은 좋아요 기반이며, 파라미터로 조정 가능합니다.
  getRecommendArtworks({
    artworkId,
    ap = 1.0,
    page,
  }: GetRecommendArtworksParams & PageNum) {
    const url = `/recommend_on_article_using_likes?id=${artworkId}&ap=${ap}&per_page=${ROWS_PER_PAGE}&page=${page}`;
    return this.http.get<RecommendArtworks>(url);
  }
}

type PageNum = { page: number };

export default new GalleryService();
