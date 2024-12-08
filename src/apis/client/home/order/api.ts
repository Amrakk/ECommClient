import { API } from "@/apis/api";
import { GetOrderByIdResponse } from "@/apis/orders";
import { IResponse } from "@/interfaces/response";


export interface GetOrderByUserIdResponse {
    orders: GetOrderByIdResponse[],
    totalDocuments: number;
} 

export function getOrderByUserId (): Promise<GetOrderByUserIdResponse> {
    return API.get<IResponse<GetOrderByUserIdResponse>>(`/orders`).then((res) => res.data.data!);
}