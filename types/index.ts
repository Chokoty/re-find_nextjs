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
