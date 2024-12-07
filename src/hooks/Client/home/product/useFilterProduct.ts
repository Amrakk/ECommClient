import { getProducts } from "@/apis/products"
import { ProductFilter } from "@/models/product"
import { useQuery } from "@tanstack/react-query"

export const useFilterProductQuery = (query: ProductFilter) => {
    const useFilter = useQuery({
        queryKey: ['filter'],
        queryFn: () => getProducts(query),
        refetchOnWindowFocus: false
    })
    return useFilter
}