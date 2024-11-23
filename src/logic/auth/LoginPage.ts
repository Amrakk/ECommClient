import { AuthenticateAPI } from "@/apis/client/auth/AuthenticateAPI";
import { LoginRequest } from "@/models/request";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { isStrongPassword } from "validator";
import isEmail from "validator/lib/isEmail";


export const onSubmitHandleLogin = async (e: any, setErrors: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const newError = {
        email: '',
        password: ''
    }
    if (!isEmail(email)) {
        newError.email = 'Email not valid'

        setErrors(newError)
        return;
    }
    if (password === '') {
        newError.password = 'Password is required'
        setErrors(newError)
        return;
    }
    if (!isStrongPassword(password)) {
        newError.password = 'Password does not meet the requirements'
        setErrors(newError)
        return;
    }
    setErrors(newError)

    const data: LoginRequest = { email, password }
  

    toast.promise(AuthenticateAPI.login(data), {
        error: {
            render({ data }: any) {
                return data
            }
        },
        pending: {
            closeButton: false,
            render() {
                return "Logging in..."
            }
        },
        success: {
            render({ data }: any) {
                return data
            }
        }
    })
}