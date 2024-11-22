import  { isStrongPassword } from 'validator';
import isEmail from 'validator/lib/isEmail';


export const onSubmitHandle = (e: any,  setErrors:any ) => {
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
    if(userName === '') {
        newError.username = 'Username is required'
        return setErrors(newError)
    }
    if(isEmail(email) === false) {
        newError.email = 'Email is not valid'
        return setErrors(newError)
    }
    if(isStrongPassword(password) === false) {
        newError.password = 'Password is not strong enough'
        return setErrors(newError)
    }
    if(password !== confirmPassword) {
        console.log(password, confirmPassword)
        newError.passwordConfirm = 'Passwords do not match'
        return setErrors(newError)
    }
    setErrors(newError)
    console.log('Form submitted')

}