import { useState } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import Dropdown, { Option } from "@/components/Shared/Dropdown";

import type { DashboardData } from "@/apis/services";

const defaultColors = ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"];

const defaultOptions: ApexOptions = {
    chart: {
        fontFamily: "Satoshi, sans-serif",
        type: "donut",
    },
    colors: defaultColors,
    legend: {
        show: false,
        position: "bottom",
    },
    plotOptions: {
        pie: {
            donut: {
                size: "65%",
                background: "transparent",
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    responsive: [
        {
            breakpoint: 2600,
            options: {
                chart: {
                    width: 380,
                },
            },
        },
        {
            breakpoint: 640,
            options: {
                chart: {
                    width: 200,
                },
            },
        },
    ],
};

type TimeRange = "day" | "week" | "month";
const timeRanges: Option<TimeRange>[] = [
    { name: "Day", value: "day" },
    { name: "Week", value: "week" },
    { name: "Month", value: "month" },
];

interface State {
    series: number[];
    labels: string[];
}

type Props = {
    data: DashboardData["topProductData"];
};

export default function TopProductChart({ data }: Props) {
    const [state, setState] = useState<State>({
        series: data.day.map((item) => item.value),
        labels: data.day.map((item) => item.name),
    });

    function handleTimeRangeChange(range: TimeRange) {
        const updatedData = data[range];
        setState({
            series: updatedData.map((item) => item.value),
            labels: updatedData.map((item) => item.name),
        });
    }

    return (
        <div className="rounded-lg border border-stroke bg-white px-5 pb-5 pt-7 shadow-default col-span-6">
            <div className="mb-3 justify-between gap-4 flex">
                <div>
                    <h5 className="text-xl font-semibold text-black">Top Products</h5>
                </div>
                <div>
                    <div className="relative z-20 inline-block w-32">
                        <Dropdown
                            variant="secondary"
                            direction="down"
                            data={timeRanges}
                            onChange={(e) => handleTimeRangeChange(e.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-2">
                <div id="topProductChart" className="mx-auto flex justify-center relative items-center">
                    <ReactApexChart
                        options={{
                            ...defaultOptions,
                            labels: state.labels,
                        }}
                        series={state.series}
                        type="donut"
                    />
                    {state.series.length === 0 && <div className="absolute ">No Data</div>}
                </div>
            </div>

            <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                {state.labels.map((label, index) => (
                    <div key={label} className="sm:w-1/2 px-8">
                        <div className="flex w-full items-center">
                            <span
                                className={`mr-2 block h-3 w-full max-w-3 rounded-full`}
                                style={{
                                    backgroundColor: defaultColors[index] || "#ccc",
                                }}
                            ></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black">
                                <span>{label}</span>
                                <span>
                                    {state.series[index]} <span className="text-gray-500">Sales</span>
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
