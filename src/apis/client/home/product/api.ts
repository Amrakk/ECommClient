import { ProductDetail, ProductFilter } from './../../../../models/product';
import { API } from "@/apis/api";
import { PRODUCT_CATEGORY } from "@/constants";
import { IResponse } from "@/interfaces/response";

export class ProductAPI {

    public static async getProductsByCategory(category: PRODUCT_CATEGORY) {
        const response = await API.get<IResponse<ProductDetail[]>>('/products')
        // @ts-ignore
        const products = response.data.data!.products.filter((product: ProductDetail) => product.category === category);
        return products;
    }

    public static filterProducts(products: ProductDetail[], filter: ProductFilter){
        if(!products) return [];
        return products.filter((product: ProductDetail) => {
            if(filter.brands && !filter.brands.includes(product.brand)) return false;
            if(filter.minRating && product.ratings < filter.minRating) return false;
            if(filter.minPrice && product.variants.some(variant => variant.retailPrice < filter.minPrice! )) return false;
            if(filter.maxPrice && product.variants.some(variant => variant.retailPrice > filter.maxPrice! )) return false;
            return true;
        });
    }
}