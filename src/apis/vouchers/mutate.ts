import { API } from "@/apis/api";

import type { IResponse } from "@/interfaces/response";
import type { GenerateCodes, InsertVoucher, VoucherDetail } from "@/models/voucher";

export async function insertVoucher(data: InsertVoucher): Promise<VoucherDetail[]> {
    return API.post<IResponse<VoucherDetail[]>>("/vouchers", data).then((res) => res.data.data!);
}

export async function generateVouchers(data: GenerateCodes): Promise<VoucherDetail[]> {
    return API.post<IResponse<VoucherDetail[]>>("/vouchers/generate-codes", data).then((res) => res.data.data!);
}

export async function deleteVoucher(_id: string): Promise<VoucherDetail> {
    return API.delete<IResponse<VoucherDetail>>(`/vouchers/${_id}`).then((res) => res.data.data!);
}
