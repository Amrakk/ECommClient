import * as OrderAPI from "@/apis/orders";
import { useQuery } from "@tanstack/react-query";

export default function useOrderById(id: string) {
    const orderQuery = useQuery({
        queryKey: ["order"],
        queryFn: () => OrderAPI.getOrderById(id),
    });

    return orderQuery;
}
