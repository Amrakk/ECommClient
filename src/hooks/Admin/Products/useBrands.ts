import * as ProductAPI from "@/apis/products";
import { PRODUCT_CATEGORY } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export default function useBrands() {
    const brandQuery = useQuery({
        queryKey: ["brands"],
        queryFn: () => ProductAPI.getBrands(),
    });

    return brandQuery;
}

export function useBrandsByCategory(category: PRODUCT_CATEGORY) {
    const brandQuery = useQuery({
        queryKey: ["brands", { categories: [category] }],
        queryFn: () => ProductAPI.getBrands({ categories: [category] }),
    });

    return brandQuery;
}