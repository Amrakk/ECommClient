import type { IAddress } from "./user.js";
import type { ORDER_STATUS, PAYMENT_STATUS, PAYMENT_TYPE } from "@/constants.js";
import type { ProductDetail, IProductVariant } from "./product.js";

export interface OrderDetail {
    _id: number;
    userId: string;
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

export interface IOrderItem {
    product: Pick<ProductDetail, "_id" | "name" | "images">;
    variant: Omit<IProductVariant, "quantity">;
    quantity: number;
    productRatingId?: string;
}

export interface OrderFilter {
    page?: number;
    limit?: number;

    searchTerm?: string;
    isPaid?: boolean;
    statuses?: ORDER_STATUS[];
    startDate?: Date | string;
    endDate?: Date | string;
}

export interface TransactionDetail {
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
