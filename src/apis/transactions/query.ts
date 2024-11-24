import { API } from "@/apis/api";

import type { IResponse } from "@/interfaces/response";
import type { TransactionDetail } from "@/models/order";

export async function getTransactionById(_id: string): Promise<TransactionDetail> {
    return API.get<IResponse<TransactionDetail>>(`/transactions/${_id}`).then((res) => res.data.data!);
}

export async function getTransactionByOrderId(orderId: string): Promise<TransactionDetail> {
    return API.get<IResponse<TransactionDetail>>(`/transactions/order/${orderId}`).then((res) => res.data.data!);
}
