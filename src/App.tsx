import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./styles/style.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/Errors/NotFound";
import AdminRoute from "./components/Route/AdminRoute";
import CustomerRoute from "./components/Route/CustomerRoute";

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
            <Routes>
                <Route path="/" element={<CustomerRoute />}>
                    <Route path="" element={<Navigate to="/home" />} />
                    <Route path="home" element={<Home />} />
                    <Route path="login" element={<Login />} />
                </Route>

                <Route path="/admin" element={<AdminRoute />}>
                    <Route path="" element={<Navigate to="/home" />} />
                    {lazyPages.map((LazyPage) => (
                        <Route
                            key={LazyPage.path}
                            path={LazyPage.path}
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
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
