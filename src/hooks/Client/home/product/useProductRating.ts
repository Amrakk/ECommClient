import { insertProductRating, InsertRating } from "@/apis/productRatings"
import { useMutation } from "@tanstack/react-query"

export const useInsertProductRatingMutation = () => {
    const insertProductRatingMutation = useMutation({
        mutationKey: ["insertProductRating",],
        mutationFn: (data: InsertRating) => insertProductRating(data),
        onSuccess: (response) => {
            return response
        },
    })
    return insertProductRatingMutation
}