import { ORDER_STATUS } from "@/constants";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export default function useOrderFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get("searchTerm") ?? undefined;
    const isPaid = searchParams.get("isPaid") === null ? undefined : searchParams.get("isPaid") === "true";
    const statuses = searchParams.getAll("statuses") as ORDER_STATUS[];
    const startDate = searchParams.get("startDate") ?? undefined;
    const endDate = searchParams.get("endDate") ?? undefined;

    const changeFilter = useCallback(
        (props: {
            searchTerm?: string;
            isPaid?: boolean;
            statuses?: ORDER_STATUS[];
            startDate?: Date;
            endDate?: Date;
        }) => {
            setSearchParams((params) => {
                if (props.searchTerm) params.set("searchTerm", props.searchTerm);
                else params.delete("searchTerm");

                if (typeof props.isPaid === "boolean") params.set("isPaid", `${props.isPaid}`);
                else params.delete("isPaid");

                params.delete("statuses");
                if (props.statuses && props.statuses.length > 0)
                    props.statuses.forEach((status) => params.append("statuses", status));

                if (props.startDate) params.set("startDate", props.startDate.toISOString());
                else params.delete("startDate");

                if (props.endDate) params.set("endDate", props.endDate.toISOString());
                else params.delete("endDate");

                return params;
            });
        },
        [setSearchParams]
    );

    return {
        searchTerm,
        isPaid,
        statuses,
        startDate,
        endDate,
        changeFilter,
    };
}
