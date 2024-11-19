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
