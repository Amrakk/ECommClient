import { API } from "../api";

import type { CartDetail } from "@/models/cart";
import type { UserDetail } from "@/models/user";
import type { IResponse } from "@/interfaces/response";

interface Login {
    email: string;
    password: string;
    cartId?: string | string;
}

interface IResLogin {
    user: UserDetail;
    cart: CartDetail | null;
}

export async function login(data: Login): Promise<IResLogin> {
    return API.post<IResponse<IResLogin>>("/auth/login", data).then((res) => res.data.data!);
}
