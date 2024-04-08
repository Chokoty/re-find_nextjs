// events

export type CheckBoxType = {
  isd: boolean;
  wak: boolean;
  gomem: boolean;
};

// home
// interface FileWithPreview extends File {
//   preview: string;
// }
export type FileWithPreview = File & {
  preview: string;
};

// artists
export type SortCriteria = { field: keyof AuthorCommon; active: boolean };

export interface View {
  name: string;
  value: keyof AuthorCommon;
  colorScheme: string;
}

export interface Sort {
  name: string;
  value: keyof AuthorCommon;
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
}

// search
export type CountLimit = {
  check: boolean;
  min: number;
  max: number;
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
  field: string;
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
  dateType: string;
  rankType: string;
  viewCountLimit: CountLimit;
  likeCountLimit: CountLimit;
  commentCountLimit: CountLimit;
};
