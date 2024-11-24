import { API } from "../api";
import type { IResLogin, IResponse } from "@/interfaces/response";


export async function verify(): Promise<IResLogin> {
    return API.post<IResponse<IResLogin>>("/auth/verify").then((res) => res.data.data!);
}
