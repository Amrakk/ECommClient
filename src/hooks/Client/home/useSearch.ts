import { API } from "@/apis/api"
import { IResponse } from "@/interfaces/response"
import { ProductDetail } from "@/models/product"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

export interface ResponseFilter {
    products: ProductDetail[];
    totalDocuments: number;
}

const searchProducts = async (search: string) : Promise<IResponse<ResponseFilter>>   => {
    return API.get<IResponse<ResponseFilter>>(`/products?searchTerm=${search}`).then((res) => res.data)
}



const useSearchQuery = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('q');
    
    const searchQuery = useQuery({
        queryKey: ['search', search],
        queryFn: () => searchProducts(search!),
        refetchOnWindowFocus: false,
    })
    return searchQuery
    
}
export default useSearchQuery