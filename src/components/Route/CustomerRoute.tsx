import LoginPage from "@/pages/Client/Auth/LoginPage";
import { Navigate, Outlet, Route, useLocation, useNavigate } from "react-router-dom";
import HeaderClient from "@/layouts/client/HeaderClient";
import HomePage from "@/pages/Client/Home/HomePage";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import darkTheme from "@/layouts/client/Theme";
import SignUpPage from "@/pages/Client/Auth/SignUpPage";
import ForgotPasswordPage from "@/pages/Client/Auth/ForgotPasswordPage";
import NotFound from "@/pages/Errors/NotFound";
import { LoadingScreen } from "../Client/iInitializingComponent";
import { PRODUCT_CATEGORY_LIST } from "@/constants";
import CategoryPage from "@/pages/Client/Home/CategoryPage";
import SearchPage from "@/pages/Client/Home/SearchPage";
import ProductDetailComponent from "../../pages/Client/Home/ProductDetailPage";
import FooterComponent from "../Client/FooterComponent";
import CartPage from "@/pages/Client/Home/CartPage";
import ProtectedRoute from "../Client/ProtectedRoute";
import ProfilePage from "@/pages/Client/User/ProfilePage";
import AllProductPage from "@/pages/Client/Home/AllProductPage";
import CheckoutPage from "@/pages/Client/Checkout/CheckoutPage";
import TransactionDetailPage from "@/pages/Client/Checkout/TransactionDetailPage";

export default function CustomerRouteMiddleware(props: any) {
    const location = useLocation();

    if (!props.isLoading) {
        if (location.pathname.includes("/auth")) {
            return (
                <>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                        <Outlet />
                    </ThemeProvider>
                </>
            );
        }
        return (
            <>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <HeaderClient />
                    <Outlet />
                    <FooterComponent />
                </ThemeProvider>
            </>
        );
    }
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <HeaderClient />
                <LoadingScreen open={props.isLoading} />
            </ThemeProvider>
        </>
    );
}

export const CustomerPaths = {
    auth: {
        SignUp: "/auth/signup",
        Login: "/auth/login",
        ForgotPassword: "/auth/forgot-password",
    },
    home: {
        Category: {
            Home: "/category/home",
            Books: "/category/books",
            Sports: "/category/sports",
            Electronics: "/category/electronics",
            Others: "/category/others",
            All: "/category/all",
        },
        Search: "/search",
        Product: {
            Detail: "/product",
        },
        User: "/user/profile",
        Checkout: "/cart/checkout",
        Cart: "/cart",
        TransactionDetail: "/transactionDetail",
    },
};

const categoryRoutes = PRODUCT_CATEGORY_LIST.map((category) => {
    return <Route key={category} path={category} element={<CategoryPage category={category} />} />;
});

export const CustomerRoutes = [
    <>
        <Route path="/auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="" element={<Navigate to="login" />} />
            <Route path="*" element={<NotFound isDark={true} />} />
        </Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/home" />} />



        <Route path="/category">
            <Route path="" element={<Navigate to={CustomerPaths.home.Category.All} />} />
            <Route path="all" element={<AllProductPage />} />
            <>{categoryRoutes.map((route) => route)}</>
        </Route>
        <>{categoryRoutes.map((route) => route)}</>



        <Route
            path="/cart"
            element={
                <ProtectedRoute>
                    {" "}
                    <CartPage />{" "}
                </ProtectedRoute>
            }
        />
        <Route path="/cart/checkout" element={
            <ProtectedRoute>
                <CheckoutPage />
            </ProtectedRoute>
        } />

        <Route path="/transactionDetail" element={
            <ProtectedRoute>
                <TransactionDetailPage />
            </ProtectedRoute>
        } />


        <Route path="/search" element={<SearchPage />} />

        <Route path="/user">
            <Route
                path="profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
        </Route>
        <Route path="/product/:id" element={<ProductDetailComponent />} />

        <Route path="*" element={<NotFound isDark={true} />} />
    </>,
];
