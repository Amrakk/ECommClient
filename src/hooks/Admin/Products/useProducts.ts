import * as ProductAPI from "@/apis/products";
import { useQuery } from "@tanstack/react-query";
import useProductFilter from "./useProductFilter";
import usePagination from "@/hooks/Shared/usePagination";

export default function useUsers() {
    const { currentPage, limitPage } = usePagination();
    const { name, brand, category, maxPrice, minPrice, minRating } = useProductFilter();

    const productQuery = useQuery({
        queryKey: ["products", currentPage, limitPage, name, brand, category, maxPrice, minPrice, minRating],
        queryFn: () =>
            ProductAPI.getProducts({
                page: currentPage,
                limit: limitPage,
                name,
                brand,
                category,
                maxPrice,
                minPrice,
                minRating,
            }),
    });

    return productQuery;
}
