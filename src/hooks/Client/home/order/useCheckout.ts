import { checkout, Checkout } from "@/apis/orders"
import { RootState } from "@/stores/client/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  useSelector } from "react-redux"

const useCheckoutMutation = () => {
    const user = useSelector((state: RootState) => state.user)
    const queryClient = useQueryClient()
    const checkoutMutation = useMutation({
        mutationKey: ["checkout"],
        mutationFn: async (data: Checkout) => {
            return checkout(data)
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ["cart", user?._id]
            });
            return response
        }
    })
    return checkoutMutation
}

export default useCheckoutMutation