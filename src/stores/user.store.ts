import { create } from "zustand";
import { User } from "@/models/user.js";
import { persist } from "zustand/middleware";

interface UserStore {
    user?: User;
    setUser: (user: User) => void;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
    // Persist: Save in local storage
    persist(
        (set) => ({
            user: undefined,
            setUser: (user: User) => set({ user }),
            logout: async () => set({ user: undefined }),
        }),
        { name: "user" }
    )
);
