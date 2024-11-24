import { AuthenticateAPI } from "@/apis/client/auth/api"
import { useMutation } from "@tanstack/react-query"

export const useResetPasswordMutation = () => {
    const resetPasswordMutate = useMutation({
        mutationFn: AuthenticateAPI.resetPasswordClient,
        onSuccess: (data) => {
            return data
        }
    })
    return resetPasswordMutate
}

export const useSendEmailOtpMutation = () => {
    const sendEmailOtpMutate = useMutation({
        mutationFn: AuthenticateAPI.sendEmailOtpClient,
        mutationKey: ["sendEmailOtp"],
        onSuccess: (data) => {
            return data
        },
    })
    return sendEmailOtpMutate
}