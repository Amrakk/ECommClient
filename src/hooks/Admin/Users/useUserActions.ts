import * as UserAPI from "@/apis/users";
import { useMutation } from "@tanstack/react-query";

export default function useUserActions() {
    const insertAction = useMutation({
        mutationKey: ["user-insert"],
        mutationFn: UserAPI.insertUser,
    });

    const updateAction = useMutation({
        mutationKey: ["user-update-admin"],
        mutationFn: UserAPI.updateUserByAdmin,
    });

    const updateAvatarAction = useMutation({
        mutationKey: ["user-update-avatar"],
        mutationFn: UserAPI.updateUserAvatar,
    });

    const deleteAction = useMutation({
        mutationKey: ["user-delete"],
        mutationFn: UserAPI.deleteUser,
    });

    return { insertAction, updateAction, updateAvatarAction, deleteAction };
}
