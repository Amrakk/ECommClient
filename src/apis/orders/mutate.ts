import { API } from "@/apis/api";

import type { IAddress } from "@/models/user";
import type { ICartItem } from "@/models/cart";
import type { IResponse } from "@/interfaces/response";
import type { ORDER_STATUS, PAYMENT_TYPE } from "@/constants";
import type { OrderDetail, TransactionDetail } from "@/models/order";

interface InsertOrder {
    userId: string;
    items: ICartItem[];
    voucherDiscount?: number;
    loyaltyPointsDiscount?: number;
    isPaid?: boolean;
    shippingAddress: IAddress;
    status?: ORDER_STATUS;
}

interface UpdateOrder {
    userId?: string;
    items?: ICartItem[];
    voucherDiscount?: number;
    loyaltyPointsDiscount?: number;
    shippingAddress?: IAddress;
    isPaid?: boolean;
    status?: ORDER_STATUS;
}

export interface Checkout {
    shippingAddress: IAddress;
    paymentType: PAYMENT_TYPE;
    usePoints?: boolean;
    voucherCode?: string;
}

interface ResCheckout {
    order: OrderDetail;
    transaction: TransactionDetail;
}

export async function insertOrder(data: InsertOrder): Promise<OrderDetail> {
    return API.post<IResponse<OrderDetail[]>>("/orders", data).then((res) => res.data.data![0]);
}

export async function updateOrder(data: { _id: number; data: UpdateOrder }): Promise<OrderDetail> {
    return API.patch<IResponse<OrderDetail>>(`/orders/${data._id}`, data.data).then((res) => res.data.data!);
}

export async function deleteOrder(data: { _id: number }): Promise<OrderDetail> {
    return API.delete<IResponse<OrderDetail>>(`/orders/${data._id}`).then((res) => res.data.data!);
}

export async function checkout(data: Checkout): Promise<ResCheckout> {
    return API.post<IResponse<ResCheckout>>("/orders/checkout", data).then((res) => res.data.data!);
}
