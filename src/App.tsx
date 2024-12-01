import { lazy, Suspense, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { ToastContainer } from "react-toastify";
import useAddresses from "./hooks/Shared/useAddresses";
import Loading from "./components/Shared/Loading";
import TopProgressBar from "./components/Client/TopProgressBar";
import { Routes, Route, Navigate, RouteProps } from "react-router-dom";
import CustomerRouteMiddleware, { CustomerRoutes } from "./components/Route/CustomerRoute";
import "./styles/style.css";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/Errors/NotFound";
import AdminRoute from "./components/Route/AdminRoute";
import CheckAuth from "./components/Client/CheckAuthComponent";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

function sleep(ms: number = 200) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const adminLazyPages = [
    {
        path: "dashboard",
        component: lazy(async () => sleep().then(() => import("./pages/Admin/Dashboard"))),
    },
    {
        path: "users",
        component: lazy(async () => sleep().then(() => import("./pages/Admin/Users/Users"))),
    },
    {
        path: "users/:id",
        component: lazy(async () => sleep().then(() => import("./pages/Admin/Users/Details"))),
    },
    {
        path: "orders",
        component: lazy(async () => sleep().then(() => import("./pages/Admin/Orders/Orders"))),
    },
    {
        path: "orders/:id",
        component: lazy(async () => sleep().then(() => import("./pages/Admin/Orders/Details"))),
    },
    {
        path: "products",
        component: lazy(async () => sleep().then(() => import("./pages/Admin/Products/Products"))),
    },
    {
        path: "products/:id",
        component: lazy(async () => sleep().then(() => import("./pages/Admin/Products/Details"))),
    },
    {
        path: "vouchers",
        component: lazy(async () => sleep().then(() => import("./pages/Admin/Vouchers"))),
    },
    {
        path: "reports",
        component: lazy(async () => sleep().then(() => import("./pages/Admin/Reports"))),
    },
    {
        path: "advanced",
        component: lazy(async () => sleep().then(() => import("./pages/Admin/Advanced"))),
    },
];

function App() {
    useAddresses();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    return (
        <>
            <CheckAuth setIsCheckingAuth={setIsCheckingAuth} >
                <TopProgressBar>
                    <Routes>
                        <Route path="/" element={<CustomerRouteMiddleware isLoading={isCheckingAuth} />}>
                            {CustomerRoutes.map((route) => {
                                return route.props.children.map((child: { props: JSX.IntrinsicAttributes & RouteProps; }) => {
                                    if (child.props.path === undefined) {
                                        return <Route {...child.props} />;
                                    }
                                    return <Route {...child.props} key={child.props.path} />;
                                });
                            })}
                        </Route>
                        <Route path="/admin" element={<AdminRoute />}>
                            <Route path="" element={<Navigate to="/home" />} />
                            {adminLazyPages.map((LazyPage) => (
                                <Route
                                    key={LazyPage.path}
                                    path={LazyPage.path}
                                    element={
                                        <Suspense fallback={<Loading manual={true} />}>
                                            <LazyPage.component />
                                        </Suspense>
                                    }
                                />
                            ))}
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                    <Loading />
                    <ToastContainer autoClose={2000} />
                </TopProgressBar>
            </CheckAuth>
        </>

    );
}

export default App;
