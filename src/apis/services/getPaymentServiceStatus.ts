import { API } from "@/apis/api";

import type { IResponse } from "@/interfaces/response";

export type PaymentServiceStatus = {
    service: string;
    available: boolean;
};

export async function getPaymentServiceStatus(): Promise<PaymentServiceStatus[]> {
    return API.get<IResponse<PaymentServiceStatus[]>>("/services/payment-status").then((res) => res.data.data!);
}
