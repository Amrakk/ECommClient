import * as OrderAPI from "@/apis/orders";
import { useMutation } from "@tanstack/react-query";

export function useOrderActions() {
    const updateOrder = useMutation({
        mutationKey: ["updateOrder"],
        mutationFn: OrderAPI.updateOrder,
    });

    const deleteOrder = useMutation({
        mutationKey: ["deleteOrder"],
        mutationFn: OrderAPI.deleteOrder,
    });

    return { updateOrder, deleteOrder };
}
