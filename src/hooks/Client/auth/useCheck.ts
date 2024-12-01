import { AuthenticateAPI } from "@/apis/client/auth/api"
import { useMutation } from "@tanstack/react-query";

export const useVerifyMutation = () => {
    const verifyMutate = useMutation({
        mutationKey: ["verify"],
        mutationFn: AuthenticateAPI.verifyClient,
        onSuccess: (data) => {
            return data
        },
    })
    return verifyMutate
}
