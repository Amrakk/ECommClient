import { ORDER_STATUS } from "@/constants";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export default function useOrderFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get("searchTerm") ?? undefined;
    const isPaid = searchParams.get("isPaid") === null ? undefined : searchParams.get("isPaid") === "true";
    const statuses = searchParams.getAll("statuses") as ORDER_STATUS[];

    const changeFilter = useCallback(
        (props: { searchTerm?: string; isPaid?: boolean; statuses?: ORDER_STATUS[] }) => {
            setSearchParams((params) => {
                if (props.searchTerm) params.set("searchTerm", props.searchTerm);
                else params.delete("searchTerm");

                if (typeof props.isPaid === "boolean") params.set("isPaid", `${props.isPaid}`);
                else params.delete("isPaid");

                params.delete("statuses");
                if (props.statuses && props.statuses.length > 0)
                    props.statuses.forEach((status) => params.append("statuses", status));

                return params;
            });
        },
        [setSearchParams]
    );

    return {
        searchTerm,
        isPaid,
        statuses,
        changeFilter,
    };
}
