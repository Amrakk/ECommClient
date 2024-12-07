import { API } from "@/apis/api";

import type { DISCOUNT_TYPE } from "@/constants";
import type { VoucherDetail } from "@/models/voucher";
import type { IResponse } from "@/interfaces/response";

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

export async function validateCode(code: string): Promise<VoucherDetail> {
    return API.post<IResponse<VoucherDetail>>(`/vouchers/code`, {
        code: code
    }).then((res) => res.data.data!);
}

export async function insertVoucher(data: InsertVoucher): Promise<VoucherDetail> {
    return API.post<IResponse<VoucherDetail[]>>("/vouchers", data).then((res) => res.data.data![0]);
}

export async function generateVouchers(data: GenerateCodes): Promise<VoucherDetail[]> {
    return API.post<IResponse<VoucherDetail[]>>("/vouchers/generate-codes", data).then((res) => res.data.data!);
}

export async function deleteVoucher(_id: string): Promise<VoucherDetail> {
    return API.delete<IResponse<VoucherDetail>>(`/vouchers/${_id}`).then((res) => res.data.data!);
}
