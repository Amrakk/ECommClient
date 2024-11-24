import { Navigate, NavigateFunction } from 'react-router-dom';
import { IResponseLogin } from "@/apis/client/auth/api";
import { IResponse } from "@/interfaces/response";
import { LoginRequest } from "@/models/request";
import { setLoading } from "@/stores/client/loadingSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { isStrongPassword } from "validator";
import isEmail from "validator/lib/isEmail";


export const onSubmitHandleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    setErrors: React.Dispatch<React.SetStateAction<{
        email: string;
        password: string;
    }>>,
    loginMutations: UseMutationResult<AxiosResponse<IResponse<IResponseLogin>, any>, Error, LoginRequest, unknown>,
    dispatch: Dispatch<UnknownAction>,
    navigate: NavigateFunction
) => {
    e.preventDefault();

    const { email, password } = e.currentTarget.elements as typeof e.currentTarget.elements & {
        email: { value: string };
        password: { value: string };
    };

    const newError = {
        email: '',
        password: ''
    };

    if (!isEmail(email.value)) {
        newError.email = 'Email not valid';
    } else if (password.value === '') {
        newError.password = 'Password is required';
    } else if (!isStrongPassword(password.value, {
        minLength: 3,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
    })) {
        newError.password = 'Password does not meet the requirements';
    }

    if (newError.email || newError.password) {
        setErrors(newError);
        return;
    }

    setErrors(newError);

    const data: LoginRequest = { email: email.value, password: password.value };
    dispatch(setLoading(true));

    try {
        await loginMutations.mutateAsync(data);
        dispatch(setLoading(false));
        toast.success('Login successful');
        navigate('/home');
    } catch (error: any) {
        dispatch(setLoading(false));
        toast.error(error.message);
    }
};
