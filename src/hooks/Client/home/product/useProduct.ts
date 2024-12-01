import { ProductAPI } from "@/apis/client/home/product/api"
import { PRODUCT_CATEGORY } from "@/constants"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import {  getProductById2 } from "@/apis/products"
import {  getProductRatingByProductId } from "@/apis/productRatings"

export const useProductByCategoryMutation = () => {
    const productMutate = useMutation({
        mutationKey: ['productsByCategory'],
        mutationFn:  (category: PRODUCT_CATEGORY) =>  ProductAPI.getProductsByCategory(category),
        onSuccess: (data) => {
            return data
        }
    })
    return productMutate
}

export const useProductDetailQuery = () => {
    const { id } = useParams< {id : string}>();
    const productDetailQuery = useQuery({
        queryKey: ['productDetail', id],
        queryFn: () => getProductById2(id!),
        enabled: !!id,
        refetchOnWindowFocus: false,
    })
    return productDetailQuery
}

export const useProductRatingByIdQuery = () => {
    const { id } = useParams< {id : string}>();
    const productRatingById = useQuery({
        queryKey: ['productRatingById', id],
        queryFn: () => getProductRatingByProductId(id!),
        enabled: false,
        refetchOnWindowFocus: false
    })
    return productRatingById
}

