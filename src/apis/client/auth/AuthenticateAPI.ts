import { API } from "@/apis/api";
import { LoginRequest, resetPasswordRequest } from "@/models/request";
import axios from "axios";


export class AuthenticateAPI {
    public static async login(data: LoginRequest) {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
            email: data.email,
            password: data.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(() => {
            return Promise.resolve("Login successful")
        }).catch((error) => {
            const errorData = JSON.parse(error.request.response)
            return Promise.reject(errorData.message)
        })
    }

    public static async sendEmailOtp(email: string) {
        const data = await API.post("/auth/forgot-password", { email })
        if(data.status === 200) {
            return Promise.resolve("Email sent")
        }
    }

    public static async resetPassword (request: resetPasswordRequest){
        return await API.post("/auth/reset-password", request)
    }
}