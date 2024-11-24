import { Card, CardContent, Typography, Box, FormControl, FormLabel, TextField, FormGroup, FormControlLabel, Checkbox, Button, Divider } from "@mui/material"
import { useState } from "react"
import Grid from '@mui/material/Grid2';
import GoogleIcon from '@mui/icons-material/Google';
import { onSubmitHandle } from "@/clientLogic/auth/SignUpPageLogic";
import { Link, useNavigate } from "react-router-dom";
import { CustomerPaths } from "@/components/Route/CustomerRoute";
import { useRegisterMutation } from "@/hooks/Client/auth/useRegister";
import { useDispatch } from "react-redux";
import { setLoading } from "@/stores/client/loadingSlice";
import { set } from "lodash";




const SignUpPage = () => {
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
        passwordConfirm: '',
    })
    const registerMutation = useRegisterMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmitHandleForm = async (e: any) => {
        await onSubmitHandle(e, setErrors, registerMutation, dispatch, navigate)
    }

    return (
        <Grid container spacing={1} sx={{ height: '100vh', alignItems: 'center' }}>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', }}>
                <Card elevation={0} variant='outlined' sx={{
                    width: 500, borderRadius: 4, height: 'auto', mt: 2
                }} >
                    <CardContent sx={{ display: 'flex', gap: 1, flexDirection: 'column', m: 2 }}>
                        <Typography variant="h4" fontWeight='medium' >Sign Up</Typography>
                        <Box component={'form'} onSubmit={onSubmitHandleForm} sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center' }}>
                            <FormControl required error={Boolean(errors.username)} >
                                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }} >
                                    <FormLabel htmlFor='username'>Username</FormLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        id="username"
                                        size='small'
                                        placeholder='@username'
                                        helperText={errors.username}
                                        error={Boolean(errors.username)}
                                        sx={{
                                            "& fieldset": {
                                                borderRadius: 2,
                                            },
                                        }}
                                    />
                                </Box>
                            </FormControl>
                            <FormControl required error={Boolean(errors.email)} >
                                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }} >
                                    <FormLabel htmlFor='email'>Email</FormLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        id="email"
                                        type="email"
                                        size='small'
                                        placeholder='example@example.com'
                                        helperText={errors.email}
                                        error={Boolean(errors.email)}
                                        sx={{
                                            "& fieldset": {
                                                borderRadius: 2,
                                            },
                                        }}
                                    />
                                </Box>
                            </FormControl>
                            <FormControl required error={Boolean(errors.password)} >
                                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                    <FormLabel htmlFor='password'>Password</FormLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        id="password"
                                        size='small'
                                        type='password'
                                        helperText={errors.password}
                                        error={Boolean(errors.password)}
                                        placeholder="••••••"
                                        sx={{
                                            "& fieldset": {
                                                borderRadius: 2,
                                            },
                                        }}
                                    />
                                </Box>
                            </FormControl>
                            <FormControl required error={Boolean(errors.passwordConfirm)} >
                                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                    <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        id="confirmPassword"
                                        size='small'
                                        type='password'
                                        helperText={errors.passwordConfirm}
                                        error={Boolean(errors.passwordConfirm)}
                                        placeholder="••••••"
                                        sx={{
                                            "& fieldset": {
                                                borderRadius: 2,
                                            },
                                        }}
                                    />
                                </Box>
                            </FormControl>
                            <Button sx={{ borderRadius: 2 }} type='submit' variant="contained">Register</Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant='body2' color='textSecondary'>Already have an account?</Typography>
                            <Button component={Link} to={CustomerPaths.auth.Login} sx={{ textTransform: 'none' }} variant='text'>Sign In</Button>
                        </Box>
                        <Divider>
                            <Typography variant='caption' color='textSecondary'>OR</Typography>
                        </Divider>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button variant='outlined' onClick={() => {
                                dispatch(setLoading(true))
                                window.location.href = `${import.meta.env.VITE_API_URL}/v1/auth/google`
                            }} startIcon={<GoogleIcon />} sx={{ borderRadius: 2, }}>Sign up with Google</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default SignUpPage