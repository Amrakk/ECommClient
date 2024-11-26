import StatCard from "./StatCard";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiChartLineUpBold, PiShoppingCartBold } from "react-icons/pi";

import type { DashboardData } from "@/apis/services";
import { FaInfinity } from "react-icons/fa6";

type Props = {
    data: DashboardData["headerData"];
};

export default function Header(props: Props) {
    const { data } = props;
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-8">
            <StatCard
                title="Total Order"
                total={`${data.orders.total.toLocaleString()}`}
                rate={() => `${data.orders.dailyRate}%`}
                levelUp={data.orders.dailyRate > 0}
                levelDown={data.orders.dailyRate < 0}
                onClick={() => navigate("/admin/orders")}
            >
                <PiShoppingCartBold className="text-black" size={22} />
            </StatCard>
            <StatCard
                title="Daily Revenue"
                total={`${data.revenue.total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}`}
                rate={() => {
                    if (data.revenue.dailyRate === Number.MAX_SAFE_INTEGER)
                        return (
                            <div className="flex items-center">
                                <FaInfinity className="text-meta-3" size={14} />%
                            </div>
                        );
                    return `${data.revenue.dailyRate}%`;
                }}
                levelUp={data.revenue.dailyRate > 0}
                levelDown={data.revenue.dailyRate < 0}
            >
                <PiChartLineUpBold className="text-black" size={22} />
            </StatCard>
            <StatCard
                title="Total Users"
                total={`${data.users.total.toLocaleString()}`}
                rate={() => `${data.users.dailyRate}%`}
                levelUp={data.users.dailyRate > 0}
                levelDown={data.users.dailyRate < 0}
                onClick={() => navigate("/admin/users")}
            >
                <HiOutlineUserGroup className="text-black" size={22} />
            </StatCard>
        </div>
    );
}
