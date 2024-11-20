import { IoIosArrowDown } from "react-icons/io";
import { USER_ROLE, USER_STATUS } from "@/constants";
import { ReactElement, useRef, useState } from "react";
import { useDebounce } from "@/hooks/Shared/useDebounce";
import CustomRadio from "@/components/Shared/CustomRadio";
import FilterContent from "@/components/Shared/FilterContent";
import useUserFilter from "@/hooks/Admin/Users/useUserFilter";

export default function Filter() {
    const searchRef = useRef<HTMLInputElement>(null);
    const { searchTerm, role, status, changeFilter } = useUserFilter();

    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<USER_ROLE | undefined>(role);
    const [selectedStatus, setSelectedStatus] = useState<USER_STATUS | undefined>(status);

    const changeFilterDebounce = useDebounce(changeFilter, 500);

    const elements = [
        {
            label: "Role",
            builder: (): ReactElement => (
                <div className="flex gap-10">
                    <CustomRadio
                        id="filterRoleAdmin"
                        name="role"
                        value="admin"
                        label="Admin"
                        onChange={(e) => setSelectedRole(e.target.value as USER_ROLE)}
                        checked={selectedRole === "admin"}
                    />
                    <CustomRadio
                        id="filterRoleUser"
                        name="role"
                        value="customer"
                        label="Customer"
                        onChange={(e) => setSelectedRole(e.target.value as USER_ROLE)}
                        checked={selectedRole === "customer"}
                    />
                </div>
            ),
        },
        {
            label: "Status",
            builder: (): ReactElement => (
                <div className="flex gap-10">
                    <CustomRadio
                        id="filterNormalStatus"
                        name="status"
                        value="normal"
                        label="Normal"
                        onChange={(e) => setSelectedStatus(e.target.value as USER_STATUS)}
                        checked={selectedStatus === "normal"}
                    />
                    <CustomRadio
                        id="filterBlockedStatus"
                        name="status"
                        value="blocked"
                        label="Blocked"
                        onChange={(e) => setSelectedStatus(e.target.value as USER_STATUS)}
                        checked={selectedStatus === "blocked"}
                    />
                </div>
            ),
        },
    ];

    function handleSearch() {
        changeFilterDebounce(searchRef.current!.value, selectedRole, selectedStatus);
    }

    function applyFilter() {
        changeFilter(searchTerm, selectedRole, selectedStatus);
        setOpen(false);
    }

    function resetFilter() {
        setSelectedRole(undefined);
        setSelectedStatus(undefined);

        changeFilter(searchTerm);
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
                    className="bg-black text-white px-4 py-2 rounded hover:bg-opacity-75 ml-2 font-bold"
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
