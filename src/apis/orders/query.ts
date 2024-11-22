import { API } from "@/apis/api";

import type { IResponse } from "@/interfaces/response";
import type { OrderDetail, OrderFilter } from "@/models/order";

interface GetOrdersResponse {
    orders: (OrderDetail & { customerName: string })[];
    totalDocuments: number;
}

export async function getOrders(query?: OrderFilter): Promise<GetOrdersResponse> {
    return API.get<IResponse<GetOrdersResponse>>("/orders", { params: query }).then(
        (res) => res.data.data ?? { orders: [], totalDocuments: 0 }
    );
}

export async function getOrderById(_id: string): Promise<OrderDetail> {
    return API.get<IResponse<OrderDetail>>(`/orders/${_id}`).then((res) => res.data.data!);
}
