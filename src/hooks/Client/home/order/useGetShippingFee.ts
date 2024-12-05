import { getShippingFee, GetShippingFee } from "@/apis/services"
import { useQuery } from "@tanstack/react-query"

const useGetShippingFeeQuery = (data: GetShippingFee ) => {
    const getShippingFeeQuery = useQuery({
        queryKey: ["getShippingFee"],
        queryFn: async () => { 
            return getShippingFee(data)
        },
        refetchOnWindowFocus: false,
    })
    return getShippingFeeQuery
}

export default useGetShippingFeeQuery