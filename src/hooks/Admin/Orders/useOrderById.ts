import * as OrderAPI from "@/apis/orders";
import { useQuery } from "@tanstack/react-query";

export default function useOrderById(id: string) {
    const orderQuery = useQuery({
        queryKey: ["order", id],
        queryFn: () => OrderAPI.getOrderById(id),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return orderQuery;
}
