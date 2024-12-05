import { API } from "@/apis/api"
import { IResponse } from "@/interfaces/response"
import { ProductDetail } from "@/models/product"
import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useSearchParams } from "react-router-dom"

const searchProducts = async (search: string) : Promise<AxiosResponse<IResponse<ProductDetail[]>>>   => {
    return await API.get<IResponse<ProductDetail[]>>(`/products?searchTerm=${search}`)
}



const useSearchQuery = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('q');
    
    const searchQuery = useQuery({
        queryKey: ['search'],
        queryFn: () => searchProducts(search!),
    })
    return searchQuery
    
}
export default useSearchQuery