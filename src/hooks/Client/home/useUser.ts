import { updateUserByUser } from "@/apis/users";
import { useMutation } from "@tanstack/react-query";
 
export const useUpdateUserMutation = () => {
    const updateUserMutate = useMutation({
        mutationFn: updateUserByUser,
        mutationKey:  ["updateUser"],
        onSuccess: (data) => {
            return data
        }
    })
    return updateUserMutate
};