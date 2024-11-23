import { lazy, Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";

import "./styles/style.css";
import "./styles/myStyle.css";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/Errors/NotFound";
import Loading from "./components/Shared/Loading";
import AdminRoute from "./components/Route/AdminRoute";
import useAddresses from "./hooks/Shared/useAddresses";
import CustomerRoute from "./components/Route/CustomerRoute";

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

    return (
        <>
            <ToastContainer autoClose={2000} />
            <Loading />
            <Routes>
                <Route path="/" element={<CustomerRoute />}>
                    <Route path="" element={<Navigate to="/home" />} />
                    <Route path="home" element={<Home />} />
                    <Route path="login" element={<Login />} />
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
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
