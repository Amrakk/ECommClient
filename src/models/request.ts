
export type LoginRequest = {
    email: string;
    password: string;
    rememberMe?: boolean;
} 

export type SignUpRequest = {

}

export type resetPasswordRequest = {
    email: string;
    otp: string;
    password: string;
}