import { getCartById, insertCart, updateCart, UpsertCart } from "@/apis/carts";
import { RootState } from "@/stores/client/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";


export const useGetCartByUser = () => {
    const user = useSelector((state: RootState) => state.user);
    const cartQuery = useQuery({
        queryKey: ["cart", user?._id],
        queryFn: async () => {
            if (user?.cartId) {
                return await getCartById(user.cartId);
            }
            return null;
        },
        enabled: !!user?.cartId,
        refetchOnWindowFocus: false,
    });
    return cartQuery;
}


export const addProductToNewCart = () => {
    const addProductToNewCartMutation = useMutation({
        mutationKey: ["addProductToCart"],
        mutationFn: insertCart,
        onSuccess: (data) => {
            return data;
        }
    })
    return addProductToNewCartMutation;
    
}

export const useUpdateProductCart = () => {
    const addProductToCartMutation = useMutation({
        mutationKey: ["addProductToCart"],
        mutationFn: ({ cartId, data }: { cartId: string, data: UpsertCart }) => updateCart(cartId, data),
        onSuccess: (data) => {
            return data;
        }
    })
    return addProductToCartMutation;
}