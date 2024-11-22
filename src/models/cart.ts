export interface CartDetail {
    _id: string;
    items: ICartItem[];
    updatedAt: Date;
}

export interface ICartItem {
    productId: string;
    variantId: string;
    quantity: number;
}
