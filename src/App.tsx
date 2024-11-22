import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, RouteProps } from "react-router-dom";
import "./styles/style.css";
import NotFound from "./pages/Errors/NotFound";
import AdminRoute from "./components/Route/AdminRoute";
import CustomerRouteMiddleware, { CustomerRoutes } from "./components/Route/CustomerRoute";
import { JSX } from "react/jsx-runtime";
import TopProgressBar from "./components/Client/TopProgressBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// use React.lazy to load the Dashboard component asynchronously
const lazyPages = [
    {
        path: "dashboard",
        component: lazy(async () => import("./pages/Admin/Dashboard")),
    },
];

function App() {
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
                        {lazyPages.map((LazyPage) => {
                            return (
                                <Route
                                    key={LazyPage.path}
                                    path={LazyPage.path}
                                    element={
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <LazyPage.component />
                                        </Suspense>
                                    }
                                />
                            )
                        })}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </TopProgressBar>
            <ToastContainer theme="dark" />
        </>
    );
}

export default App;
