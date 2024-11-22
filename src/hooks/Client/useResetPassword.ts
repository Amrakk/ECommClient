import { AuthenticateAPI } from "@/apis/client/auth/AuthenticateAPI"
import { useMutation } from "@tanstack/react-query"

export const useResetPassword = () => {
    const resetPasswordMutate = useMutation({
        mutationFn: AuthenticateAPI.resetPassword,
        mutationKey: ["resetPassword"],
        onSuccess: () => {
            return Promise.resolve("Password reset successful")
        },
        onError: () => {
            return Promise.reject("Something went wrong")
        }
    })
    return resetPasswordMutate
}