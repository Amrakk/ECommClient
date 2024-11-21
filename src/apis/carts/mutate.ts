import { API } from "@/apis/api";

import type { IResponse } from "@/interfaces/response";
import type { CartDetail, ICartItem } from "@/models/cart";

export interface UpsertCart {
    items: ICartItem[];
}

export async function insertCart(data: UpsertCart): Promise<CartDetail> {
    return API.post<IResponse<CartDetail[]>>("/carts", data).then((res) => res.data.data![0]);
}

export async function updateCart(_id: string, data: UpsertCart): Promise<CartDetail> {
    return API.patch<IResponse<CartDetail>>(`/carts/${_id}`, data).then((res) => res.data.data!);
}

export async function deleteCart(_id: string): Promise<CartDetail> {
    return API.delete<IResponse<CartDetail>>(`/carts/${_id}`).then((res) => res.data.data!);
}
