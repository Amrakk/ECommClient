import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { PaymentServiceStatus } from "@/apis/services";

interface PaymentServiceStatusStore {
    paymentServiceStatus: PaymentServiceStatus[];
    setPaymentServiceStatus: (paymentServiceStatus: PaymentServiceStatus[]) => void;
}

export const usePaymentServiceStatusStore = create<PaymentServiceStatusStore>()(
    persist(
        (set) => ({
            paymentServiceStatus: [],
            setPaymentServiceStatus: (paymentServiceStatus: PaymentServiceStatus[]) => set({ paymentServiceStatus }),
        }),
        { name: "paymentServiceStatus" }
    )
);
