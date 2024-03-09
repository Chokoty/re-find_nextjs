import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { FileWithPreview } from '@/types';

interface ImageUploadStore {
  hashs: string[] | null;
  uploadedfiles: FileWithPreview[] | null;
  isEventActive: boolean; // congrat
  setHashs: (value: string[]) => void; // 해시값 저장
  setUploadedFiles: (value: FileWithPreview[]) => void; // 이미지 파일 저장
  resetFiles: () => void; // 이미지 파일 초기화
  setIsEventActive: (value: boolean) => void; // 이벤트 활성화
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
    isEventActive: false,
    setHashs: (value) => set({ hashs: value }),
    setUploadedFiles: (value) => set({ uploadedfiles: value }),
    resetFiles: () => {
      set({ hashs: null, uploadedfiles: null });
      scrollToTop();
    },
    setIsEventActive: (value) => set({ isEventActive: value }),
  }))
);
