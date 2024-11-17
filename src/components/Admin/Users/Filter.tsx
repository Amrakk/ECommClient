import { IoIosArrowDown } from "react-icons/io";
import { USER_ROLE, USER_STATUS } from "@/constants";
import { useDebounce } from "@/hooks/Shared/useDebounce";
import FilterContent from "@/components/Shared/FilterContent";
import useUserFilter from "@/hooks/Admin/Users/useUserFilter";
import CustomCheckbox from "@/components/Shared/CustomCheckbox";
import { ReactElement, useEffect, useRef, useState } from "react";

export default function Filter() {
    const searchRef = useRef<HTMLInputElement>(null);

    const [open, setOpen] = useState(false);
    const [role, setRole] = useState<USER_ROLE | undefined>(undefined);
    const [status, setStatus] = useState<USER_STATUS | undefined>(undefined);

    const { searchTerm, changeFilter } = useUserFilter();
    const changeFilterDebounce = useDebounce(changeFilter, 500);

    const elements = [
        {
            label: "Role",
            builder: (): ReactElement => (
                <div className="flex gap-10">
                    <CustomCheckbox
                        id="filterRoleAdmin"
                        name="role"
                        value="admin"
                        label="Admin"
                        onChange={(e) => setRole(e.target.value as USER_ROLE)}
                        checked={role === "admin"}
                    />
                    <CustomCheckbox
                        id="filterRoleUser"
                        name="role"
                        value="customer"
                        label="Customer"
                        onChange={(e) => setRole(e.target.value as USER_ROLE)}
                        checked={role === "customer"}
                    />
                </div>
            ),
        },
        {
            label: "Status",
            builder: (): ReactElement => (
                <div className="flex gap-10">
                    <CustomCheckbox
                        id="filterNormalStatus"
                        name="status"
                        value="normal"
                        label="Normal"
                        onChange={(e) => setStatus(e.target.value as USER_STATUS)}
                        checked={status === "normal"}
                    />
                    <CustomCheckbox
                        id="filterBlockedStatus"
                        name="status"
                        value="blocked"
                        label="Blocked"
                        onChange={(e) => setStatus(e.target.value as USER_STATUS)}
                        checked={status === "blocked"}
                    />
                </div>
            ),
        },
    ];

    function handleSearch() {
        changeFilterDebounce(searchRef.current!.value, role, status);
    }

    function applyFilter() {
        changeFilter(searchTerm, role, status);
        setOpen(false);
    }

    function resetFilter() {
        setRole(undefined);
        setStatus(undefined);

        changeFilter(searchTerm);
        setOpen(false);
    }

    useEffect(() => {
        changeFilter();
    }, []);

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
                    className="bg-black text-white px-4 py-2 rounded hover:bg-opacity-75 ml-2 font-bold"
                    onClick={handleSearch}
                >
                    Search
                </button>

                <div
                    className="border border-gray-300 px-4 rounded w-48 focus:outline-none focus:border-gray-500 ml-96 relative"
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
