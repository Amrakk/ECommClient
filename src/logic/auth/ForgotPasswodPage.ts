import { AuthenticateAPI } from "@/apis/client/auth/AuthenticateAPI";
import { resetPasswordRequest } from "@/models/request";
import { toast } from "react-toastify";
import { isEmail, isStrongPassword } from "validator";
import { AxiosResponse } from 'axios';
import { UseMutationResult } from "@tanstack/react-query";


export class ForgotPasswordPageHandler {
    public static async onSubmitHandleStep1(email: any, setErrors: any, setActiveStep: any) {

        if (!isEmail(email)) {
            setErrors((prev: any) => ({
                ...prev,
                email: 'Email not valid'
            }));
        }
        else {
            setErrors({});
            toast.promise(AuthenticateAPI.sendEmailOtp(email), {
                pending: "Sending OTP...",
                success: {
                    render({ data }: any) {
                        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
                        return data;
                    }
                },
                error: 'Something went wrong'
            })
        }
    }
    public static async onSubmitHandleStep2(
        email: string, password: string, 
        confirmPassword: string,
        otp: any, 
        setErrors: any, 
        resetPasswordMutation: UseMutationResult<AxiosResponse<any, any>, Error, resetPasswordRequest, unknown>
    ) {

        const newErrors = {
            newPassword: '',
            confirmPassword: '',
            otp: ''
        }

        if (isStrongPassword(password) && password === confirmPassword && otp.toString().length === 6) {
            setErrors({});
            const request: resetPasswordRequest = {
                email: email,
                otp: otp,
                password: password
            }
            const result = resetPasswordMutation.mutateAsync(request)

            toast.promise(result, {
                pending: "Resetting password...",
                success: {
                    render({ data }: any) {
                        return data;
                    }
                },
                error: 'Something went wrong'
            })
            return true;
        }
        else {
            if (!isStrongPassword(password)) {
                newErrors.newPassword = 'Password need at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character';
            }
            if (password !== confirmPassword) {
                newErrors.confirmPassword = 'Password does not match';
            }
            if (otp.toString().length !== 6) {
                newErrors.otp = 'OTP is not valid';
            }
            setErrors(newErrors);
            return false;
        }
    }

}
