import { updateUserByUser } from "@/apis/users";
import { RootState } from "@/stores/client/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
 
export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.user);
    const updateUserMutate = useMutation({
        mutationFn: updateUserByUser,
        mutationKey:  ["updateUser"],
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["cart", user?._id]
            });
            return data
        }
    })
    return updateUserMutate
};

