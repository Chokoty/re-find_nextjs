import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { FileWithPreview } from '@/types';

interface ImageUploadStore {
  hashs: string[] | null;
  uploadedfiles: FileWithPreview[] | null;
  setHashs: (value: string[]) => void; // 해시값 저장
  setUploadedFiles: (value: FileWithPreview[]) => void; // 이미지 파일 저장
  resetFiles: () => void; // 이미지 파일 초기화
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const useImageUploadStore = create<ImageUploadStore>()(
  devtools((set) => ({
    hashs: null,
    uploadedfiles: null,
    setHashs: (value) => set({ hashs: value }),
    setUploadedFiles: (value) => set({ uploadedfiles: value }),
    resetFiles: () => {
      set({ hashs: null, uploadedfiles: null });
      scrollToTop();
    },
  }))
);
