import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";
import { ReactElement, useRef, useState } from "react";
import useBrands from "@/hooks/Admin/Products/useBrands";
import { useDebounce } from "@/hooks/Shared/useDebounce";
import FilterContent from "@/components/Shared/FilterContent";
import CustomCheckbox from "@/components/Shared/CustomCheckbox";
import RatingSelector from "@/components/Shared/RatingSelector";
import MultiRangeSlider from "@/components/Shared/MultiRangeSlider";
import { PRODUCT_CATEGORY, PRODUCT_CATEGORY_LIST } from "@/constants";
import useProductFilter from "@/hooks/Admin/Products/useProductFilter";

export default function Filter() {
    const brandHook = useBrands();
    const searchRef = useRef<HTMLInputElement>(null);

    const { name, brands, categories, maxPrice, minPrice, minRating, changeFilter } = useProductFilter();

    const [open, setOpen] = useState(false);

    const [selectedCategories, setSelectedCategory] = useState<PRODUCT_CATEGORY[]>([...categories]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([...brands]);

    const [selectedMinRating, setSelectedMinRating] = useState<number | undefined>(minRating);
    const [selectedMinPrice, setSelectedMinPrice] = useState<number | undefined>(minPrice);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | undefined>(maxPrice);

    const changeFilterDebounce = useDebounce(changeFilter, 500);

    if (brandHook.error) toast.error("Invalid query parameters", { toastId: "product filter" });

    const brandsData = brandHook.data ?? [];

    const elements = [
        {
            label: "Categories",
            builder: (): ReactElement => (
                <div className="flex gap-10 mt-4">
                    {PRODUCT_CATEGORY_LIST.map((category) => (
                        <CustomCheckbox
                            id={`filterCategory${category}`}
                            key={category}
                            label={category.substring(0, 1).toUpperCase() + category.substring(1)}
                            onChange={(e) =>
                                setSelectedCategory((s) =>
                                    e.target.checked ? [...s, category] : s.filter((c) => c !== category)
                                )
                            }
                            checked={selectedCategories.includes(category)}
                            name="category"
                            value={category}
                        />
                    ))}
                </div>
            ),
        },
        {
            label: "Brands",
            builder: (): ReactElement => (
                <div className="mt-4">
                    {brandsData.map((brand) => (
                        <div className="w-min inline-block mr-6 mb-2.5" key={brand}>
                            <CustomCheckbox
                                id={`filterBrand${brand}`}
                                key={brand}
                                label={brand}
                                onChange={(e) =>
                                    setSelectedBrands((s) =>
                                        e.target.checked ? [...s, brand] : s.filter((b) => b !== brand)
                                    )
                                }
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
                    <RatingSelector minRating={selectedMinRating} onChange={(rating) => setSelectedMinRating(rating)} />
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
                        defaultMin={selectedMinPrice}
                        defaultMax={selectedMaxPrice}
                        onChange={(min, max) => {
                            setSelectedMinPrice(min);
                            setSelectedMaxPrice(max);
                        }}
                    />
                </div>
            ),
        },
    ];

    function handleSearch() {
        changeFilterDebounce({
            name: searchRef.current!.value,
            categories: [...selectedCategories],
            brands: [...selectedBrands],
            minPrice: selectedMinPrice,
            maxPrice: selectedMaxPrice,
            minRating: selectedMinRating,
        });
    }

    function applyFilter() {
        changeFilter({
            name,
            categories: [...selectedCategories],
            brands: [...selectedBrands],
            minPrice: selectedMinPrice,
            maxPrice: selectedMaxPrice,
            minRating: selectedMinRating,
        });
        setOpen(false);
    }

    function resetFilter() {
        changeFilter({ name });

        setSelectedCategory([]);
        setSelectedBrands([]);
        setSelectedMinRating(undefined);
        setSelectedMinPrice(undefined);
        setSelectedMaxPrice(undefined);

        setOpen(false);
    }

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
