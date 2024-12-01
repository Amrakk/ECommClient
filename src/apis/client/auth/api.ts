import { API } from "@/apis/api";
import { IResLogin, IResponse } from "@/interfaces/response";
import { LoginRequest, resetPasswordRequest, SignUpRequest } from "@/interfaces/request";
import { register, resetPassword, verify } from "@/apis/auth";

export class AuthenticateAPI {
    public static async loginClient(data: LoginRequest) {
        return await API.post<IResponse<IResLogin>>("/auth/login", data);
    }

    public static async sendEmailOtpClient(email: string) {
        return await API.post("/auth/forgot-password", { email });
    }
    public static async registerClient(data: SignUpRequest) {
        return await register(data);
    }

    public static async resetPasswordClient(data: resetPasswordRequest) {
        return await resetPassword(data);
    }
    public static async verifyClient() {
        return await verify();
    }
}
