import { create } from "zustand";
import { USER_ROLE } from "@/constants";
import { persist } from "zustand/middleware";

interface UserData {
    _id: string;
    name: string;
    email: string;
    role: USER_ROLE;
    avatarUrl: string;
    cartId?: string;
}

interface UserStore {
    user?: UserData;
    setUser: (user?: UserData) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: undefined,
            setUser: (user?: UserData) => set({ user }),
        }),
        { name: "user" }
    )
);
