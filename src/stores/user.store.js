import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
    // Persist: Save in local storage
    persist(
        (set) => ({
            user: undefined,

            /**
             * @param {User} user
             * @returns {void}
             */
            setUser: (user) => set({ user }),
            logout: () => set({ user: undefined }),
        }),
        { name: "user" }
    )
);
