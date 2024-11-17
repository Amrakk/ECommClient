import * as UserAPI from "@/apis/users";
import usePagination from "@/hooks/Shared/usePagination";
import { useQuery } from "@tanstack/react-query";
import useUserFilter from "./useUserFilter";

export default function useUsers() {
    const { currentPage, limitPage } = usePagination();
    const { searchTerm, role, status } = useUserFilter();

    const userQuery = useQuery({
        queryKey: ["users", currentPage, limitPage, searchTerm, role, status],
        queryFn: () => UserAPI.getUsers({ page: currentPage, limit: limitPage, searchTerm, role, status }),
    });

    return userQuery;
}
