import { IoIosArrowDown } from "react-icons/io";
import { ReactElement, useRef, useState } from "react";
import { useDebounce } from "@/hooks/Shared/useDebounce";
import CustomRadio from "@/components/Shared/CustomRadio";
import FilterContent from "@/components/Shared/FilterContent";
import { ORDER_STATUS, ORDER_STATUS_LIST } from "@/constants";
import CustomCheckbox from "@/components/Shared/CustomCheckbox";
import Dropdown, { Option } from "@/components/Shared/Dropdown";
import useOrderFilter from "@/hooks/Admin/Orders/useOrderFilter";
import CustomTextField from "@/components/Shared/CustomTextField";

const timeRanges: Option<"7 days" | "30 days" | "Select">[] = [
    { name: "Select", value: "Select" },
    {
        name: "7 days",
        value: "7 days",
    },
    {
        name: "30 days",
        value: "30 days",
    },
];

export default function Filter() {
    const searchRef = useRef<HTMLInputElement>(null);
    const { searchTerm, isPaid, statuses, startDate, endDate, changeFilter } = useOrderFilter();

    const [open, setOpen] = useState(false);
    const [selectedIsPaid, setSelectedIsPaid] = useState<boolean | undefined>(isPaid);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
        endDate ? new Date(Date.parse(endDate)) : undefined
    );
    const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
        startDate ? new Date(Date.parse(startDate)) : undefined
    );
    const [selectedTimeRanges, setSelectedTimeRanges] = useState<"7 days" | "30 days" | "Select">("Select");
    const [selectedStatuses, setSelectedStatuses] = useState<ORDER_STATUS[]>([...statuses]);

    const changeFilterDebounce = useDebounce(changeFilter, 500);

    const elements = [
        {
            label: "Is Paid",
            builder: (): ReactElement => (
                <div className="flex gap-10 mt-4">
                    <CustomRadio
                        id="filterIsPaid"
                        name="isPaid"
                        value="true"
                        label="Paid"
                        onClick={() => (selectedIsPaid ? setSelectedIsPaid(undefined) : setSelectedIsPaid(true))}
                        checked={selectedIsPaid === true}
                    />
                    <CustomRadio
                        id="filterIsNotPaid"
                        name="isPaid"
                        value="false"
                        label="Not Paid"
                        onClick={() =>
                            selectedIsPaid === undefined || selectedIsPaid
                                ? setSelectedIsPaid(false)
                                : setSelectedIsPaid(undefined)
                        }
                        checked={selectedIsPaid === false}
                    />
                </div>
            ),
        },
        {
            label: "Status",
            builder: (): ReactElement => (
                <div className="mt-4 grid-cols-2 grid gap-x-12 w-max gap-y-1">
                    {ORDER_STATUS_LIST.map((status) => (
                        <div className="inline-block mb-2.5" key={status}>
                            <CustomCheckbox
                                id={`filterCategory${status}`}
                                key={status}
                                label={status.substring(0, 1).toUpperCase() + status.substring(1)}
                                onChange={(e) =>
                                    setSelectedStatuses((s) =>
                                        e.target.checked ? [...s, status] : s.filter((c) => c !== status)
                                    )
                                }
                                checked={selectedStatuses.includes(status)}
                                name="category"
                                value={status}
                            />
                        </div>
                    ))}
                </div>
            ),
        },
        {
            label: "Time Range",
            builder: (): ReactElement => (
                <div className="mt-4 w-[400px] grid gap-4">
                    {/* Time Range Dropdown */}
                    <div className="flex items-center gap-5 h-[50.5px]">
                        <Dropdown
                            direction="down"
                            selected={selectedTimeRanges}
                            variant="secondary"
                            compare={(a, b) => a === b}
                            onChange={(e) => {
                                if (e.value !== undefined) {
                                    setSelectedStartDate(undefined);
                                    setSelectedEndDate(undefined);
                                }
                                setSelectedTimeRanges(e.value);
                            }}
                            data={timeRanges}
                        />
                    </div>

                    {/* Start and End Date Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-max">
                        <div>
                            <CustomTextField
                                id="startDate"
                                label="Start Date"
                                type="date"
                                max={new Date().toISOString().substring(0, 10)}
                                value={selectedStartDate?.toISOString().substring(0, 10) ?? ""}
                                onChange={(e) => {
                                    setSelectedTimeRanges("Select");
                                    setSelectedStartDate(new Date(e.target.value));
                                }}
                            />
                        </div>
                        <div>
                            <CustomTextField
                                id="endDate"
                                label="End Date"
                                type="date"
                                value={selectedEndDate?.toISOString().substring(0, 10) ?? ""}
                                max={new Date().toISOString().substring(0, 10)}
                                onChange={(e) => {
                                    setSelectedTimeRanges("Select");
                                    setSelectedEndDate(new Date(e.target.value));
                                }}
                            />
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    function handleSearch() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);

        const startDate =
            selectedStartDate ?? selectedTimeRanges === "7 days"
                ? new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000)
                : selectedTimeRanges === "30 days"
                ? new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000)
                : undefined;

        setSelectedStartDate(startDate);
        changeFilterDebounce({
            searchTerm: searchRef.current?.value,
            isPaid: selectedIsPaid,
            statuses: selectedStatuses,
            startDate,
            endDate: selectedEndDate,
        });
    }

    function applyFilter() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);

        const startDate =
            selectedStartDate ?? selectedTimeRanges === "7 days"
                ? new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000)
                : selectedTimeRanges === "30 days"
                ? new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000)
                : undefined;

        setSelectedStartDate(startDate);
        changeFilter({
            searchTerm,
            isPaid: selectedIsPaid,
            statuses: selectedStatuses,
            startDate,
            endDate: selectedEndDate,
        });
        setOpen(false);
    }

    function resetFilter() {
        setSelectedStatuses([]);
        setSelectedIsPaid(undefined);
        setSelectedStartDate(undefined);
        setSelectedTimeRanges("Select");
        setSelectedEndDate(undefined);

        changeFilter({ searchTerm });
        setOpen(false);
    }

    return (
        <div className="bg-white p-4 shadow-md mb-4 rounded-md space-x-4">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder={"Search by name, email, phone number"}
                    ref={searchRef}
                    onChange={handleSearch}
                    className="border border-gray-300 px-4 py-2 rounded flex-1 focus:outline-none focus:border-gray-500"
                />
                <button
                    className="bg-black text-white px-4 py-2 rounded hover:bg-opacity-75 ml-2 font-bold select-none"
                    onClick={handleSearch}
                >
                    Search
                </button>

                <div className="w-1/4"></div>

                <div
                    className="border border-gray-300 px-4 rounded w-48 focus:outline-none focus:border-gray-500 relative"
                    id="filterBtn"
                >
                    <button
                        type="button"
                        className={`flex justify-between items-center p-2 rounded-md w-full`}
                        onClick={() => setOpen((s) => !s)}
                    >
                        {"Filter by"}
                        <IoIosArrowDown className={`${open ? "-rotate-180" : "rotate-0"} transition-transform`} />
                    </button>
                    {open && (
                        <FilterContent
                            elements={elements}
                            apply={applyFilter}
                            reset={resetFilter}
                            close={() => setOpen(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
