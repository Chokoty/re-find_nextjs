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
