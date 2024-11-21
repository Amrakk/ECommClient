import type { DISCOUNT_TYPE } from "@/constants.js";

export interface VoucherDetail {
    _id: string;
    code: string;
    discount: {
        type: DISCOUNT_TYPE;
        value: number;
    };
    expirationDate: Date;
    used: boolean;
}

export interface VoucherFilter {
    page?: number;
    limit?: number;

    code?: string;
    used?: boolean;
    discountType?: DISCOUNT_TYPE;
}
