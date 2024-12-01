import { ResetPasswordRequest } from "@/interfaces/request";
import { API } from "../api";


export async function resetPassword(data: ResetPasswordRequest): Promise<void> {
    await API.post("/auth/reset-password", data);
}
