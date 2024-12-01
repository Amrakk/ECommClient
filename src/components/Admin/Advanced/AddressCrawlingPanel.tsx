import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import useAddressCrawlerActions from "@/hooks/Admin/Services/useAddressCrawler";

import type { AddressCrawlStatus } from "@/apis/services";

const defaultCrawlStatus: AddressCrawlStatus = {
    isCrawling: false,
    start: null,
    end: null,
    duration: "0ms",
    stat: {
        provinces: { length: 0, size: "0 KB" },
        districts: { length: 0, size: "0 KB" },
        wards: { length: 0, size: "0 KB" },
    },
};

export default function AddressCrawlingPanel() {
    const { crawlQuery, getAddressCrawlerStatusAction } = useAddressCrawlerActions();

    const [crawlStatus, setCrawlStatus] = useState<AddressCrawlStatus>(defaultCrawlStatus);
    const [currentTime, setCurrentTime] = useState<string>("0s");

    async function fetchCrawlerStatus() {
        const status = await getAddressCrawlerStatusAction.refetch();

        if (status.data) {
            setCrawlStatus(status.data);
            if (status.data.end) {
                toast.success("Crawling completed successfully!", { toastId: "address-crawl" });
            } else if (status.data.isCrawling) {
                await fetchCrawlerStatus();
            }
        }
    }

    useEffect(() => {
        setCrawlStatus(getAddressCrawlerStatusAction.data ?? defaultCrawlStatus);
        if (getAddressCrawlerStatusAction.data?.end)
            setCurrentTime(getAddressCrawlerStatusAction.data?.duration ?? "0s");
    }, [getAddressCrawlerStatusAction.data]);

    useEffect(() => {
        if (crawlStatus.isCrawling && crawlStatus.start) {
            const interval = setInterval(() => {
                const now = new Date();
                let elapsedTime = (now.getTime() - new Date(`${crawlStatus.start}`).getTime()) / 1000;
                elapsedTime = Math.max(0, elapsedTime);
                setCurrentTime(`${Math.floor(elapsedTime)}s`);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [crawlStatus.isCrawling, crawlStatus.start]);

    async function handleCrawl() {
        if (crawlStatus.isCrawling) {
            toast.error("Crawling is already in progress!", { toastId: "address-crawl" });
            return;
        }

        const status = await crawlQuery.refetch();

        setCrawlStatus(status.data ?? defaultCrawlStatus);
        fetchCrawlerStatus();
        toast.success("Crawling started!", { toastId: "address-crawl" });
    }

    return (
        <div className="bg-white shadow-md rounded-md p-6 mx-auto size-full">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-800">Address Crawler</h1>
                <button
                    className={`flex items-center gap-2 p-3 rounded-md text-base font-bold transition-all duration-150 
                        ${
                            crawlStatus.isCrawling
                                ? "bg-gray-200 text-gray-600"
                                : "bg-black text-white hover:bg-gray-900"
                        }`}
                    onClick={handleCrawl}
                    disabled={crawlStatus.isCrawling}
                >
                    {crawlStatus.isCrawling ? (
                        <>
                            <span className="animate-pulse">Crawling...</span>
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">{currentTime}</span>
                        </>
                    ) : (
                        "Start Crawl"
                    )}
                </button>
            </div>

            {/* Statistics Section */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(crawlStatus.stat).map(([key, value]) => (
                    <div
                        key={key}
                        className="p-4 border rounded-md shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
                    >
                        <h3 className="font-medium text-gray-600 capitalize">{key}</h3>
                        <p className="text-sm text-gray-500">
                            <strong>Count:</strong> {value.length}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Size:</strong> {value.size}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
