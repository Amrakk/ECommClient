import { API } from "../api";

import type { CartDetail } from "@/models/cart";
import type { UserDetail } from "@/models/user";
import type { IResponse } from "@/interfaces/response";

interface IResLogin {
    user: UserDetail;
    cart: CartDetail | null;
}

export async function verify(): Promise<IResLogin> {
    return API.post<IResponse<IResLogin>>("/auth/verfiy").then((res) => res.data.data!);
}
