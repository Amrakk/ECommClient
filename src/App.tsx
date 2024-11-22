import { JSX } from "react/jsx-runtime";
import { ToastContainer } from "react-toastify";
import { lazy, Suspense, useEffect } from "react";
import useAddresses from "./hooks/Shared/useAddresses";
import TopProgressBar from "./components/Client/TopProgressBar";
import { Routes, Route, Navigate, RouteProps } from "react-router-dom";
import CustomerRouteMiddleware, { CustomerRoutes } from "./components/Route/CustomerRoute";

import "./styles/style.css";
import "./styles/myStyle.css";
import "react-toastify/dist/ReactToastify.css";

import NotFound from "./pages/Errors/NotFound";
import Loading from "./components/Shared/Loading";
import AdminRoute from "./components/Route/AdminRoute";

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
    const { assignAddresses } = useAddresses();

    useEffect(() => {
        assignAddresses.mutateAsync();
    }, []);

    return (
        <>
            <TopProgressBar>
                <Routes>
                    <Route path="/" element={<CustomerRouteMiddleware />}>
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
            </TopProgressBar>
            <ToastContainer  autoClose={2000} />
        </>
    );
}

export default App;
