export {};

declare global {
  // prop types, API responses, or global state properties.
  // 주의: 타입이 겹칠 수 있는 걸 염두해두고 네이밍을 잘 해주자.

  // API response
  // home.ts
  export interface Counter {
    today_counter: string;
    total_counter: string;
  }

  export interface Source {
    ids: ID[];
    author: Author;
    upload_date: string;
    title: string;
    board: string;
    total_counter: string;
    today_counter: string;
  }

  export interface Author {
    author_nickname: string;
    author_url: string;
    author_prof_url: string;
    total_views: number;
    total_likes: number;
    total_comments: number;
    total_articles: number;
    total_subscribers: number;
    best_cnt: number;
    goldhand_cnt: number;
    isd_cnt: number;
    gomem_cnt: number;
    wak_cnt: number;
  }

  export interface ID {
    id: number;
    is_deleted: boolean;
    is_shukkou: boolean;
  }

  export interface RecentBoardData {
    board: string;
    date: string;
    id: string;
    info: BoardDataInfo;
  }

  export interface BoardDataInfo {
    img_url: string;
    img_url_list: string[];
    category: string;
    title: string;
    nickname: string;
    nicklevel: string; // Nicklevel
    date: string;
  }

  // export enum Nicklevel {
  //   느그자 = '느그자',
  //   진드기 = '진드기',
  //   카페매니저 = '카페매니저',
  // }

  // gallery.ts
  export interface IsdNotice {
    total: number;
    list: IsdArtworkList[];
  }

  export interface IsdArtworkList {
    id: number;
    url: string;
    img_url: string;
    img_url_list: string[];
    board: string;
    category: string;
    title: string;
    author: string;
    content: string;
    date: string;
    view: number;
    like: number;
    comment: number;
    deleted: boolean;
    source: number[];
    is_shukkou: boolean;
    is_hyum: boolean;
  }

  export interface GalleryArtworks {
    lastPage: boolean;
    total: number;
    list: GalleryArtworkList[];
  }

  export interface GalleryArtworkList {
    id: number;
    url: string;
    img_url: string;
    img_url_list: string[];
    board: string; // Board
    category: string;
    title: string;
    author: null | string;
    date: string;
    view: number;
    like: number;
    comments: number;
    is_shukkou: boolean;
    deleted: boolean;
    is_hyum: boolean;
  }

  // export enum Board {
  //   우왁굳팬아트 = '우왁굳 팬아트',
  // }

  // artists.ts
  // Author가 겹치니 네이밍 변경해주기
  export interface AuthorInfo {
    total_articles: number;
    best_cnt: number;
    goldhand_cnt: number;
    isd_cnt: number;
    gomem_cnt: number;
    wak_cnt: number;
    prof_url: string;
    total_views: number;
    total_likes: number;
    total_comments: number;
    total_subscribers: number;
  }

  export interface AuthorList {
    [key: string]: AuthorInfo;
  }

  export interface Artist {
    lastPage: boolean;
    list: ArtworkList[];
  }

  export interface ArtworkList {
    id: number;
    url: string;
    img_url: string;
    img_url_list: string[];
    board: string; // Board
    category: string;
    title: string;
    date: string;
    view: number;
    like: number;
    comments: number;
    deleted: boolean;
  }

  // export enum Board {
  //   The127912이세돌팬아트 = "&#127912;이세돌┃팬아트",
  //   고멤팬아트 = "고멤┃팬아트",
  //   우왁굳팬아트 = "우왁굳 팬아트",
  //   통합Best팬아트게시판 = "통합 BEST 팬아트 게시판",
  // }

  export interface AuthorOverview {
    author_nickname: string;
    author_url: string;
    author_prof_url: string;
    total_subscribers: number;
    num_artworks: number;
    total_articles: number;
    best_cnt: number;
    goldhand_cnt: number;
    isd_cnt: number;
    gomem_cnt: number;
    wak_cnt: number;
    total_views: number;
    total_likes: number;
    total_comments: number;
  }

  // events.ts
  // Generated by https://quicktype.io

  export interface EventFanart {
    url: string;
    img_url: string;
    board: string;
    category: string;
    title: string;
    nickname: string;
    nicklevel: string;
    author_url: string;
    date: string;
  }

  // Generated by https://quicktype.io
}