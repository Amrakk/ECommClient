import { API } from "@/apis/api";
import { ORDER_STATUS, PAYMENT_STATUS, PAYMENT_TYPE } from "@/constants";

import type { IAddress } from "@/models/user";
import type { IResponse } from "@/interfaces/response";
import type { OrderDetail, OrderFilter } from "@/models/order";
import type { IProductVariant, ProductDetail } from "@/models/product";

interface GetOrdersResponse {
    orders: (OrderDetail & { customerName: string })[];
    totalDocuments: number;
}

export interface GetOrderByIdResponse {
    _id: number;
    user: IUserProfile | null;
    transaction: ITransaction | null;
    items: IOrderItem[];
    voucherDiscount?: number;
    loyaltyPointsDiscount?: number;
    totalPrice: number;
    isPaid: boolean;
    shippingAddress: IAddress;
    status: ORDER_STATUS;
    createdAt: Date;
    updatedAt: Date;
}

interface IUserProfile {
    _id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    addresses: IAddress[];
}

interface ITransaction {
    _id: string;
    orderId: number;
    paymentType: PAYMENT_TYPE;
    paymentStatus: PAYMENT_STATUS;
    paymentTime?: Date;
    /** Payment amount after discount */
    paymentAmount: number;
    shippingFee: number;
    checkoutUrl?: string;
    paymentDetails: string;
    createdAt: Date;
}

interface IOrderItem {
    product: Pick<ProductDetail, "_id" | "name" | "images" >;
    variant: Omit<IProductVariant, "quantity">;
    quantity: number;
    productRatingId?: string;
}

export async function getOrders(query?: OrderFilter): Promise<GetOrdersResponse> {
    return API.get<IResponse<GetOrdersResponse>>("/orders", { params: query }).then(
        (res) => res.data.data ?? { orders: [], totalDocuments: 0 }
    );
}

export async function getOrderById(_id: string): Promise<GetOrderByIdResponse> {
    return API.get<IResponse<GetOrderByIdResponse>>(`/orders/${_id}`).then((res) => res.data.data!);
}
