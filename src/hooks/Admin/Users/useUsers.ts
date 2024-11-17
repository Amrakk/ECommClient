import * as UserAPI from "@/apis/users";
import useUserFilter from "./useUserFilter";
import { useQuery } from "@tanstack/react-query";
import usePagination from "@/hooks/Shared/usePagination";

export default function useUsers() {
    const { currentPage, limitPage } = usePagination();
    const { searchTerm, role, status } = useUserFilter();

    const userQuery = useQuery({
        queryKey: ["users", currentPage, limitPage, searchTerm, role, status],
        queryFn: () => UserAPI.getUsers({ page: currentPage, limit: limitPage, searchTerm, role, status }),
    });

    return userQuery;
}
