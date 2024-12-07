import { Card, CardContent, Typography, Box, FormControl, FormLabel, TextField, FormGroup, FormControlLabel, Checkbox, Button, Divider } from "@mui/material"
import Grid from '@mui/material/Grid2';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from "react-router-dom";
import { CustomerPaths } from "../Route/CustomerRoute";
import { onSubmitHandleLogin } from "@/clientLogic/auth/LoginPageLogic";
import { useLoginMutation } from "@/hooks/Client/auth/useLogin";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/stores/client/loadingSlice";


const LoginComponent = () => {
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    })
    const loginMutations = useLoginMutation()
    const dispatch = useDispatch()

    const onSubmitHandle = async (e: any) => {
        onSubmitHandleLogin(e, setErrors, loginMutations, dispatch)

    }

    return (
        <Grid container spacing={2} sx={{ height: '100vh', alignItems: 'center' }}>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', }}>
                <Card elevation={0} variant='outlined' sx={{
                    width: 500, borderRadius: 4, height: 'auto',
                }} >
                    <CardContent sx={{ display: 'flex', gap: 2, flexDirection: 'column', m: 2 }}>
                        <Typography variant="h4" fontWeight='medium' >Sign in</Typography>
                        <Box component={'form'} onSubmit={onSubmitHandle} sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center' }}>
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
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                sx={{
                                                    '& .MuiCheckbox-root': {
                                                        borderRadius: 1
                                                    }
                                                }}
                                            />
                                        }
                                        label="Remember me"
                                    />
                                </FormGroup>
                                <Button component={Link} to={CustomerPaths.auth.ForgotPassword} sx={{ textTransform: 'none' }} variant='text'>Forgot Password?</Button>
                            </Box>

                            <Button sx={{ borderRadius: 2 }} type='submit' variant="contained">Login</Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant='body2' color='textSecondary'>Don't have an account?</Typography>
                            <Button component={Link} to={CustomerPaths.auth.SignUp} sx={{ textTransform: 'none' }} variant='text'>Sign Up</Button>
                        </Box>
                        <Divider>
                            <Typography variant='caption' color='textSecondary'>OR</Typography>
                        </Divider>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button variant='outlined' onClick={() => {
                                dispatch(setLoading(true))
                                window.location.href = `${import.meta.env.VITE_API_URL}/v1/auth/google`
                            }} startIcon={<GoogleIcon />} sx={{ borderRadius: 2, }}>Login with Google</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default LoginComponent