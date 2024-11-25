import { lazy } from "react";
import { sleep } from "@/utils/sleep";
import { USER_ROLE } from "@/constants";
import Header from "@/layouts/admin/Header";
import Sidebar from "@/layouts/admin/Sidebar";
import { useUserStore } from "@/stores/user.store";
import { Outlet, Navigate, useLocation, matchPath } from "react-router-dom";

const existPaths = ["/advanced", "/vouchers", "/dashboard", "/users/:id?", "/orders/:id?", "/products/:id?"];

export const adminLazyPages = [
    {
        path: "dashboard",
        component: lazy(async () => sleep().then(() => import("@/pages/Admin/Dashboard"))),
    },
    {
        path: "users",
        component: lazy(async () => sleep().then(() => import("@/pages/Admin/Users/Users"))),
    },
    {
        path: "users/:id",
        component: lazy(async () => sleep().then(() => import("@/pages/Admin/Users/Details"))),
    },
    {
        path: "orders",
        component: lazy(async () => sleep().then(() => import("@/pages/Admin/Orders/Orders"))),
    },
    {
        path: "orders/:id",
        component: lazy(async () => sleep().then(() => import("@/pages/Admin/Orders/Details"))),
    },
    {
        path: "products",
        component: lazy(async () => sleep().then(() => import("@/pages/Admin/Products/Products"))),
    },
    {
        path: "products/:id",
        component: lazy(async () => sleep().then(() => import("@/pages/Admin/Products/Details"))),
    },
    {
        path: "vouchers",
        component: lazy(async () => sleep().then(() => import("@/pages/Admin/Vouchers"))),
    },
    {
        path: "advanced",
        component: lazy(async () => sleep().then(() => import("@/pages/Admin/Advanced"))),
    },
];

export default function AdminRoute() {
    const user = useUserStore((state) => state.user);
    const location = useLocation();

    const isValidPath = existPaths.some((path) =>
        matchPath(
            {
                path: `/admin${path}`,
                end: true,
            },
            location.pathname
        )
    );

    if (user?.role === USER_ROLE.ADMIN)
        return (
            <>
                {isValidPath ? (
                    <div className="flex bg-gray-100 min-h-screen">
                        <aside className="w-72 bg-black text-white p-6">
                            <Sidebar />
                        </aside>
                        <div className="flex-1">
                            <Header />
                            <Outlet />
                        </div>
                    </div>
                ) : (
                    <Outlet />
                )}
            </>
        );
    else return <Navigate to="/home" />;
}
