import Service from '@/lib/service';
import type { DeleteArtworkParams } from '@/types';

class MyService extends Service {
  // async getImageInfoByHash(hash: string) {
  //   const startTime = new Date().getTime();
  //   const source = await this.http.get<Source>(`/v2/receive?dhash=${hash}`);
  //   const endTime = new Date().getTime();
  //   const elapsedTime = endTime - startTime;
  //   return { source, elapsedTime };
  // }

  // getCounts() {
  //   return this.http.get<Counter>(`/v2/counter`);
  // }

  // getRecentUpdates() {
  //   return this.http.get<RecentBoardData[]>(`/v2/last_update_info`);
  // }

  postCustomAlbum(items: number[]) {
    return this.http.post<CustomAlbumAddResponse>(`/v2/album/create`, {
      articles: items,
    });
  }

  // 커스텀 앨범 정보 수정
  putCustomAlbum(albumId: string, info: CustomAlbumEditParams) {
    return this.http.post<CustomAlbumEditResponse>(
      `/v2/album?album=${albumId}`,
      info
    );
  }

  putFanartsInToCustomAlbum(albumId: string, items: number[]) {
    return this.http.put<CustomAlbumEditResponse>(
      `/v2/album?album=${albumId}`,
      {
        articles: items,
      }
    );
  }

  deleteCustomAlbum({
    albumId,
    artworksIdList,
    isDeleteAlbum = false,
  }: DeleteArtworkParams) {
    return this.http.delete(`/v2/album?album=${albumId}`, {
      data: {
        articles: artworksIdList,
        destroy_album: isDeleteAlbum,
      },
    });
  }

  updateLikedArticles() {
    const url = '/v2/me/update';
    return this.http.get(url);
  }

  subscribeArtist(author: string) {
    const url = `/v2/me/follows/${author}`;
    return this.http.put<ArtistSubscribeResponse>(url);
  }

  unsubscribeArtist(author: string) {
    const url = `/v2/me/follows/${author}`;
    return this.http.delete<ArtistSubscribeResponse>(url);
  }

  subscribedArtists() {
    const url = '/v2/me/follows';
    return this.http.get<SubscribedArtistsResponse>(url);
  }
}

// 항상 MyService 동일한 인스턴스를 사용하도록 한다. (싱글톤)
export default new MyService();
