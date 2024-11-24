import LoginPage from "@/pages/Client/Auth/LoginPage";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import HeaderClient from "@/layouts/client/HeaderClient";
import HomePage from "@/pages/Client/Home/HomePage";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import darkTheme from "@/layouts/client/Theme";
import SignUpPage from "@/pages/Client/Auth/SignUpPage";
import ForgotPasswordPage from "@/pages/Client/Auth/ForgotPasswodPage";
import NotFound from "@/pages/Errors/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/client/store";
import { LoadingScreen } from "../Client/iInitializingComponent";
import { PRODUCT_CATEGORY_LIST } from "@/constants";
import CategoryPage from "@/pages/Client/Home/CategoryPage";


export default function CustomerRouteMiddleware(props: any) {
    const location = useLocation()
    const user = useSelector((state: RootState) => state.user)

    if (!props.isLoading) {
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
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <HeaderClient />
                <LoadingScreen open={props.isLoading} />
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
    },
    home:
    {
        Category: {
            Home: "/category/home",
            Books: "/category/books",
            Sports: "/category/sports",
            Electronics: "/category/electronics",
            Others: "/category/others",
        }
    }
}

const categoryRoutes = PRODUCT_CATEGORY_LIST.map((category) => {
    return <Route key={category} path={category} element={<CategoryPage category={category} />} />
})


export const CustomerRoutes = [
    <>
        <Route path="/auth">
            <Route path="login" element={< LoginPage />} />
            <Route path="signup" element={< SignUpPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="" element={<Navigate to="login" />} />
            <Route path="*" element={<NotFound isDark={true} />} />
        </Route>
        <Route path="/category">
            <>
                {categoryRoutes.map((route) => route)}
            </>
        </Route>

        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFound isDark={true} />} />
    </>
]

