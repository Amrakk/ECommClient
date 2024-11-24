import * as ProductAPI from "@/apis/products";
import { useQuery } from "@tanstack/react-query";

export default function useBrands() {
    const brandQuery = useQuery({
        queryKey: ["brands"],
        queryFn: () => ProductAPI.getBrands(),
    });

    return brandQuery;
}
