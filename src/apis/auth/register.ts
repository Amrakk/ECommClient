import { API } from "../api";

import type { IResLogin, IResponse } from "@/interfaces/response";
import { SignUpRequest } from "@/interfaces/request";




export async function register(data: SignUpRequest): Promise<IResLogin> {
    return API.post<IResponse<IResLogin>>("/auth/register", data).then((res) => res.data.data!);
}
