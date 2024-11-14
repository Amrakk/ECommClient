import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./styles/style.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/Errors/NotFound";
import AdminRoute from "./components/Route/AdminRoute";
import CustomerRoute from "./components/Route/CustomerRoute";

// Lazy-load the admin components
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const Customer = lazy(() => import("./pages/Admin/CustomerManagement"));
const Product = lazy(() => import("./pages/Admin/ProductManagement"));
const CustomerDetailed = lazy(() => import("./pages/Admin/CustomerDetailed"));
const ProductDetailed = lazy(() => import("./pages/Admin/ProductDetailed.tsx"));
const SaleManagement = lazy(() => import("./pages/Admin/SaleManagement"));
const SaleOrderDetailed = lazy(() => import("./pages/Admin/SaleOrderDetailed"));
const VoucherManagement = lazy(() => import("./pages/Admin/VoucherManagement"));

function App() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<CustomerRoute />}>
                <Route path="" element={<Navigate to="/home" />} />
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin" element={<AdminRoute />}>
                <Route path="" element={<Navigate to="/admin/dashboard" />} />
                
                <Route
                    path="dashboard"
                    element={
                        <Suspense fallback={<div>Loading Dashboard...</div>}>
                            <Dashboard />
                        </Suspense>
                    }
                />
                <Route
                    path="customer"
                    element={
                        <Suspense fallback={<div>Loading Customer...</div>}>
                            <Customer />
                        </Suspense>
                    }
                />
                <Route
                    path="product"
                    element={
                        <Suspense fallback={<div>Loading Product...</div>}>
                            <Product />
                        </Suspense>
                    }
                />
                <Route
                    path="customer/:id"
                    element={
                        <Suspense fallback={<div>Loading Customer Details...</div>}>
                            <CustomerDetailed />
                        </Suspense>
                    }
                />
                <Route
                    path="product/:id"
                    element={
                        <Suspense fallback={<div>Loading Product Details...</div>}>
                            <ProductDetailed />
                        </Suspense>
                    }
                />
                <Route
                    path="salemanagement"
                    element={
                        <Suspense fallback={<div>Loading Sales Management...</div>}>
                            <SaleManagement />
                        </Suspense>
                    }
                />
                <Route
                    path="saleorderdetailed"
                    element={
                        <Suspense fallback={<div>Loading Sale Order Details...</div>}>
                            <SaleOrderDetailed />
                        </Suspense>
                    }
                />
                <Route
                    path="voucher"
                    element={
                        <Suspense fallback={<div>Loading Voucher Order Details...</div>}>
                            <VoucherManagement/>
                        </Suspense>
                    }
                />
                
                {/* Fallback for non-existing admin paths */}
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Fallback for non-existing public paths */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
