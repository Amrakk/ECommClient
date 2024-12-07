import { getTransactionByOrderId } from "@/apis/transactions"
import { useQuery } from "@tanstack/react-query"

export const useGetTransactionByOrderIdQuery = (orderId: string) => {
    const getTransactionByOrderIdQuery = useQuery({
        queryKey: ["getTransactionByOrderId", orderId],
        queryFn: () => getTransactionByOrderId(orderId),
    })
    return getTransactionByOrderIdQuery
}