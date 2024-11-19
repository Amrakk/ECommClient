import { API } from "@/apis/api";

import type { IResponse } from "@/interfaces/response";
import type { VoucherDetail, VoucherFilter } from "@/models/voucher";

interface GetVouchersResponse {
    vouchers: VoucherDetail[];
    totalDocuments: number;
}

export async function getVouchers(query?: VoucherFilter): Promise<GetVouchersResponse> {
    return API.get<IResponse<GetVouchersResponse>>("/vouchers", { params: query }).then(
        (res) => res.data.data ?? { vouchers: [], totalDocuments: 0 }
    );
}
