import { API } from "../api";

interface ResetPassword {
    email: string;
    otp: string;
    password: string;
}

export async function resetPassword(data: ResetPassword): Promise<void> {
    await API.post("/auth/reset-password", data);
}
