import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";
import useBrands from "@/hooks/Admin/Products/useBrands";
import { useDebounce } from "@/hooks/Shared/useDebounce";
import FilterContent from "@/components/Shared/FilterContent";
import CustomCheckbox from "@/components/Shared/CustomCheckbox";
import RatingSelector from "@/components/Shared/RatingSelector";
import { ReactElement, useEffect, useRef, useState } from "react";
import MultiRangeSlider from "@/components/Shared/MultiRangeSlider";
import { PRODUCT_CATEGORY, PRODUCT_CATEGORY_LIST } from "@/constants";
import useProductFilter from "@/hooks/Admin/Products/useProductFilter";

export default function Filter() {
    const brands = useBrands();
    const searchRef = useRef<HTMLInputElement>(null);

    const [open, setOpen] = useState(false);

    const [categories, setCategory] = useState<PRODUCT_CATEGORY[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const [minRating, setMinRating] = useState<number | undefined>(undefined);
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

    const { name, changeFilter } = useProductFilter();
    const changeFilterDebounce = useDebounce(changeFilter, 500);

    if (brands.error) toast.error("Invalid query parameters", { toastId: "product filter" });

    const brandsData = brands.data ?? [];

    const elements = [
        {
            label: "Category",
            builder: (): ReactElement => (
                <div className="flex gap-10 mt-4">
                    {PRODUCT_CATEGORY_LIST.map((category) => (
                        <CustomCheckbox
                            id={`filterCategory${category}`}
                            key={category}
                            label={category.substring(0, 1).toUpperCase() + category.substring(1)}
                            onChange={(e) => {
                                if (e.target.checked) setCategory((s) => [...s, category]);
                                else setCategory((s) => s.filter((c) => c !== category));
                            }}
                            checked={categories.includes(category)}
                            name="category"
                            value={category}
                        />
                    ))}
                </div>
            ),
        },
        {
            label: "Brand",
            builder: (): ReactElement => (
                <div className="mt-4">
                    {brandsData.map((brand) => (
                        <div className="w-min inline-block mr-6 mb-2.5" key={brand}>
                            <CustomCheckbox
                                id={`filterBrand${brand}`}
                                key={brand}
                                label={brand}
                                onChange={(e) => {
                                    if (e.target.checked) setSelectedBrands((s) => [...s, brand]);
                                    else setSelectedBrands((s) => s.filter((c) => c !== brand));
                                }}
                                checked={selectedBrands.includes(brand)}
                                name="brand"
                                value={brand}
                            />
                        </div>
                    ))}
                </div>
            ),
        },
        {
            label: "Min Rating",
            builder: (): ReactElement => (
                <div className="flex gap-10">
                    <RatingSelector minRating={minRating} onChange={(rating) => setMinRating(rating)} />
                </div>
            ),
        },
        {
            label: "Price",
            builder: (): ReactElement => (
                <div className="flex gap-10">
                    <MultiRangeSlider
                        min={0}
                        max={100000000}
                        isPrice={true}
                        defaultMin={minPrice}
                        defaultMax={maxPrice}
                        onChange={(min, max) => {
                            setMinPrice(min);
                            setMaxPrice(max);
                        }}
                    />
                </div>
            ),
        },
    ];

    function handleSearch() {
        changeFilterDebounce({ name: searchRef.current!.value });
    }

    function applyFilter() {
        changeFilter({ name, category: categories, brand: selectedBrands, minPrice, maxPrice, minRating });
        setOpen(false);
    }

    function resetFilter() {
        changeFilter({});

        setCategory([]);
        setSelectedBrands([]);
        setMinRating(undefined);
        setMinPrice(undefined);
        setMaxPrice(undefined);

        setOpen(false);
    }

    useEffect(() => {
        changeFilter({});
    }, []);

    return (
        <div className="bg-white p-4 shadow-md mb-4 rounded-md space-x-4">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder={"Search by name"}
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
