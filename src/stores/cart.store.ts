import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartDetail } from "@/models/cart";

interface CartStore {
    cart?: CartDetail;
    setCart: (cart?: CartDetail) => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cart: undefined,
            setCart: (cart?: CartDetail) => set({ cart }),
        }),
        { name: "cart" }
    )
);
