import { AuthenticateAPI } from "@/apis/client/auth/api";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
    const loginMutate = useMutation({
        mutationFn: AuthenticateAPI.loginClient,
        onSuccess: (data) => {
            return data
        }
    });
    return loginMutate
}