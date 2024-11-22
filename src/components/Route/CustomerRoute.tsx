import LoginPage from "@/pages/Client/Auth/LoginPage";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import HeaderClient from "@/layouts/HeaderClient";
import HomePage from "@/pages/Client/Home/HomePage";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import darkTheme from "@/layouts/Theme";
import SignUpPage from "@/pages/Client/Auth/SignUpPage";
import ForgotPasswordPage from "@/pages/Client/Auth/ForgotPasswodPage";


export default function CustomerRouteMiddleware() {
    const location = useLocation();
    if (location.pathname.includes("/auth")) {
        return (
            <>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <Outlet />
                </ThemeProvider>
            </>
        )
    }
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <HeaderClient />
                <Outlet />
            </ThemeProvider>
        </>
    )

}


export const CustomerPaths =
    {
        auth:
        {
            SignUp: "/auth/signup",
            Login: "/auth/login",
            ForgotPassword: "/auth/forgot-password",
        }
    }


export const CustomerRoutes = [
    <>
        <Route path="/auth">
            <Route path="login" element={< LoginPage />} />
            <Route path="signup" element={< SignUpPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage/>} />
        </Route>
        <Route key={"navigateToHome"} index element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
    </>
];

