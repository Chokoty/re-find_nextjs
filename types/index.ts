// events

export type CheckBoxType = {
  isd: boolean;
  woowakgood: boolean;
  gomem: boolean;
};

export type WaktyHallResultType = {
  score: number;
  gamesPlayed: number;
  changeWin: number;
  changeLose: number;
  keepWin: number;
  keepLose: number;
};

// home
// interface FileWithPreview extends File {
//   preview: string;
// }
export type FileWithPreview = File & {
  preview: string;
};

// artists
export type SortTotalCriteria = keyof Pick<
  AuthorCommon,
  {
    [K in keyof AuthorCommon]: K extends `total_${string}` ? K : never;
  }[keyof AuthorCommon]
>;

export type SortRankCriteria = keyof Pick<
  AuthorCommon,
  {
    [K in keyof AuthorCommon]: K extends `total_${string}` ? never : K;
  }[keyof AuthorCommon]
>;

export interface View {
  name: string;
  value: SortRankCriteria;
  colorScheme: string;
}

export interface Sort {
  name: string;
  value: SortTotalCriteria;
}

// gallery
export interface Member {
  id: number;
  value: string;
  name: string;
  author: string;
  query?: string;
  personalColor?: string;
  personalColor2?: string;
  greetings?: string;
}

export interface Gallery {
  id: string;
  type: string;
  title: string;
  subTitle: string;
  description?: string;
  query?: string;
  isHidden?: boolean;
  author?: string;
  linkUrl?: string;
  linkTitle?: string;
}

// search
export type CountLimit = {
  check: boolean;
  min: number;
  max: number;
};

export type DateType = {
  type: string;
  date: string | null;
};

// service (api)

export type GetKeywordGalleryArtworksParams = {
  query: string;
  sortType: string;
};

export type GetIsdNoticeArtworksParams = {
  member: string;
  ranktype: string;
};

export type GetRecommendArtworksParams = {
  artworkId: number;
  ap?: number;
};

export type GetArtistInfoParams = {
  nickname: string;
  sortType: string;
  board: string | null;
};

export type GetArtistListParams = {
  q: string;
  ranktype: string;
  board: string | null;
};

export type GetSearchResultParams = {
  q: string;
  title: boolean;
  content: boolean;
  author: boolean;
  sensitive: boolean;
  board: string;
  category: string;
  dateType: DateType;
  rankType: string;
  viewCountLimit: CountLimit;
  likeCountLimit: CountLimit;
  commentCountLimit: CountLimit;
};

// 기본 리캡 결과 인터페이스
export interface BaseRecapResult {
  statistics: {
    total: number;
    best: number;
    views: number;
    likes: number;
    comments: number;
  };
  best_article: BestArticle;
  monthly_top_articles?: boolean;
}

// 전체 리캡 결과 인터페이스
export interface TotalRecapResult extends BaseRecapResult {}

// 작가별 리캡 결과 인터페이스
export interface AuthorRecapResult extends BaseRecapResult {
  statistics: StatisticsType;
}

export type StatisticsType = BaseRecapResult['statistics'] & {
  '2023': number;
  art_total: number;
  best_art_total: number;
  growth: number;
};

// // BestArticle 인터페이스는 그대로 유지
// export interface BestArticle {
//   '1': number;
//   '2': number;
//   '3': number;
//   '4': number;
//   '5': number;
//   '6': number;
//   '7': number;
//   '8': number;
//   '9': number;
//   '10': number;
//   '11': number;
//   '12': number;
//   overall: number;
// }
export interface BestArticle {
  '1': {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
  '2': {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
  '3': {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
  '4': {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
  '5': {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
  '6': {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
  '7': {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
  '8': {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
  '9': {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
  '10': {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
  '11': {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
  '12': {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
  overall: {
    id: number;
    img_url: string;
    views: number;
    likes: number;
    comments: number;
  };
}

// constants
export type Board = {
  board: string;
  id: string;
  state?: string;
};

// common
export type SelectHandleParams = {
  value: string;
  startD: string;
  dueD: string;
};

export type OptionType = {
  value: string;
  label: string;
  default?: boolean;
  hasCustomDateRangePicker?: boolean;
};

// recap
// type FanartType = 'view' | 'like' | 'comment';

export type BestFanart = {
  id: number;
  img_url: string;
  views: number;
  likes: number;
  comments: number;
};
