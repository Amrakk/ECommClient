import { Suspense } from "react";
import { JSX } from "react/jsx-runtime";
import NotFound from "./pages/Errors/NotFound";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Shared/Loading";
import useAddresses from "./hooks/Shared/useAddresses";
import TopProgressBar from "./components/Client/TopProgressBar";
import { Routes, Route, Navigate, RouteProps } from "react-router-dom";
import AdminRoute, { adminLazyPages } from "./components/Route/AdminRoute";
import usePaymentServiceStatus from "./hooks/Shared/usePaymentServiceStatus";
import CustomerRouteMiddleware, { CustomerRoutes } from "./components/Route/CustomerRoute";

import "./styles/style.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
    useAddresses();
    usePaymentServiceStatus();

    return (
        <>
            <TopProgressBar>
                <Routes>
                    <Route path="/" element={<CustomerRouteMiddleware />}>
                        {CustomerRoutes.map((route) => {
                            return route.props.children.map(
                                (child: { props: JSX.IntrinsicAttributes & RouteProps }) => {
                                    if (child.props.path === undefined) {
                                        return <Route {...child.props} />;
                                    }
                                    return <Route {...child.props} key={child.props.path} />;
                                }
                            );
                        })}
                    </Route>
                    <Route path="/admin" element={<AdminRoute />}>
                        <Route path="" element={<Navigate to="/home" />} />
                        {adminLazyPages.map((lazyPage) => (
                            <Route
                                key={lazyPage.path}
                                path={lazyPage.path}
                                element={
                                    <Suspense fallback={<Loading manual={true} />}>
                                        <lazyPage.component />
                                    </Suspense>
                                }
                            />
                        ))}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
                <Loading />
            </TopProgressBar>
            <ToastContainer autoClose={2000} />
        </>
    );
}

export default App;
