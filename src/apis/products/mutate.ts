import { API } from "@/apis/api";

import type { PRODUCT_CATEGORY } from "@/constants";
import type { IResponse } from "@/interfaces/response";
import type { IProductVariant, ProductDetail } from "@/models/product";

interface InsertProduct {
    name: string;
    description: string;
    category: PRODUCT_CATEGORY;
    brand?: string;
    variants: IProductVariant[];
    details: { [key: string]: string };
    tags: string[];
    ratings?: number;
    images?: string[];
}

interface UpdateProduct {
    name?: string;
    description?: string;
    category?: PRODUCT_CATEGORY;
    brand?: string;
    variants?: IProductVariant[];
    details?: { [key: string]: string };
    tags?: string[];
    ratings?: number;
    images?: string[];
}

export async function insertProduct(data: InsertProduct): Promise<ProductDetail> {
    return API.post<IResponse<ProductDetail[]>>("/products", data).then((res) => res.data.data![0]);
}

export async function updateProduct(_id: string, data: UpdateProduct): Promise<ProductDetail> {
    return API.patch<IResponse<ProductDetail>>(`/products/${_id}`, data).then((res) => res.data.data!);
}

// TODO: Test this
export async function updateProductImage(_id: string, image: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("image", image);

    return API.patch<IResponse<{ url: string }>>(`/products/${_id}/images`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then((res) => res.data.data!);
}

export async function deleteProduct(_id: string): Promise<ProductDetail> {
    return API.delete<IResponse<ProductDetail>>(`/products/${_id}`).then((res) => res.data.data!);
}
