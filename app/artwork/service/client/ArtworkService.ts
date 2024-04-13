import Service from '@/service';
import type { GetRecommendArtworksParams } from '@/types';

const ROWS_PER_PAGE = 30; // 한 페이지당 불러올 아이템 개수

class ArtworkService extends Service {
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

export default new ArtworkService();
