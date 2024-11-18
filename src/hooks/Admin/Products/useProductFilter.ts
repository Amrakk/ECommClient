import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCT_CATEGORY } from "@/constants";
import { parseNumber } from "@/utils/parseNumber";

type Props = {
    name?: string;
    category?: PRODUCT_CATEGORY[];
    brand?: string[];
    minRating?: number;
    minPrice?: number;
    maxPrice?: number;
};

export default function useProductFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const name = searchParams.get("name") ?? undefined;
    const category = (searchParams.get("category") ?? undefined) as PRODUCT_CATEGORY | undefined;
    const brand = searchParams.get("brand") ?? undefined;
    const minRating = parseNumber(searchParams.get("minRating"));
    const minPrice = parseNumber(searchParams.get("minPrice"));
    const maxPrice = parseNumber(searchParams.get("maxPrice"));

    const changeFilter = useCallback(
        (props: Props) => {
            setSearchParams((params) => {
                if (props.name) params.set("name", props.name);
                else params.delete("name");

                params.delete("category");
                if (props.category && props.category.length > 0)
                    props.category.forEach((category) => params.append("category", category));

                params.delete("brand");
                if (props.brand && props.brand.length > 0)
                    props.brand.forEach((brand) => params.append("brand", brand));

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
        category,
        brand,
        minRating,
        minPrice,
        maxPrice,
        changeFilter,
    };
}
