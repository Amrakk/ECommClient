import { IAddress } from "@/models/user";

export interface LoginRequest  {
    email: string;
    password: string;
    cardId?: string;
} 


export interface resetPasswordRequest  {
    email: string;
    otp: string;
    password: string;
}

export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    address?: IAddress;
    cartId?: string;
}

export interface ResetPasswordRequest {
    email: string;
    otp: string;
    password: string;
}
