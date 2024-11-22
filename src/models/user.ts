import type { SOCIAL_MEDIA_PROVIDER, USER_ROLE, USER_STATUS } from "@/constants";

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

export interface UserFilter {
    page?: number;
    limit?: number;

    searchTerm?: string;
    role?: USER_ROLE;
    status?: USER_STATUS;
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
