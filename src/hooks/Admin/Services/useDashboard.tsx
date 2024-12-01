import * as ServiceAPI from "@/apis/services";
import { useQuery } from "@tanstack/react-query";

export const useDashboardData = () => {
    const dashboardQuery = useQuery({
        queryKey: ["dashboard"],
        queryFn: ServiceAPI.getDashboardData,
    });

    return dashboardQuery;
};
