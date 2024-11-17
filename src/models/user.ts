import { SOCIAL_MEDIA_PROVIDER, USER_ROLE, USER_STATUS } from "@/constants";

export class User {
    _id: string;
    name: string;
    email: string;
    role: USER_ROLE;
    avatarUrl: string;
    cartId?: string;

    constructor(_id: string, name: string, email: string, role: USER_ROLE, avatarUrl: string, cartId: string) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.avatarUrl = avatarUrl;
        this.cartId = cartId;
    }
}

export interface UserFilter {
    page?: number;
    limit?: number;

    searchTerm?: string;
    role?: USER_ROLE;
    status?: USER_STATUS;
}

export interface UserDetail {
    _id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    loyaltyPoint: number;
    addresses: IAddress[];
    role: USER_ROLE;
    status: USER_STATUS;
    avatarUrl: string;
    socialMediaAccounts: ISocialMediaAccount[];
    cartId?: string;
    orderHistory: number[];
}

export interface IAddress {
    street: string;
    ward: { code: string; name: string };
    district: { id: number; name: string };
    province: { id: number; name: string };
    contactInfo?: string;
}

export interface ISocialMediaAccount {
    provider: SOCIAL_MEDIA_PROVIDER;
    accountId: string;
}
