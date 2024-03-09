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

export interface AuthorInfoWithName extends AuthorInfo {
  name: string;
}

type Order = 'ascending' | 'descending';

export type SortCriteria = { field: keyof AuthorCommon; order: Order };

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
}

export interface Gallery {
  id: number;
  value: string;
  type: string;
  title: string;
  subTitle: string;
  description?: string;
  query?: string;
}

// service (api)

export type GetKeywordGalleryArtworksParams = {
  query: string;
  sortType: string;
};

export type GetArtistInfoParams = {
  nickname: string;
  sortType: string;
  field: string;
};
