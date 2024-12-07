import { API } from "@/apis/api";

import type { IResponse } from "@/interfaces/response";

interface ITimeBasedPagination {
    from?: Date;
    limit?: number;
}

 export interface GetProductRatingResponse {
    productRatings: IResGetProductRatingByProductId[];
    next_from: Date | null;
}

export interface IResGetProductRatingByProductId {
    _id: string;
    user: IUserProductRating;
    productId: string;
    rating: number;
    review: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IUserProductRating {
    _id: string;
    name: string;
    avatarUrl: string;
}

export async function getProductRatingByProductId(
    productId: string,
    pagination?: ITimeBasedPagination
): Promise<GetProductRatingResponse> {
    return await API.get<IResponse<GetProductRatingResponse>>(`/productRatings/product/${productId}`, {
        params: pagination,
    }).then((res) => res.data.data!);
}

export async function getProductRatingById(_id: string): Promise<IResGetProductRatingByProductId> {
    return await API.get<IResponse<IResGetProductRatingByProductId>>(`/productRatings/${_id}`).then(
        (res) => res.data.data!
    );
}
