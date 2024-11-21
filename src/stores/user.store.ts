import { create } from "zustand";
import { User } from "@/models/user.js";
import { persist } from "zustand/middleware";

interface UserStore {
    user?: User;
    setUser: (user?: User) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: undefined,
            setUser: (user?: User) => set({ user }),
        }),
        { name: "user" }
    )
);
