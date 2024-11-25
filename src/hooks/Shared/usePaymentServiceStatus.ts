import { useEffect } from "react";
import * as ServiceAPI from "@/apis/services";
import { useQuery } from "@tanstack/react-query";
import { usePaymentServiceStatusStore } from "@/stores/paymentServiceStatus.store";

export default function usePaymentServiceStatus() {
    const setPaymentServiceStatus = usePaymentServiceStatusStore((state) => state.setPaymentServiceStatus);

    const paymentServiceStatusQuery = useQuery({
        queryKey: ["payment-service-status"],
        queryFn: ServiceAPI.getPaymentServiceStatus,
    });

    useEffect(() => {
        if (!paymentServiceStatusQuery.data) return;

        setPaymentServiceStatus(paymentServiceStatusQuery.data);
    }, [paymentServiceStatusQuery.data]);

    return { paymentServiceStatusQuery };
}
