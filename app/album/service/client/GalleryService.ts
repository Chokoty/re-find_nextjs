import { ROWS_PER_PAGE } from '@/app/gallery/lib/const';
import Service from '@/lib/service';
import type {
  // GetIsdNoticeArtworksParams,
  GetKeywordGalleryArtworksParams,
} from '@/types';

class GalleryService extends Service {
  // 키워드 갤러리 작품들 가져오기
  async getGalleryArtworksByKeyword({
    galleryType,
    sortType,
    page,
  }: GetKeywordGalleryArtworksParams & PageNum) {
    const url = `/v2/album/artworks?album=${galleryType}&sorttype=${sortType}&per_page=${ROWS_PER_PAGE}&page=${page}`;
    return this.http.get<AlbumArtworks>(url);
  }

  // 갤러리 앨범 목록 가져오기 (추가된 메서드)
  async getGalleries() {
    const url = `/v2/albums`;
    return this.http.get<AlbumList>(url);
  }

  // 작품(게시글)의 상세 정보를 가져옵니다.
  getArtworkDetail(artworkId: number) {
    // const url = `/fanart_info?id=${artworkId}`;
    const url = `/v2/fanart_info?id=${artworkId}`;
    return this.http.get<ArtworkDetail>(url);
  }
}

type PageNum = { page: number };

export default new GalleryService();
