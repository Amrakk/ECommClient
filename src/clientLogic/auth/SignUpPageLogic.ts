import { SignUpRequest } from '@/interfaces/request';
import { IResLogin } from '@/interfaces/response';
import { setLoading } from '@/stores/client/loadingSlice';
import { UnknownAction } from '@reduxjs/toolkit';
import { UseMutationResult } from '@tanstack/react-query';
import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isStrongPassword } from 'validator';
import isEmail from 'validator/lib/isEmail';


export const onSubmitHandle = async (
    e: any,
    setErrors: any,
    registerMutation: UseMutationResult<IResLogin, Error, SignUpRequest, unknown>,
    dispatch: Dispatch<UnknownAction>,
    navigate: NavigateFunction

) => {
    e.preventDefault()
    const userName = e.target.username.value
    const password = e.target.password.value
    const confirmPassword = e.target.confirmPassword.value
    const email = e.target.email.value
    const newError = {
        username: '',
        password: '',
        email: '',
        passwordConfirm: '',
    }
    if (userName === '') {
        newError.username = 'Username is required'
        return setErrors(newError)
    }
    if (isEmail(email) === false) {
        newError.email = 'Email is not valid'
        return setErrors(newError)
    }
    if (isStrongPassword(password, {
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
    }) === false) {
        newError.password = 'Password is not strong enough'
        return setErrors(newError)
    }
    if (password !== confirmPassword) {
        console.log(password, confirmPassword)
        newError.passwordConfirm = 'Passwords do not match'
        return setErrors(newError)
    }

    const data: SignUpRequest = {
        name: userName,
        password: password,
        email: email
    }
    setErrors(newError)
    dispatch(setLoading(true))

    try {
        await registerMutation.mutateAsync(data)
        dispatch(setLoading(false))
        toast.success("Register success, please login")
        setTimeout(() => {
            navigate('/auth/login')
        }, 500)

    } catch (error: any) {
        dispatch(setLoading(false))
        toast.error( error.message)

    }

}