import { toast } from "react-toastify";
import { isEmail, isStrongPassword } from "validator";
import { AxiosResponse } from "axios";
import { UseMutationResult } from "@tanstack/react-query";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { setLoading } from "@/stores/client/loadingSlice";
import { resetPasswordRequest } from "@/interfaces/request";
import { NavigateFunction } from "react-router-dom";

export class ForgotPasswordPageHandler {
    private static setErrorMessages(errors: any, setErrors: any) {
        setErrors((prev: any) => ({ ...prev, ...errors }));
    }

    public static async onSubmitHandleStep1(
        email: string,
        setErrors: (errors: any) => void,
        setActiveStep: (step: (prevActiveStep: number) => number) => void,
        dispatch: Dispatch<UnknownAction>,
        emailSendMutation: UseMutationResult<AxiosResponse<any, any>, Error, string, unknown>
    ) {
        if (!isEmail(email)) {
            this.setErrorMessages({ email: "Email not valid" }, setErrors);
            return;
        }

        setErrors({});
        dispatch(setLoading(true));

        try {
            await emailSendMutation.mutateAsync(email);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            toast.success("OTP has been sent to your email");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    }

    public static async onSubmitHandleStep2(
        email: string,
        password: string,
        confirmPassword: string,
        otp: string,
        setErrors: (errors: any) => void,
        dispatch: Dispatch<UnknownAction>,
        resetPasswordMutation: UseMutationResult<void, Error, resetPasswordRequest, unknown>,
        navigate: NavigateFunction
    ) {
        const errors: any = {};

        if (
            !isStrongPassword(password, {
                minLength: 3,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 0,
                minSymbols: 0,
            })
        ) {
            errors.password = "Password does not meet the requirements";
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = "Password does not match";
        }
        if (otp.length !== 6) {
            errors.otp = "OTP is not valid";
        }

        if (Object.keys(errors).length > 0) {
            this.setErrorMessages(errors, setErrors);
            return false;
        }

        setErrors({});
        const request: resetPasswordRequest = { email, otp, password };
        dispatch(setLoading(true));

        try {
            await resetPasswordMutation.mutateAsync(request);
            toast.success("Password has been reset, please re-login");
            navigate("/auth/login");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }

        return true;
    }
}
