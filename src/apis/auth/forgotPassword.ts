import { API } from "../api";

export async function forgotPassword(email: string): Promise<void> {
    await API.post("/auth/forgot-password", { email });
}
