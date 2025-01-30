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
    author: SourceAuthor;
    upload_date: string;
    title: string;
    board: string;
    total_counter: string;
    today_counter: string;
  }

  export interface SourceAuthor extends AuthorCommon {
    author_nickname: string;
    author_url: string;
    author_prof_url: string;
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
  export interface IsdNoticeArtworks {
    total: number;
    lastPage: boolean;
    list: IsdArtworkList[];
  }

  export interface IsdArtworkList extends ArtworkList {
    author: string;
    content: string;
    comment: number;
    source: number[];
    is_shukkou: boolean;
    is_hyum: boolean;
  }

  // export interface AlbumInfo {
  //   id: string;
  //   title: string;
  //   description: string;
  //   cover_image: string;
  //   query: string;
  //   author: string;
  //   subTitle: string;
  // }
  export interface AlbumInfo {
    id: string;
    title: string;
    description: string;
    cover_image: string;
    query: string;
    author: string;
    subTitle: string;
    linkTitle?: string;
    linkUrl?: string;
  }

  export interface AlbumList {
    albums: AlbumInfo[];
  }

  export interface AlbumArtworks {
    lastPage: boolean;
    total: number;
    list: AlbumArtworkList[];
  }

  export interface AlbumArtworkList extends ArtworkList {
    author: null | string;
    is_shukkou: boolean;
    is_hyum: boolean;
  }

  export interface ArtworkDetail extends AlbumArtworkList {
    prof_url: null | string;
  }

  export interface RecommendArtworks {
    total: number;
    lastPage: boolean;
    list: ArtworkDetail[];
  }

  // export enum Board {
  //   우왁굳팬아트 = '우왁굳 팬아트',
  // }

  // artists.ts

  export interface AuthorCommon {
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

  export interface AuthorInfo extends AuthorCommon {
    prof_url: string;
    nick: string;
  }

  export interface AuthorList {
    lastPage: boolean;
    list: AuthorInfo[];
    total: number;
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
    comment: number;
    deleted: boolean;
    source?: null | number[];
  }

  // export interface Author {
  //   author_nickname: string;
  //   author_url: string;
  //   author_prof_url: string;
  //   total_views: number;
  //   total_likes: number;
  //   total_comments: number;
  //   total_articles: number;
  //   total_subscribers: number;
  //   best_cnt: number;
  //   goldhand_cnt: number;
  //   isd_cnt: number;
  //   gomem_cnt: number;
  //   wak_cnt: number;
  // }

  export interface AuthorOverview extends AuthorCommon {
    following?: boolean;
    num_artworks: number;
    author_nickname: string;
    author_url: string;
    author_prof_url: string;
  }

  // export enum Board {
  //   The127912이세돌팬아트 = "&#127912;이세돌┃팬아트",
  //   고멤팬아트 = "고멤┃팬아트",
  //   우왁굳팬아트 = "우왁굳 팬아트",
  //   통합Best팬아트게시판 = "통합 BEST 팬아트 게시판",
  // }

  // events.ts

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

  // search
  // GalleryArtworks랑 비슷한데 추후 리팩토링하기
  export interface SearchResult {
    lastPage: boolean;
    list: SearchItem[];
    total: number;
  }

  export interface SearchItem {
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
    source: null;
    is_shukkou: boolean;
    is_hyum: boolean;
  }

  export interface WaktyHall {
    hyum: DoorBehindFanart;
    best: DoorBehindFanart;
    wakdu: DoorBehindFanart;
  }

  export interface DoorBehindFanart {
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

  // login
  export interface NaverloginResponse {
    status: 'success';
    state: 'register' | 'login';
    redirect_uri: string;
  }

  export interface CustomAlbumAddResponse {
    album: string; // id (ex. "user--8cb6")
    message: string;
    sliced: boolean; //입력한 게시글이 제한을 넘어갔는지 여부
    status: string; // 'success'
  }

  export interface CustomAlbumEditResponse {
    status: string; // 'success'
    edited: string[]; // ["name", "articles"] or ["name"] or ["articles"]
  }

  export interface ArtistSubscribeResponse {
    status: string; // 'success'
    message: string;
  }

  export interface SubscribedArtistsResponse {
    status: string; // 'success'
    list: SbuscribedArtist[];
  }

  type SbuscribedArtist = {
    nick: string;
    profimg: stirng;
  };

  type CustomAlbumInfos = {
    id: string;
    name: string;
  };

  export type UserInfo = {
    naver_id: string;
    nick: string;
    albums: CustomAlbumInfos[];
  };

  export type CustomAlbumEditParams = {
    name: string;
    articles?: number[];
    is_public?: boolean;
  };
}
