import { useState } from "react";
import ReactApexChart from "react-apexcharts";

import type { ApexOptions } from "apexcharts";
import type { TimeRanges } from "@/apis/services/getDashboardData";

const defaultOptions: ApexOptions = {
    legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
        fontFamily: "Satoshi, sans-serif",
        height: 335,
        type: "area",
        dropShadow: {
            enabled: true,
            color: "#623CEA14",
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
        },

        toolbar: {
            show: false,
        },
    },
    responsive: [
        {
            breakpoint: 1024,
            options: {
                chart: {
                    height: 300,
                },
            },
        },
        {
            breakpoint: 1366,
            options: {
                chart: {
                    height: 350,
                },
            },
        },
    ],
    stroke: {
        width: [2, 2],
        curve: "straight",
    },
    grid: {
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 4,
        colors: "#fff",
        strokeColors: ["#3056D3", "#80CAEE"],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
            size: undefined,
            sizeOffset: 5,
        },
    },
    xaxis: {
        type: "category",
        categories: [],
        labels: {
            style: {
                fontSize: "10px",
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        min: 0,
        max: 100,
        labels: {
            style: {
                fontSize: "10px",
            },
            formatter: (value: number) => value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0,
        },
    },
    tooltip: {
        enabled: true,
        y: {
            formatter: (value: number) => value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
        },
    },
};

interface ChartState {
    series: {
        name: string;
        data: number[];
    }[];
}

const ranges: TimeRanges[] = ["7 Days", "30 Days", "6 Months", "1 Year", "All Time"];

type Props = {
    data: Record<TimeRanges, number[]>;
};

function getCategories(range: string, length?: number): string[] {
    const currentDate = new Date();

    if (range === "7 Days") {
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            return date.toLocaleDateString();
        }).reverse();
    }
    if (range === "30 Days") {
        return Array.from({ length: 30 }, (_, i) => {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            return date.toLocaleDateString();
        }).reverse();
    }

    if (range === "6 Months") {
        return Array.from({ length: 6 }, (_, i) => {
            const date = new Date(currentDate);
            date.setMonth(date.getMonth() - i);
            return date.toLocaleDateString("en-US", { month: "short" });
        }).reverse();
    }
    if (range === "1 Year") {
        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date(currentDate);
            date.setMonth(date.getMonth() - i);
            return date.toLocaleDateString("en-US", { month: "short" });
        }).reverse();
    }

    return Array.from({ length: length ?? 5 }, (_, i) => {
        const date = new Date(currentDate);
        date.setFullYear(date.getFullYear() - i);
        return date.toLocaleDateString("en-US", { year: "numeric" });
    }).reverse();
}

export default function RevenueChart(props: Props) {
    const [options, setOptions] = useState<ApexOptions>({
        ...defaultOptions,
        xaxis: {
            ...defaultOptions.xaxis,
            type: "category",
            categories: getCategories("7 Days"),
        },
        yaxis: {
            ...defaultOptions.yaxis,
            min: Math.floor(Math.min(...props.data["7 Days"]) * 0.9),
            max: Math.ceil(Math.max(...props.data["7 Days"]) * 1.1),
        },
    });
    const [selectedRange, setSelectedRange] = useState<string>("7 Days");
    const [state, setState] = useState<ChartState>({ series: [{ name: "Revenue", data: props.data["7 Days"] }] });

    function handleRangeChange(range: TimeRanges) {
        setSelectedRange(range);

        const newData = props.data[range];
        const categories = getCategories(range, range === "All Time" ? newData.length : undefined);
        const maxValue = Math.max(...newData);
        const minValue = Math.min(...newData);

        setState({ series: [{ name: "Revenue", data: newData }] });

        setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
                ...prevOptions.xaxis,
                categories,
                type: range === "All Time" ? "numeric" : "category",
            },
            yaxis: {
                ...prevOptions.yaxis,
                min: Math.floor(minValue * 0.9),
                max: Math.ceil(maxValue * 1.1),
            },
        }));
    }

    return (
        <div className="col-span-12 rounded-lg border border-stroke bg-white px-5 pt-7 pb-5 shadow-default">
            <div className="flex justify-between gap-3">
                <p className="font-semibold w-full text-2xl text-primary">Total Revenue</p>
                <div className="flex w-full max-w-45 justify-end">
                    <div className="inline-flex items-center rounded-md bg-black p-1.5 gap-1">
                        {ranges.map((range) => (
                            <button
                                key={range}
                                onClick={() => handleRangeChange(range)}
                                className={`rounded py-1 px-3 text-xs font-medium ${
                                    selectedRange === range ? "bg-white text-black" : "text-white"
                                } shadow-card hover:bg-white hover:shadow-card hover:text-black transition-all`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart options={options} series={state.series} type="area" height={350} />
                </div>
            </div>
        </div>
    );
}
