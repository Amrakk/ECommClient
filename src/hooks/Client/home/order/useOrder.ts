import { getOrderByUserId } from "@/apis/client/home/order/api";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderByUserIdQuery = () => {
    const getOrderByUserIdQuery = useQuery({
        queryKey: ["AllOrdersByUserId"],
        queryFn: () => getOrderByUserId(),
        refetchOnWindowFocus: false,
    });
    return getOrderByUserIdQuery;

};