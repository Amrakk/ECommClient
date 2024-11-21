import { API } from "../api";

import type { CartDetail } from "@/models/cart";
import type { IResponse } from "@/interfaces/response";
import type { IAddress, UserDetail } from "@/models/user";

interface Register {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    address?: IAddress;
    cartId?: string;
}

interface IResLogin {
    user: UserDetail;
    cart: CartDetail | null;
}

export async function register(data: Register): Promise<IResLogin> {
    return API.post<IResponse<IResLogin>>("/auth/register", data).then((res) => res.data.data!);
}
