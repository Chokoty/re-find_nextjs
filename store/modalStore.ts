import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
/**
 * 규격x, 중첩o 모달 상태 관리(feat. uuid)
 * 1. 배열로 모달을 관리한다.
 * 2. 컴파일타임이 아닌 런타임에 모달을 추가하거나 제거할 수 있다.
 * 3. 실제 모달 컴포넌트를 담아줄 객체를 만들어준다.
 * 예. modal show > modals에 해당 모달의 id를 추가 > 관리
 *  */

type ModalState = {
  modals: string[];
  showModal: (id: string) => void;
  hideModal: (id: string) => void;
};

const useModalState = create<ModalState, [['zustand/devtools', ModalState]]>(
  devtools((set) => ({
    modals: [],
    showModal: (id) =>
      set((state) => ({ ...state, modals: [...state.modals, id] })),
    hideModal: (id) =>
      set((state) => ({
        ...state,
        modals: [...state.modals.filter((modalId) => modalId !== id)],
      })),
  }))
);

export const MODAL_COMPONENTS: {
  [id: string]: {
    Component: React.ComponentType<any>;
    props?: Record<string, unknown>;
  };
} = {};

export default useModalState;
