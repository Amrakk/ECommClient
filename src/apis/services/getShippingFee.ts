import { API } from "@/apis/api";

import type { IResponse } from "@/interfaces/response";

interface GetShippingFee {
    districtId: string;
    wardCode: string;
}

export async function getShippingFee(data: GetShippingFee): Promise<{ shippingFee: number }> {
    return API.get<IResponse<{ shippingFee: number }>>("/services/calculate-fee", { params: data }).then(
        (res) => res.data.data!
    );
}
