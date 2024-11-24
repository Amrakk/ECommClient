import { API } from "../api";

import type { ProductDetail } from "@/models/product";
import type { IResponse } from "@/interfaces/response";

export interface CartDetailWithProduct {
    _id: string;
    items: ICartItemDetail[];
    updatedAt: Date;
}

export interface ICartItemDetail {
    quantity: number;
    variantId: string;
    product: ProductDetail;
}

export async function getCartById(_id: string): Promise<CartDetailWithProduct> {
    return API.get<IResponse<CartDetailWithProduct>>(`/carts/${_id}`).then((res) => res.data.data!);
}
