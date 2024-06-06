import { ROWS_PER_PAGE } from '@/app/search/lib/const';
import { getPeriod } from '@/app/search/lib/date';
import Service from '@/lib/service';
import type { CountLimit, GetSearchResultParams } from '@/types';

class SearchService extends Service {
  // 검색 결과 가져오기
  async getSearchResults({
    q,
    title,
    content,
    author,
    page,
    sensitive,
    viewCountLimit,
    likeCountLimit,
    commentCountLimit,
    board,
    category,
    dateType,
    rankType,
  }: GetSearchResultParams & PageNum) {
    // 제목, 내용, 작가 필터
    const criteria = `${title ? '&title' : ''}${content ? '&content' : ''}${author ? '&author' : ''}`;
    const range = getRange({
      viewCountLimit,
      likeCountLimit,
      commentCountLimit,
    });
    const period =
      dateType.type === 'custom' ? dateType.date : getPeriod(dateType.type);
    const boardCategory = getBoardCategory({ board, category });
    const etc = `${criteria}${range}${boardCategory}${period}`;
    const url =
      `/search_txt?query=${q}&ranktype=${rankType}&case_sensitive=${sensitive}&per_page=${ROWS_PER_PAGE}&page=${page}`.concat(
        etc
      );
    const response = await this.http.get<SearchResult>(url);
    return response;
  }
}

type PageNum = { page: number };

export default new SearchService();

// 조회수, 좋아요, 댓글수 범위
const getRange = ({
  viewCountLimit,
  likeCountLimit,
  commentCountLimit,
}: {
  viewCountLimit: CountLimit;
  likeCountLimit: CountLimit;
  commentCountLimit: CountLimit;
}) => {
  const viewRange = `${viewCountLimit.check ? `&view_lb=${viewCountLimit.min}&view_ub=${viewCountLimit.max}` : ''}`;
  const likeRange = `${likeCountLimit.check ? `&like_lb=${likeCountLimit.min}&like_ub=${likeCountLimit.max}` : ''}`;
  const commentRange = `${commentCountLimit.check ? `&comment_lb=${commentCountLimit.min}&comment_ub=${commentCountLimit.max}` : ''}`;
  return viewRange + likeRange + commentRange;
};

// 게시판, 카테고리
const getBoardCategory = ({
  board,
  category,
}: {
  board: string;
  category: string;
}) => {
  if (board === 'all') {
    return '';
  }

  if (category === 'all') {
    return `&board=${board}`;
  }

  return `&board=${board}&category=${category}`;
};
