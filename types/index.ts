// events

export type CheckBoxType = {
  isd: boolean;
  wak: boolean;
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
  id: number;
  value: string;
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
