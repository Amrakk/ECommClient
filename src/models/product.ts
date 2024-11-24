import { PRODUCT_CATEGORY } from "@/constants";

export interface ProductDetail {
    _id: string;
    name: string;
    images: string[];
    description: string;
    category: PRODUCT_CATEGORY;
    variants: IProductVariant[];
    brand: string;
    relevantProducts?: string[];
    details: { [key: string]: string };
    ratings: number;
    tags: string[];
}

export interface IProductVariant {
    id: string;
    quantity: number;
    importPrice: number;
    retailPrice: number;
    details: { [key: string]: string };
}

export interface ProductFilter {
    page?: number;
    limit?: number;

    /** Search by name (mainly use by Admin to search for products) */
    name?: string;
    /** Search by name, brand, category, or tags (mainly use by User to search for products) */
    searchTerm?: string;
    categories?: PRODUCT_CATEGORY[];
    brands?: string[];
    minRating?: number;
    minPrice?: number;
    maxPrice?: number;
}

export interface ProductRatingDetail {
    _id: string;
    userId: string;
    productId: string;
    rating: number;
    review: string;
    createdAt: Date;
    updatedAt: Date;
}
