import Header from "@/components/Admin/Dashboard/Header";
import { useLoadingStore } from "@/stores/loading.store";
import NewUsers from "@/components/Admin/Dashboard/NewUsers";
import RevenueChart from "@/components/Admin/Dashboard/RevenueChart";
import { useDashboardData } from "@/hooks/Admin/Services/useDashboard";
import TopProductChart from "@/components/Admin/Dashboard/TopProductChart";

export default function Dashboard() {
    const dashboardQuery = useDashboardData();
    const setLoading = useLoadingStore((state) => state.setLoading);

    if (dashboardQuery.isLoading) setLoading(true);
    else setLoading(false);

    const dashboardData = dashboardQuery.data;

    return (
        <>
            <div className="grid grid-cols-4 gap-6 p-6">
                <div className="col-span-3 flex flex-col gap-6 fade-in">
                    {dashboardData ? (
                        <Header data={dashboardData.headerData} />
                    ) : (
                        <div className="bg-gray-300 rounded-lg h-40 animate-pulse" />
                    )}

                    <div className="grid grid-cols-12 gap-6 fade-in">
                        {dashboardData ? (
                            <>
                                <RevenueChart data={dashboardData.revenueData} />
                                <TopProductChart data={dashboardData.topProductData} />
                            </>
                        ) : (
                            <>
                                <div className="bg-gray-300 rounded-lg h-[450px] col-span-12 animate-pulse" />
                                <div className="bg-gray-300 rounded-lg h-[430px] col-span-6 animate-pulse" />
                            </>
                        )}
                    </div>
                </div>

                <div className="col-span-1 fade-in">
                    {dashboardData ? (
                        <NewUsers data={dashboardData.newUserData} />
                    ) : (
                        <div className="bg-gray-300 rounded-lg h-72 animate-pulse" />
                    )}
                </div>
            </div>
        </>
    );
}
