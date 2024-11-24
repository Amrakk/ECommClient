import { API } from "@/apis/api";

import type { OrderDetail } from "@/models/order";
import type { IResponse } from "@/interfaces/response";
import type { USER_ROLE, USER_STATUS } from "@/constants";
import type { IAddress, ISocialMediaAccount, UserDetail, UserFilter } from "@/models/user";

interface GetUsersResponse {
    users: Omit<UserDetail, "password">[];
    totalDocuments: number;
}

export interface GetUserById {
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
    orderHistory: OrderDetail[];
}

export async function getUsers(query?: UserFilter): Promise<GetUsersResponse> {
    return API.get<IResponse<GetUsersResponse>>("/users", { params: query }).then(
        (res) => res.data.data ?? { users: [], totalDocuments: 0 }
    );
}

export async function getUserById(_id: string): Promise<GetUserById> {
    return API.get<IResponse<GetUserById>>(`/users/${_id}`).then((res) => res.data.data!);
}
