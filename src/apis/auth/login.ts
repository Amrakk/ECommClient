import { API } from "../api";
import type { IResLogin, IResponse } from "@/interfaces/response";
import { LoginRequest } from "@/interfaces/request";


export async function login(data: LoginRequest): Promise<IResLogin> {
    return API.post<IResponse<IResLogin>>("/auth/login", data).then((res) => res.data.data!);
}
    