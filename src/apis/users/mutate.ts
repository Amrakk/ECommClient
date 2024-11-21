import { API } from "@/apis/api";

import type { IResponse } from "@/interfaces/response";
import type { USER_ROLE, USER_STATUS } from "@/constants";
import type { IAddress, ISocialMediaAccount, UserDetail } from "@/models/user";

export interface InsertUser {
    name: string;
    email: string;
    password?: string;
    role?: USER_ROLE;
    status?: USER_STATUS;
    phoneNumber?: string;
    loyaltyPoint?: number;
    addresses?: IAddress[];
    avatarUrl?: string;
    socialMediaAccounts?: ISocialMediaAccount[];
    cartId?: string;
    orderHistory?: number[];
}

export interface UpdateByAdmin {
    name?: string;
    email?: string;
    password?: string;
    role?: USER_ROLE;
    status?: USER_STATUS;
    phoneNumber?: string;
    loyaltyPoint?: number;
    addresses?: IAddress[];
    avatarUrl?: string;
    socialMediaAccounts?: ISocialMediaAccount[];
    cartId?: string;
    orderHistory?: number[];
}

export interface UpdateByUser {
    name?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    addresses?: IAddress[];
    avatarUrl?: string;
    cartId?: string;
}

export async function insertUser(data: InsertUser): Promise<UserDetail> {
    return API.post<IResponse<UserDetail[]>>("/vouchers", data).then((res) => res.data.data![0]);
}

export async function updateUserByAdmin(_id: string, data: UpdateByAdmin): Promise<UserDetail> {
    return API.patch<IResponse<UserDetail>>(`/vouchers/${_id}`, data).then((res) => res.data.data!);
}

export async function updateUserByUser(_id: string, data: UpdateByUser): Promise<UserDetail> {
    return API.patch<IResponse<UserDetail>>(`/vouchers/${_id}`, data).then((res) => res.data.data!);
}

// TODO: Test this
export async function updateUserAvatar(_id: string, avatar: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("image", avatar);

    return API.patch<IResponse<{ url: string }>>(`/vouchers/${_id}/avatar`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then((res) => res.data.data!);
}

export async function deleteUser(_id: string): Promise<UserDetail> {
    return API.delete<IResponse<void>>(`/vouchers/${_id}`).then((res) => res.data.data!);
}
