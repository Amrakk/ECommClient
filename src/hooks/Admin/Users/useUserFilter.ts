import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { USER_ROLE, USER_STATUS } from "@/constants";

export default function useUserFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get("searchTerm") ?? undefined;
    const role = (searchParams.get("role") ?? undefined) as USER_ROLE | undefined;
    const status = (searchParams.get("status") ?? undefined) as USER_STATUS | undefined;

    const changeFilter = useCallback(
        (searchTerm?: string, role?: USER_ROLE, status?: USER_STATUS) => {
            setSearchParams((params) => {
                if (searchTerm) params.set("searchTerm", searchTerm);
                else params.delete("searchTerm");

                if (role) params.set("role", role);
                else params.delete("role");

                if (status) params.set("status", status);
                else params.delete("status");

                return params;
            });
        },
        [setSearchParams]
    );

    return {
        searchTerm,
        role,
        status,
        changeFilter,
    };
}
