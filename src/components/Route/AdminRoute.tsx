import Header from "@/layouts/admin/Header";
import Sidebar from "@/layouts/admin/Sidebar";
import { Outlet, Navigate, useLocation, matchPath } from "react-router-dom";

const existPaths = ["/users/:id?", "/products/:id?", "/orders/:id?", "/vouchers", "/dashboard", "/settings"];

export default function AdminRoute() {
    const user = "admin";
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

    if (user === "admin")
        return (
            <>
                {isValidPath ? (
                    <div className="flex bg-gray-100 min-h-screen">
                        <aside className="w-64 bg-black text-white p-6">
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
