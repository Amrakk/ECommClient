import { API } from "@/apis/api";
import { PAYMENT_STATUS, PAYMENT_TYPE } from "@/constants";

import type { IResponse } from "@/interfaces/response";
import type { TransactionDetail } from "@/models/order";

interface InsertTransaction {
    isPaid?: boolean; // For COD only
    orderId: number;
    paymentType: PAYMENT_TYPE;
}

interface UpdateTransaction {
    paymentStatus?: PAYMENT_STATUS;
    paymentTime?: Date;
}

export async function insertTransaction(data: InsertTransaction): Promise<TransactionDetail> {
    return API.post<IResponse<TransactionDetail>>("/transactions", data).then((res) => res.data.data!);
}

export async function updateTransactionByOrderId(orderId: string, data: UpdateTransaction): Promise<TransactionDetail> {
    return API.patch<IResponse<TransactionDetail>>(`/transactions/order/${orderId}`, data).then(
        (res) => res.data.data!
    );
}
