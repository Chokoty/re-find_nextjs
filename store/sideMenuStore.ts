import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type SideMenuStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

// 새로고침 시 사이드바가 잠깐 닫혔다가(초기값) 다시 열리는 플래시/플리킹(FOUC, Flash of Uncontrolled Content) 현상이 존재하나 빌드 후에는 봐줄만 함..
export const useSideMenuStore = create<SideMenuStore>()(
  devtools(
    persist(
      (set) => ({
        isOpen: false,
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
        toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      }),
      {
        name: 'side-menu-storage', // localStorage의 key
      }
    ),
    { name: 'SideMenuStore' } // devtools에서 보여질 이름
  )
);
