import create from "zustand";

const useStore = create((set) => ({
    count: 0,
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
}));
