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

export interface GenerateCodes {
    prefix?: string;
    count: number;
    discount: {
        type: DISCOUNT_TYPE;
        value: number;
    };
    expirationDate: Date;
}

export interface InsertVoucher {
    code: string;
    discount: {
        type: DISCOUNT_TYPE;
        value: number;
    };
    expirationDate: Date;
}
