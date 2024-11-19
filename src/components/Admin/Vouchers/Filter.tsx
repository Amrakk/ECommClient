import { DISCOUNT_TYPE } from "@/constants";
import { IoIosArrowDown } from "react-icons/io";
import { ReactElement, useRef, useState } from "react";
import { useDebounce } from "@/hooks/Shared/useDebounce";
import CustomRadio from "@/components/Shared/CustomRadio";
import FilterContent from "@/components/Shared/FilterContent";
import useVoucherFilter from "@/hooks/Admin/Vouchers/useVoucherFilter";

export default function Filter() {
    const searchRef = useRef<HTMLInputElement>(null);
    const { code, discountType, used, changeFilter } = useVoucherFilter();

    const [open, setOpen] = useState(false);
    const [selectedIsUsed, setSelectedIsUsed] = useState<boolean | undefined>(used);
    const [selectedDiscountType, setSelectedDiscountType] = useState<DISCOUNT_TYPE | undefined>(discountType);

    const changeFilterDebounce = useDebounce(changeFilter, 500);

    const elements = [
        {
            label: "Is Used",
            builder: (): ReactElement => (
                <div className="flex gap-10 mt-4">
                    <CustomRadio
                        id="filterIsUsed"
                        name="isUsed"
                        value="true"
                        label="Used"
                        onClick={() => (selectedIsUsed ? setSelectedIsUsed(undefined) : setSelectedIsUsed(true))}
                        checked={selectedIsUsed === true}
                    />
                    <CustomRadio
                        id="filterIsNotPaid"
                        name="isUsed"
                        value="false"
                        label="Not Used"
                        onClick={() =>
                            selectedIsUsed === undefined || selectedIsUsed
                                ? setSelectedIsUsed(false)
                                : setSelectedIsUsed(undefined)
                        }
                        checked={selectedIsUsed === false}
                    />
                </div>
            ),
        },
        {
            label: "Discount Type",
            builder: (): ReactElement => (
                <div className="flex gap-10">
                    <CustomRadio
                        id="filterFixedType"
                        name="discountType"
                        value="fixed"
                        label="Fixed"
                        onClick={() =>
                            selectedDiscountType === DISCOUNT_TYPE.FIXED
                                ? setSelectedDiscountType(undefined)
                                : setSelectedDiscountType(DISCOUNT_TYPE.FIXED)
                        }
                        checked={selectedDiscountType === DISCOUNT_TYPE.FIXED}
                    />
                    <CustomRadio
                        id="filterPercentageType"
                        name="discountType"
                        value="percentage"
                        label="Percentage"
                        onClick={() =>
                            selectedDiscountType === DISCOUNT_TYPE.PERCENT
                                ? setSelectedDiscountType(undefined)
                                : setSelectedDiscountType(DISCOUNT_TYPE.PERCENT)
                        }
                        checked={selectedDiscountType === DISCOUNT_TYPE.PERCENT}
                    />
                </div>
            ),
        },
    ];

    function handleSearch() {
        changeFilterDebounce({
            code: searchRef.current?.value,
            used: selectedIsUsed,
            discountType: selectedDiscountType,
        });
    }

    function applyFilter() {
        changeFilter({
            code,
            used: selectedIsUsed,
            discountType: selectedDiscountType,
        });
        setOpen(false);
    }

    function resetFilter() {
        setSelectedIsUsed(undefined);
        setSelectedDiscountType(undefined);

        changeFilter({ code });
        setOpen(false);
    }

    return (
        <div className="bg-white p-4 shadow-md mb-4 rounded-md space-x-4">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder={"Search by voucher code"}
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
