import { API } from "@/apis/api";

import type { PRODUCT_CATEGORY } from "@/constants";
import type { IResGetProductById, IResponse } from "@/interfaces/response";
import type { ProductDetail, ProductFilter } from "@/models/product";

interface GetProductsResponse {
    products: ProductDetail[];
    totalDocuments: number;
}



export async function getProducts(query?: ProductFilter): Promise<GetProductsResponse> {
    return API.get<IResponse<GetProductsResponse>>("/products", { params: query }).then(
        (res) => res.data.data ?? { products: [], totalDocuments: 0 }
    );
}

export async function getBrands(query?: { categories?: PRODUCT_CATEGORY[] }): Promise<string[]> {
    return API.get<IResponse<string[]>>("/products/brands", { params: query }).then((res) => res.data.data ?? []);
}

export async function getProductById(_id: string): Promise<ProductDetail> {
    return API.get<IResponse<ProductDetail>>(`/products/${_id}`).then((res) => res.data.data!);
}

export async function getProductById2(_id: string): Promise<IResGetProductById> {
    return API.get<IResponse<IResGetProductById>>(`/products/${_id}`).then((res) => res.data.data!);
}
