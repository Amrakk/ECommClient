import { useMutation } from "@tanstack/react-query";
import * as TransactionAPI from "@/apis/transactions";

export function useTransactionActions() {
    const updateTransaction = useMutation({
        mutationKey: ["updateTransaction"],
        mutationFn: TransactionAPI.updateTransactionByOrderId,
    });

    return { updateTransaction };
}
