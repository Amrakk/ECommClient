import { API } from "@/apis/api";
import { IResponse } from "@/interfaces/response";
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

export async function getBrands(): Promise<string[]> {
    return API.get<IResponse<string[]>>("/products/brands").then((res) => res.data.data ?? []);
}
