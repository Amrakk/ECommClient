import { API } from "@/apis/api";

import type { IResponse } from "@/interfaces/response";

export type Metric = {
    total: number;
    dailyRate: number;
};

export type UserData = {
    _id: string;
    name: string;
    avatarUrl: string;
};

export type TimeRanges = "7 Days" | "30 Days" | "6 Months" | "1 Year" | "All Time";

export type ProductStat = {
    name: string;
    value: number;
};

export interface DashboardData {
    newUserData: {
        users: UserData[];
        total: number;
    };
    revenueData: Record<TimeRanges, number[]>;
    topProductData: Record<"day" | "week" | "month", ProductStat[]>;
    headerData: Record<"orders" | "revenue" | "users", Metric>;
}

export async function getDashboardData(): Promise<DashboardData> {
    return API.get<IResponse<DashboardData>>("/services/dashboard").then((res) => res.data.data!);
}
