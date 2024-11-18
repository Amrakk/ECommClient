import { PRODUCT_CATEGORY } from "@/constants";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { parseNumber } from "@/utils/parseNumber";

type Props = {
    name?: string;
    categories?: PRODUCT_CATEGORY[];
    brands?: string[];
    minRating?: number;
    minPrice?: number;
    maxPrice?: number;
};

export default function useProductFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const name = searchParams.get("name") ?? undefined;
    const categories = searchParams.getAll("categories") as PRODUCT_CATEGORY[];
    const brands = searchParams.getAll("brands");
    const minRating = parseNumber(searchParams.get("minRating"));
    const minPrice = parseNumber(searchParams.get("minPrice"));
    const maxPrice = parseNumber(searchParams.get("maxPrice"));

    const changeFilter = useCallback(
        (props: Props) => {
            setSearchParams((params) => {
                if (props.name) params.set("name", props.name);
                else params.delete("name");

                params.delete("categories");
                if (props.categories && props.categories.length > 0)
                    props.categories.forEach((category) => params.append("categories", category));

                params.delete("brands");
                if (props.brands && props.brands.length > 0)
                    props.brands.forEach((brand) => params.append("brands", brand));

                if (props.minRating) params.set("minRating", `${props.minRating}`);
                else params.delete("minRating");

                if (props.minPrice) params.set("minPrice", `${props.minPrice}`);
                else params.delete("minPrice");

                if (props.maxPrice) params.set("maxPrice", `${props.maxPrice}`);
                else params.delete("maxPrice");

                return params;
            });
        },
        [setSearchParams]
    );

    useEffect(() => {
        if (minRating) {
            if (minRating < 0) changeFilter({ minRating: 0 });
            else if (minRating > 5) changeFilter({ minRating: 5 });
        }
    }, [minRating, changeFilter]);

    return {
        name,
        categories,
        brands,
        minRating,
        minPrice,
        maxPrice,
        changeFilter,
    };
}
