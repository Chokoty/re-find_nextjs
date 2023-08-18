import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
    count: 0,
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
});

export const useStore = create(devtools(store));

//Event
const eventStore = (set) => ({
    isMelonVoteModalOpen: true,
    setIsMelonVoteModalOpen: (value) => set({ isMelonVoteModalOpen: value }),
});

export const useEventStore = create(devtools(eventStore));

//Theme
// const useThemeStore = create((set) => ({
//     theme: "light",
//     toggleTheme: () =>
//         set((state) => ({
//             theme: state.theme === "light" ? "dark" : "light",
//         })),
// }));

// export create(useThemeStore)
