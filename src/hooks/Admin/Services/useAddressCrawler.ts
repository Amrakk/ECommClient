import { useEffect, useState } from "react";
import * as ServiceAPI from "@/apis/services";
import { useQuery } from "@tanstack/react-query";

export default function useAddressCrawlerActions() {
    const [isFirstFetch, setIsFirstFetch] = useState<boolean>(true);

    const crawlQuery = useQuery({
        queryKey: ["crawl-address"],
        queryFn: ServiceAPI.crawlAddresses,
        enabled: false,
    });

    const getAddressCrawlerStatusAction = useQuery({
        queryKey: ["address-crawler-status"],
        queryFn: () => ServiceAPI.getAddressCrawlStatus({ instantResponse: isFirstFetch }),
    });

    useEffect(() => {
        if (getAddressCrawlerStatusAction.isFetched) setIsFirstFetch(false);
    }, [getAddressCrawlerStatusAction.isFetched]);

    return { crawlQuery, getAddressCrawlerStatusAction };
}
