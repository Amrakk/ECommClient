import { useCartStore } from "@/stores/cart.store";
import { useUserStore } from "@/stores/user.store";
import { useMutation } from "@tanstack/react-query";
import { register, login, forgotPassword, logout, resetPassword, verify } from "@/apis/auth";

import type { CartDetail } from "@/models/cart";
import type { UserDetail } from "@/models/user";

interface IResLogin {
    user: UserDetail;
    cart: CartDetail | null;
}

export default function useAuth() {
    const setUser = useUserStore((state) => state.setUser);
    const setCart = useCartStore((state) => state.setCart);

    function onSuccess(data: IResLogin) {
        const { user, cart } = data;
        setUser(user);
        setCart(cart ?? undefined);
    }

    const registerMutate = useMutation({
        mutationKey: ["register"],
        mutationFn: register,
        onSuccess: onSuccess,
    });

    const loginMutate = useMutation({
        mutationKey: ["login"],
        mutationFn: login,
        onSuccess: onSuccess,
    });

    const logoutMutate = useMutation({
        mutationKey: ["logout"],
        mutationFn: logout,
        onSuccess: () => setUser(undefined),
    });

    const verifyMutate = useMutation({
        mutationKey: ["verify"],
        mutationFn: verify,
        onSuccess: onSuccess,
    });

    const forgotPasswordMutate = useMutation({
        mutationKey: ["forgotPassword"],
        mutationFn: forgotPassword,
    });

    const resetPasswordMutate = useMutation({
        mutationKey: ["resetPassword"],
        mutationFn: resetPassword,
    });

    return { registerMutate, loginMutate, logoutMutate, verifyMutate, forgotPasswordMutate, resetPasswordMutate };
}
