import * as OrderAPI from "@/apis/orders";
import useOrderFilter from "./useOrderFilter.js";
import { useQuery } from "@tanstack/react-query";
import usePagination from "@/hooks/Shared/usePagination";

export default function useOrders() {
    const { currentPage, limitPage } = usePagination();
    const { searchTerm, isPaid, statuses, startDate, endDate } = useOrderFilter();

    const orderQuery = useQuery({
        queryKey: ["orders", currentPage, limitPage, searchTerm, isPaid, statuses, startDate, endDate],
        queryFn: () =>
            OrderAPI.getOrders({
                page: currentPage,
                limit: limitPage,
                searchTerm,
                isPaid,
                statuses,
                startDate,
                endDate,
            }),
    });

    return orderQuery;
}
