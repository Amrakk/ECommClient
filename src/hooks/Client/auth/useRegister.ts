import { AuthenticateAPI } from "@/apis/client/auth/api"
import { useMutation } from "@tanstack/react-query"

export const useRegisterMutation = () => {
    const registerMutate = useMutation({
        mutationFn: AuthenticateAPI.registerClient,
        mutationKey:  ["register"],
        onSuccess: (data) => {
            return data
        }
    })
    return registerMutate
}