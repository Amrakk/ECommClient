import * as ProductAPI from "@/apis/products";
import { useMutation } from "@tanstack/react-query";

export default function useProductActions() {
    const insertAction = useMutation({
        mutationKey: ["product-insert"],
        mutationFn: ProductAPI.insertProduct,
    });

    const updateAction = useMutation({
        mutationKey: ["product-update-admin"],
        mutationFn: ProductAPI.updateProduct,
    });

    const updateAvatarAction = useMutation({
        mutationKey: ["product-update-avatar"],
        mutationFn: ProductAPI.updateProductImage,
    });

    const deleteAction = useMutation({
        mutationKey: ["product-delete"],
        mutationFn: ProductAPI.deleteProduct,
    });

    return { insertAction, updateAction, updateAvatarAction, deleteAction };
}
