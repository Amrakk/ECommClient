import * as ProductAPI from "@/apis/products";
import { useQuery } from "@tanstack/react-query";

export default function useProductById(id: string) {
    const productQuery = useQuery({
        queryKey: ["product"],
        queryFn: () => ProductAPI.getProductById(id),
    });

    return productQuery;
}
