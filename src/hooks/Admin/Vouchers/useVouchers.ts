import * as VoucherAPI from "@/apis/vouchers";
import { useQuery } from "@tanstack/react-query";
import useVoucherFilter from "./useVoucherFilter";
import usePagination from "@/hooks/Shared/usePagination";

export default function useVouchers() {
    const { currentPage, limitPage } = usePagination();
    const { code, discountType, used } = useVoucherFilter();

    const voucherQuery = useQuery({
        queryKey: ["vouchers", currentPage, limitPage, code, discountType, used],
        queryFn: () => VoucherAPI.getVouchers({ page: currentPage, limit: limitPage, code, discountType, used }),
    });

    return voucherQuery;
}
