import * as UserAPI from "@/apis/users";
import { useQuery } from "@tanstack/react-query";

export default function useUserById(id: string) {
    const userQuery = useQuery({
        queryKey: ["user"],
        queryFn: () => UserAPI.getUserById(id),
    });

    return userQuery;
}
