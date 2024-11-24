import { JSX } from "react/jsx-runtime";
import { toast, ToastContainer } from "react-toastify";
import { lazy, Suspense, useEffect, useState } from "react";
import useAddresses from "./hooks/Shared/useAddresses";
import Loading from "./components/Shared/Loading";
import TopProgressBar from "./components/Client/TopProgressBar";
import { Routes, Route, Navigate, RouteProps } from "react-router-dom";
import CustomerRouteMiddleware, { CustomerRoutes } from "./components/Route/CustomerRoute";
import "./styles/style.css";
import "./styles/myStyle.css";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/Errors/NotFound";
import AdminRoute from "./components/Route/AdminRoute";
import CheckAuth from "./components/Client/CheckAuthComponent";

function sleep(ms: number = 200) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const adminLazyPages = [
    {
        path: "dashboard",
        component: lazy(async () => import("./pages/Admin/Dashboard")),
    },
];

function App() {
    const { assignAddresses } = useAddresses();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        assignAddresses.mutateAsync();
    }, []);

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
