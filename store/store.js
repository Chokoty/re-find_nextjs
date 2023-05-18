import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
    count: 0,
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
    // setIsOpen: () => set((state) => ({ setIsOpen: !state.isOpen })),
});

export const useStore = create(devtools(store));

//Theme
// const useThemeStore = create((set) => ({
//     theme: "light",
//     toggleTheme: () =>
//         set((state) => ({
//             theme: state.theme === "light" ? "dark" : "light",
//         })),
// }));

// export useThemeStore
