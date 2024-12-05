import { checkout, Checkout } from "@/apis/orders"
import { useMutation } from "@tanstack/react-query"

const useCheckoutMutation = () => {
    const checkoutMutation = useMutation({
        mutationKey: ["checkout"],
        mutationFn: async (data: Checkout) => {
            return checkout(data)
        },
        onSuccess: (response) => {
            return response
        }
    })
    return checkoutMutation
}

export default useCheckoutMutation