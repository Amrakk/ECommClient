import { API } from "../api";

export async function logout(): Promise<void> {
    await API.post("/auth/logout");
}
