import { useEffect, useState } from "react";
import * as ServiceAPI from "@/apis/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function usePCYActions() {
    const [isFirstFetch, setIsFirstFetch] = useState<boolean>(true);

    const analyzeAction = useMutation({
        mutationKey: ["pcy-analyze"],
        mutationFn: ServiceAPI.analyze,
    });

    const pcyStatusQuery = useQuery({
        queryKey: ["pcy-status"],
        queryFn: () => ServiceAPI.getJobStatus({ instantResponse: isFirstFetch }),
    });

    useEffect(() => {
        if (pcyStatusQuery.isFetched) setIsFirstFetch(false);
    }, [pcyStatusQuery.isFetched]);

    return { analyzeAction, pcyStatusQuery };
}
