import { useState } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    TextField,
    Card,
    CardContent,
    StepIcon,
    FormControl,
    FormLabel,
    IconButton,
    Tooltip,

} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Email, Home, LockReset } from '@mui/icons-material';
import ForgotPasswordPNG from '@/assets/forgot-password.png';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import { CustomerPaths } from '@/components/Route/CustomerRoute';
import { ColorPrimary } from '@/styles/ThemeColorClient';
import { ForgotPasswordPageHandler } from '@/clientLogic/auth/ForgotPasswordPageLogic';
import {  useResetPasswordMutation, useSendEmailOtpMutation } from '@/hooks/Client/auth/useResetPassword';
import { useDispatch } from 'react-redux';


const ForgotPasswordPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const resetPasswordMutation = useResetPasswordMutation();
    const sendOtpMutation = useSendEmailOtpMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const steps = [
        {
            label: 'Enter Email',
            icon: <Email sx={{ color: activeStep === 0 ? ColorPrimary(1) : 'grey.500' }} />,
        },
        {
            label: 'Reset Password',
            icon: <LockReset sx={{ color: activeStep === 0 ? 'grey.500' : ColorPrimary(1) }} />,
        },
    ];

    const handleNext = () => {
        ForgotPasswordPageHandler.onSubmitHandleStep1(email, setErrors, setActiveStep, dispatch, sendOtpMutation);

    };
    const handleResetPassword = () => {
        ForgotPasswordPageHandler.onSubmitHandleStep2(
            email ,newPassword, confirmPassword, otp, setErrors, dispatch, resetPasswordMutation, navigate);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };


    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <FormControl fullWidth >
                        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }} >
                            <FormLabel htmlFor='username' error={Boolean(errors.email)}>Email</FormLabel>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="email"
                                size='medium'
                                placeholder='example@example.com'
                                error={Boolean(errors.email)}
                                onChange={(e) => setEmail(e.target.value)}
                                helperText={errors.email}
                                sx={{
                                    "& fieldset": {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                        </Box>
                    </FormControl>

                );
            case 1:
                return (
                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <FormControl fullWidth >
                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }} >
                                <FormLabel htmlFor='otp'>OTP</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    id="otp"
                                    type='number'
                                    size='medium'
                                    placeholder='123456'
                                    error={Boolean(errors.otp)}
                                    helperText={errors.otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    sx={{
                                        "& fieldset": {
                                            borderRadius: 2,
                                        },
                                    }}
                                />
                            </Box>
                        </FormControl>
                        <FormControl fullWidth >
                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }} >
                                <FormLabel error={Boolean(errors.newPassword)} htmlFor='password'>Password</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    id="password"
                                    type='password'
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    error={Boolean(errors.newPassword)}
                                    helperText={errors.newPassword}
                                    size='medium'
                                    placeholder='**********'
                                    sx={{
                                        "& fieldset": {
                                            borderRadius: 2,
                                        },
                                    }}
                                />
                            </Box>
                        </FormControl>
                        <FormControl fullWidth >
                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }} >
                                <FormLabel error={Boolean(errors.confirmPassword)} htmlFor='confirmPassword'> Confirm Password</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    id="confirmPassword"
                                    type='password'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword}
                                    size='medium'
                                    placeholder='**********'
                                    sx={{
                                        "& fieldset": {
                                            borderRadius: 2,
                                        },
                                    }}
                                />
                            </Box>
                        </FormControl>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Grid container spacing={13} sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Grid size={6} sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'flex-end', }}>
                <img src={ForgotPasswordPNG} width='85%' alt="Forgot Password" />
            </Grid>
            <Grid size={{ md: 6, xs: 12 }} sx={{ display: 'flex', justifyContent: { md: 'flex-start', xs: 'center' } }}>
                <Card sx={{
                    mt: 5,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '70%'
                }}>
                    <CardContent sx={{ p: 4 }}>
                        <Tooltip title="Back to Home">
                            <IconButton
                                sx={{ mb: 2 }}
                                aria-label="back to home"
                                component={Link}
                                to={CustomerPaths.auth.Login}
                            >
                                <ArrowBack />
                            </IconButton>
                        </Tooltip>

                        <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4 }}>
                            Forgot Password
                        </Typography>

                        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                            {steps.map((step, index) => (
                                <Step key={step.label} completed={activeStep > index}>
                                    <StepLabel StepIconComponent={() => (
                                        <StepIcon
                                            icon={step.icon}
                                        />
                                    )}>
                                        {step.label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {renderStepContent(activeStep)}

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 4,
                            pt: 2,
                            borderTop: '1px solid rgba(0, 0, 0, 0.12)'
                        }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="outlined"
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                onClick={activeStep === steps.length - 1 ? handleResetPassword : handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Reset Password' : 'Next'}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    );
};

export default ForgotPasswordPage;