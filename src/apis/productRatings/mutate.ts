import { API } from "@/apis/api";

import type { IResponse } from "@/interfaces/response";
import type { ProductRatingDetail } from "@/models/product";

interface InsertVoucher {
    userId: string;
    productId: string;
    rating: number;
    review?: string;
    orderId: number | string;
}

interface UpdateVoucher {
    rating?: number;
    review?: string;
}

export async function insertProductRating(data: InsertVoucher): Promise<ProductRatingDetail> {
    return API.post<IResponse<ProductRatingDetail>>("/productRatings", data).then((res) => res.data.data!);
}

export async function updateProductRating(_id: string, data: UpdateVoucher): Promise<ProductRatingDetail> {
    return API.patch<IResponse<ProductRatingDetail>>(`/productRatings/${_id}`, data).then((res) => res.data.data!);
}

export async function deleteProductRating(_id: string): Promise<ProductRatingDetail> {
    return API.delete<IResponse<ProductRatingDetail>>(`/productRatings/${_id}`).then((res) => res.data.data!);
}
