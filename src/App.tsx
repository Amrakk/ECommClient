import { JSX } from "react/jsx-runtime";
import { Suspense, useState } from "react";
import NotFound from "./pages/Errors/NotFound";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Shared/Loading";
import useAddresses from "./hooks/Shared/useAddresses";
import CheckAuth from "./components/Client/CheckAuthComponent";
import TopProgressBar from "./components/Client/TopProgressBar";
import { Routes, Route, Navigate, RouteProps } from "react-router-dom";
import AdminRoute, { adminLazyPages } from "./components/Route/AdminRoute";
import usePaymentServiceStatus from "./hooks/Shared/usePaymentServiceStatus";
import CustomerRouteMiddleware, { CustomerRoutes } from "./components/Route/CustomerRoute";
import "./styles/style.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function App() {
    useAddresses();
    usePaymentServiceStatus();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    return (
        <>
            <CheckAuth setIsCheckingAuth={setIsCheckingAuth}>
                <TopProgressBar>
                    <Routes>
                        <Route path="/" element={<CustomerRouteMiddleware isLoading={isCheckingAuth} />}>
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
